import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(()=>{
    fetch(`http://localhost:9090/api/products/${id}`)
      .then(r=>r.json())
      .then(data=>setProduct(data))
      .catch(e=>console.error(e));
  },[id]);

  if(!product) return <p className="small">Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <div className="card">
        <p>{product.description}</p>
        <p><b>₹{product.price}</b></p>
        <button className="btn" onClick={()=>{
          fetch('http://localhost:9090/api/cart',{
            method:'POST',headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ productId: product.id, quantity:1 })
          }).then(()=>alert('Added to cart'))
        }}>Add to cart</button>
      </div>
    </div>
  );
}
