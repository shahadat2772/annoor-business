import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EachProduct from "./EachProduct/EachProduct";
import ProductDetailsModal from "./ProductDetailsModal/ProductDetailsModal";
import "./Products.css";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [productToShowDetails, setProductToShowDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("data/fakeData.json");
        let products;
        if (category) {
          products = data.filter((product) =>
            product.category.toLowerCase().includes(category)
          );
        } else {
          products = data?.filter((product) =>
            product.category.toLowerCase().includes("food")
          );
        }
        setProducts(products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category]);

  return (
    <React.Fragment>
      <div className="products-container">
        <div className="category-header">
          <span>{category ? category : "Food"}</span>
        </div>
        <div className="products">
          {products.map((product) => (
            <EachProduct
              product={product}
              key={product.id}
              productToShowDetails={productToShowDetails}
              setProductToShowDetails={setProductToShowDetails}
            />
          ))}
        </div>
      </div>

      {/* Product details modal */}
      {productToShowDetails && (
        <ProductDetailsModal
          productToShowDetails={productToShowDetails}
          setProductToShowDetails={setProductToShowDetails}
        />
      )}
    </React.Fragment>
  );
};

export default Products;
