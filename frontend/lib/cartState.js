import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider! We will store data (state) and
  // functionality (updates) in here and anyone can access it via the consumer!
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider value={{ cartOpen, setCartOpen, toggleCart, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  );
}

// Custom hook for accessing the cart local state
function useCart() {
  // We use a consumer to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
