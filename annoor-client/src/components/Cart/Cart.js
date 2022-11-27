import { Button, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { AnnoorContext } from "../../context/AnnoorContext";
import "./Cart.css";
import EachCartItem from "./EachCartItem/EachCartItem";
import EmptyCartImg from "../../assets/imgs/empy-cart.png";

const Cart = () => {
  const { cart } = useContext(AnnoorContext);

  let addedItems = 0;
  let totalPrice = 0;
  cart.forEach((item) => {
    addedItems = addedItems + item.quantity;
    totalPrice = totalPrice + item.price * item.quantity;
  });

  let totalShipping = 40;
  let totalTax = totalPrice * 0.01;
  let grandTotal = totalPrice + totalTax + totalShipping;

  return (
    <div className="cart">
      <div className="cart-header">
        <span>Cart</span>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((eachCartItem) => (
              <EachCartItem eachCartItem={eachCartItem} />
            ))
          ) : (
            <img className="empty-cart-img" src={EmptyCartImg} alt="" />
          )}
        </div>
        <div className="order-summery">
          <Typography variant="h6">Order Summary</Typography>
          <div className="check-out-details">
            <p>Items: {addedItems}</p>
            <p>Subtotal: {totalPrice}</p>
            <p>Shipping: {totalShipping}</p>
            <p>Tax: {totalTax}</p>
            <p>Total: {grandTotal}</p>
          </div>
          <button className="checkout-button">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
