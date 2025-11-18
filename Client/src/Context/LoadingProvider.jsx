import { createContext, useContext,useState } from 'react'

const LoadingContext = createContext();
export const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const GlobalLoading = ({ active }) => {
    if (!active) return null;
    return (
      <div
        aria-hidden={!active}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/30"
      >
        <div className="bg-white/95 p-4 rounded-2xl shadow flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-stone-800 rounded-full animate-spin"></div>
          <span className="ml-2 text-stone-700 font-medium">Loading...</span>
        </div>
      </div>
    );
  };
  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
      <GlobalLoading active={isLoading} />
      </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext);