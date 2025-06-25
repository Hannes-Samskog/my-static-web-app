import { useState, useEffect } from "react";

interface Product {
  id: string;
  supplier: string;
  url: string;
  product_line: string;
  article: string;
  images: string[];
  power: string;
  lumen: string;
  color_temp: string;
  size: string;
  control_system: string;
  optic_type_code: string;
  mounting: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  async function list() {
    const query = `
    {
      products {
        items {
          id
          supplier
          url
          product_line
          article
          images
          power
          lumen
          color_temp
          size
          control_system
          optic_type_code
          mounting
        }
      }
    }`;

    const endpoint = "/data-api/graphql";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query }),
    });
    const result = await response.json();
    setProducts(result.data.products.items);
  }

  useEffect(() => {
    list();
  }, []);

  return (
    <main style={{ padding: 32 }}>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: 24 }}>
            <strong>{product.article}</strong> <br />
            Supplier: {product.supplier} <br />
            Product line: {product.product_line} <br />
            Power: {product.power}W, Lumen: {product.lumen}, Color Temp: {product.color_temp}K{" "}
            <br />
            Size: {product.size} <br />
            Control System: {product.control_system} <br />
            Optic Type Code: {product.optic_type_code} <br />
            Mounting: {product.mounting} <br />
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              Product page
            </a>{" "}
            <br />
            {product.images && product.images.length > 0 && (
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={product.article}
                    style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4 }}
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
