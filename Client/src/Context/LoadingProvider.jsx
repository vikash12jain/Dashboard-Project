import { createContext, useContext,useEffect,useState } from 'react'
import { useLocation } from "react-router-dom";

const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
    const location = useLocation();

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

  const GlobalLoading = ({ active }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-black/30">
      <div className="relative w-16 h-16 mb-3">
        <div className="absolute w-full h-full rounded-full border-4 border-t-blue-500 border-r-orange-500 border-b-yellow-500 border-l-green-500 animate-spin"></div>
      </div>

      <h6 className="font-bold text-white text-lg tracking-wide">
        Loading<span className="animate-pulse">...</span>
      </h6>
    </div>
  );
};


  //  useEffect(() => {
  //   if(isLoading) return 
  //   setLoading(true);
  //   const timer = setTimeout(() => setLoading(false), 500); 

  //   return () => clearTimeout(timer);
  // }, [location.pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <GlobalLoading active={isLoading} />
      </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext);