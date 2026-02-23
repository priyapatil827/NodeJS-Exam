import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_uri } from "../../api/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${base_uri}/products`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`${base_uri}/products/delete/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p._id}>
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
          <Link to={`/edit/${p._id}`}>Edit</Link>
          <button onClick={() => deleteProduct(p._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}