import React, { useEffect, useState } from 'react';

export default function Cart(){
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCart = () => {
    fetch('http://localhost:9090/api/cart')
      .then(r=>r.json())
      .then(data=>setCart(data))
      .catch(e=>console.error(e));
  };

  useEffect(()=>{ fetchCart(); },[]);

  const removeItem = (id) => {
    fetch(`http://localhost:9090/api/cart/${id}`, { method:'DELETE' })
      .then(()=>fetchCart());
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="small">Cart is empty.</p>
      ) : (
        cart.items.map(it=> (
          <div className="card" key={it.id}>
            <h3>{it.name}</h3>
            <p>₹{it.price} × {it.quantity} = <b>₹{it.subtotal}</b></p>
            <button className="btn" onClick={()=>removeItem(it.id)}>Remove</button>
          </div>
        ))
      )}
      <h3>Total: ₹{cart.total}</h3>
    </div>
  );
}
