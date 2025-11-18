import React, { createContext, useContext,useState,useEffect,useRef } from 'react'
import { useLoading } from './LoadingProvider'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
const EcomContext = createContext();

export const EcomProvider = ({ children }) => {

  const API_BASE = import.meta.env.VITE_API_URL;
  // const API_BASE = 'http://localhost:4000/api';
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [authError, setAuthError] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [inFlight, setInFlight] = useState({});
  const inFlightPromisesRef = useRef({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMobileMenuOpen(false); setIsSearchModalOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const setInFlightFor = (key, val) => setInFlight(prev => ({ ...prev, [key]: val }));
  const isBusy = (key) => !!inFlight[key];
  const anyBusy = Object.values(inFlight).some(Boolean) || isLoading;

const getInitialCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch {
        return [];
    }
};
const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (!storedToken || !storedUser) {
      setUser(null);
      setAuthToken(null);
      setIsInitialLoading(false);
      return;
    }
    setUser(JSON.parse(storedUser));
    setAuthToken(storedToken);

    (async () => {
      try {
        const data = await apiFetch('/users/profile', { method: 'GET' }, { requestKey: 'validateToken' });
        const serverUser = data.user || data;
        setUser(serverUser);
        localStorage.setItem('user', JSON.stringify(serverUser));
      } catch (err) {
        console.error('Token validation failed:', err);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setAuthToken(null);
        return;
      }
      finally{
        setIsInitialLoading(false);
      }

    })();
  }, []);


  const apiFetch = async (path, options = {}, opts = {}) => {
    const { requestKey } = opts || {};
    if (requestKey && inFlightPromisesRef.current[requestKey]) {
      return inFlightPromisesRef.current[requestKey];
    }
    const requestPromise = (async () => {
      if (requestKey) setInFlightFor(requestKey, true);

      try {
        const headers = { ...(options.headers || {}) };
        const hasContentType = Object.keys(headers).some(k => k.toLowerCase() === 'content-type');
        if (!hasContentType && (options.method || 'GET').toUpperCase() !== 'GET') {
          headers['Content-Type'] = 'application/json';
        }

        const token = localStorage.getItem('authToken') || authToken;
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${API_BASE}${path}`, { credentials: options.credentials ?? 'include', ...options, headers });

        if (res.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setUser(null);
          setAuthToken(null);
          toast.error('Invalid email or password');
          throw new Error('Invalid email or password');
        }

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          const message = text || `Request failed: ${res.status}`;
          throw new Error(message);
        }

        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (ct.includes('application/json')) return await res.json();
        return await res.text();
      } catch (err) {
        if (err instanceof TypeError || err.message === 'Failed to fetch') {
          throw new Error('Network error — check your internet connection.');
        }
        throw err;
      } finally {
        if (requestKey) setInFlightFor(requestKey, false);
        if (requestKey) delete inFlightPromisesRef.current[requestKey];
      }
    })();

    if (requestKey) {
      inFlightPromisesRef.current[requestKey] = requestPromise;
    }

    return requestPromise;
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/products', { method: 'GET' }, { requestKey: 'fetchProducts' });
      console.log(data);

      const normalized = (data || []).map(p => ({
        ...p,
        price: Number(p.price || 0),
        quantity: Number(p.quantity || 0)
      }));
      setProducts(normalized);
      return normalized;
    } catch (err) {
      console.error('fetchProducts error', err);
      toast.error(err.message || 'Could not load products');
      return [];
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    (async () => {
      if (user) {
        await mergeLocalCartOnLogin();
      }
    })();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart, user]);


  const handleLogout = async () => {
    try {
      await apiFetch('/users/logout', { method: 'POST' }, { requestKey: 'logout' });
    } catch (err) {
      console.warn('Logout request failed:', err);
    }
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setAuthToken(null);
    setCart([]);
    navigate('/');
  };

  const getProductById = (id) => products.find(p => String(p._id) === String(id));

  const cartQtyFor = (productId) => {
    const it = cart.find(i => String(i._id) === String(productId));
    return it ? Number(it.quantity || 0) : 0;
  };

  const canAddToCart = (productId, qtyToAdd = 1) => {
    const prod = getProductById(productId);
    if (!prod) return false;
    const available = Number(prod.quantity ?? 0);
    const alreadyInCart = cartQtyFor(productId);
    return (alreadyInCart + Number(qtyToAdd)) <= available;
  };


  const addToCart = async (product) => {
    setAuthError('');

    if (!canAddToCart(product._id, 1)) {
      const avail = getProductById(product._id)?.quantity ?? 0;
      toast(`Only ${avail} left in stock`);
      return;
    }

    if (!user) {
      setCart((prev) => {
        const idx = prev.findIndex(item => item._id === product._id);
        if (idx !== -1) {
          const currQty = Number(prev[idx].quantity || 0);
          if (currQty + 1 > (getProductById(product._id)?.quantity ?? Infinity)) {
            toast.error(`Cannot add more than available stock`);
            return prev;
          }
          return prev.map((it, i) =>
            i === idx ? { ...it, quantity: currQty + 1 } : it
          );
        }
        return [...prev, { ...product, quantity: 1, price: Number(product.price || 0) }];
      });
      toast.success(`${product.name} added to cart`);
      return;
    }

    const key = `addToCart-${product._id}`;
    try {
      await apiFetch('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      }, { requestKey: key });

      await fetchServerCart();
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error('addToCart error', err);
      setAuthError(err.message || 'Could not add to cart');
      toast.error(err.message || 'Could not add to cart');
      throw err;
    }
  };



  const handleAddToCart = async (product) => {
    try {
      await addToCart(product);
    } catch (err) {
      console.error('handleAddToCart error:', err);
    }
  };

  const onOpen = (id) => { setCurrentProductId(id); navigate('/product-Detail')};

  const fetchServerCart = async () => {
    try {
      const data = await apiFetch('/cart', { method: 'GET' }, { requestKey: 'fetchServerCart' });
      const serverCart = Array.isArray(data) ? data : data.cart || data;
      const mapped = serverCart.map(ci => {
        const prod = ci.product || ci.productId || ci.productId?.product || {};
        const id = prod._id || prod.id || ci.productId || ci._id || ci.id;
        const rawQty = ci.quantity ?? ci.qty ?? 1;
        return {
          _id: id,
          name: prod.name || ci.name || 'Unknown',
          price: Number(prod.price ?? ci.price ?? 0),
          quantity: Number(rawQty || 0),
          image: prod.image || (ci.product && ci.product.image) || '',
          serverCartItemId: ci._id || ci.id || undefined,
          raw: ci,
        };
      });
      setCart(mapped);
      return mapped;
    } catch (err) {
      console.error('fetchServerCart error', err);
      toast.error(err.message || 'Could not fetch cart');
      return [];
    }
  };


  const mergeLocalCartOnLogin = async () => {
    try {
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (!Array.isArray(localCart) || localCart.length === 0) {
        await fetchServerCart();
        return;
      }
      for (const item of localCart) {
        try {
          await apiFetch('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ productId: item._id, quantity: item.quantity || 1 })
          }, { requestKey: `mergeCart-${item._id}` });
        } catch (err) {
          console.error('merge item failed', item, err);
        }
      }
      const merged = await fetchServerCart();
      localStorage.removeItem('cart');
      return merged;
    } catch (err) {
      console.error('mergeLocalCartOnLogin error', err);
    }
  };

  const updateQuantity = async (productId, change) => {
    if (Number(change) === 0) return;

    const curr = cart.find(i => String(i._id) === String(productId));
    const prevQty = Number(curr?.quantity || 0);
    const newQty = prevQty + Number(change);

    if (newQty <= 0) {
      if (user) {
        await handleServerRemove(productId);
      } else {
        setCart(prev => prev.filter(i => String(i._id) !== String(productId)));
      }
      return;
    }

    const product = getProductById(productId);
    if (product && newQty > Number(product.quantity || 0)) {
      toast(`Only ${product.quantity} items available`);
      return;
    }

    if (!user) {
      setCart(prev =>
        prev.map(item =>
          String(item._id) === String(productId) ? { ...item, quantity: newQty } : item
        )
      );
      return;
    }
    setCart(prev => prev.map(item => String(item._id) === String(productId) ? { ...item, quantity: newQty } : item));

    try {
      await apiFetch('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity: Number(change) }),
      }, { requestKey: `updateQty-${productId}` });

      await fetchServerCart();

    } catch (err) {
      console.error('updateQuantity error', err);
      setCart(prev =>
        prev.map(item => String(item._id) === String(productId) ? { ...item, quantity: prevQty } : item)
          .filter(item => Number(item.quantity) > 0)
      );
      toast.error('Could not update quantity. Try again.');
    }
  };



  const handleServerRemove = async (productId) => {
    try {
      await apiFetch(`/cart/remove/${productId}`, { method: 'DELETE' }, { requestKey: `removeItem-${productId}` });
      await fetchServerCart();
    } catch (err) {
      console.error('handleServerRemove error', err);
    }
  };

  const removeItem = async (productId) => {
    if (!user) {
      setCart(prev => prev.filter(item => item._id !== productId));
      return;
    }
    await handleServerRemove(productId);
  };


  const clearCart = async () => {
    if (!user) {
      setCart([]);
      try { localStorage.removeItem('cart'); } catch (e) { console.error(e) }
      return;
    }
    try {
      await apiFetch('/cart/clear', { method: 'DELETE' }, { requestKey: 'clearCart' });
      setCart([]);
      return;
    } catch (e) {
      console.warn('cart/clear failed', e);
    }
    try {
      const serverCart = await fetchServerCart();
      for (const it of serverCart) {
        try {
          const idToRemove = it.productId?._id || it.productId;
          if (idToRemove) {
            await apiFetch(`/cart/remove/${idToRemove}`, { method: 'DELETE' }, { requestKey: `clearItem-${idToRemove}` });
          }
        } catch (e) { console.warn('Remove fallback failed', e); }
      }
      await fetchServerCart();
      setCart([]);
    } catch (err) {
      console.error('clearCart fallback failed', err);
    }
  };

  const handleCheckout = async (paymentPayload = {}) => {
    if (!cart || cart.length === 0) {
      toast.success('Cart is empty');
      return;
    }

    const orderItems = cart.map(ci => ({ productId: ci._id, quantity: Number(ci.quantity || 0) }));

    try {
      const resp = await apiFetch('/checkout', {
        method: 'POST',
        body: JSON.stringify({ items: orderItems, payment: paymentPayload })
      }, { requestKey: 'checkout' });

      try {
        await apiFetch('/cart/clear', { method: 'DELETE' }, { requestKey: 'clearCart' });
        await fetchServerCart();
      } catch (e) {
        const serverCart = await fetchServerCart();
        for (const it of serverCart) {
          try {
            const idToRemove = it.serverCartItemId || it._id || it.productId;
            if (idToRemove) {
              await apiFetch(`/cart/remove/${idToRemove}`, { method: 'DELETE' }, { requestKey: `clearItem-${idToRemove}` });
            }
          } catch (ee) {
            console.warn('Fallback remove failed for', it, ee);
          }
        }
      }
      setCart([]);
      try { localStorage.removeItem('cart'); } catch (e) { console.error(e.message) }
      await fetchProducts();

      toast.success('Order placed successfully!');

      navigate('/');
      return resp;
    } catch (err) {
      console.error('handleCheckout error', err);
      toast.error(err.message || 'Checkout failed. Please try again.');

      await fetchServerCart().catch(() => { });
      await fetchProducts().catch(() => { });
      throw err;
    }
  };

  const getUserDefaultTheme = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light'; 
};

const [theme, setTheme] = useState(getUserDefaultTheme);

useEffect(() => {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
};
  return (
    <EcomContext.Provider value={{
      API_BASE, products, setProducts, user, setUser,theme,setTheme,toggleTheme, cart,isInitialLoading, setCart, authToken,onOpen, setAuthToken, authError, setAuthError, isSearchModalOpen, setIsSearchModalOpen, currentProductId, setCurrentProductId, inFlight, setInFlight, isBusy, anyBusy, mobileMenuOpen, setMobileMenuOpen, isLoading, setLoading, apiFetch, fetchProducts, getProductById, cartQtyFor, canAddToCart, addToCart, handleAddToCart, fetchServerCart, mergeLocalCartOnLogin, updateQuantity, removeItem, handleServerRemove, clearCart, handleCheckout, handleLogout, setInFlightFor,
    }}>{children}</EcomContext.Provider>
  )
}

export const useEcom = () => useContext(EcomContext); 