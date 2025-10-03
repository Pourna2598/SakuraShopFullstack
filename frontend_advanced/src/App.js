import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './styles.css';

export default function App(){
  return (
    <div className="app-root">
      <header className="header">
        <h1>Sakura Shop 🌸</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ProductList/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </main>
    </div>
  );
}
