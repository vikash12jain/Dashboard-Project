import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  // const GlobalLoading = ({ active }) => {
  //   if (!active) return null;
  //   return (
  //     <div
  //       aria-hidden={!active}
  //       className="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
  //     >
  //       <div className="bg-white/95 p-4 rounded-2xl shadow flex items-center gap-3">
  //         <div className="w-8 h-8 border-4 border-amber-200 border-t-stone-800 rounded-full animate-spin"></div>
  //         <span className="ml-2 text-stone-700 font-medium">Loading...</span>
  //       </div>
  //     </div>
  //   );
  // };

  useEffect(() => {
    if (location.pathname === "/") return;
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const GlobalLoading = ({ active }) => {
    const [TenSec, setTenSec] = useState(false);
    if (!active && !isTransitioning) return null;
    useEffect(() => {
      setTenSec(false);
      const timerId = setTimeout(() => {
        setTenSec(true);
      }, 7000);
      return () => {
        clearTimeout(timerId);
      };
    }, [active,isTransitioning]);
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-black/30">
        <div className="relative w-16 h-16 mb-3">
          <div className="absolute w-full h-full rounded-full border-4 border-t-blue-500 border-r-orange-500 border-b-yellow-500 border-l-green-500 animate-spin"></div>
        </div>

        {(TenSec) ? ( <div className="text-center animate-fadeInUp">
  <p className="text-white font-semibold text-xl md:text-2xl tracking-wide mb-2 drop-shadow-[0_2px_6px_rgba(255,255,255,0.25)]">
    Preparing your experience
  </p>

  <p className="text-white/80 text-sm md:text-lg leading-relaxed">
    The server is starting up. This may take 1–2 minutes.
  </p>

</div>) : (<h6 className="font-bold text-white text-lg sm:text-xl tracking-wide">
          Loading<span className="animate-pulse">...</span>
        </h6>)
        }
      </div >
    );
  };



  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <GlobalLoading active={isLoading || isTransitioning} />
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext);