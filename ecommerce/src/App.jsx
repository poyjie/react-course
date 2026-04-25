import './App.css'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items')
      .then((response) => {
        setCartItems(response.data);
      });
  }, []);
  return (
    <Routes>
      <Route index element={<HomePage cart={cartItems} />} />
      <Route path="checkout" element={<CheckoutPage cart={cartItems}/>} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App