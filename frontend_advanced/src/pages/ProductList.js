import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch('http://localhost:9090/api/products')
      .then(r=>r.json())
      .then(data=>{ setProducts(data); setLoading(false); })
      .catch(e=>{ console.error(e); setLoading(false); });
  },[]);

  if(loading) return <p className="small">Loading products...</p>;

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.slice(0,100).map(p=> (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p className="small">{p.description}</p>
            <p><b>₹{p.price}</b></p>
            <div>
              <Link to={`/product/${p.id}`} className="btn">View</Link>
              <button className="btn" style={{marginLeft:8}} onClick={()=>{
                fetch('http://localhost:9090/api/cart',{
                  method:'POST',headers:{'Content-Type':'application/json'},
                  body: JSON.stringify({ productId: p.id, quantity:1 })
                }).then(()=>alert('Added to cart'))
              }}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      <p className="small">Showing first 100 items for demo (server returns 50k+ rows).</p>
    </div>
  );
}
