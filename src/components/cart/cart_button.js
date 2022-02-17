/**
 * CART BUTTON
 * 2022
 * v 0.0.2
 */
// REACT
import * as React from "react";
// CAFE 366
import { container, quantity_design } from "./cart.module.css";
import { Panier }  from "./../../icons/picto";


// const panier_style = {
//   margin: "0 auto",
//   width: "25px",
//   height: "25px",
// };

const style_test = {
  gridArea: "cart",
  // width: "var(--size_cart)",
  // height: "var(--size_cart)",
  width: "48px",
  height: "48px",
  placeItems: "center",
  border: "solid 1px white"
}

export function CartButton({ quantity, classNameContainer }) {
  return (
  <Panier styleContainer={style_test}/>
  );
}

// {quantity > 0 ? <div className={quantity_design}>{quantity}</div> : null}
// <div className={classNameContainer}>

// export function CartButton({ quantity, classNameContainer }) {
//   return (
//     <div style={style_test}>
//       <Panier/>
//       <div className={quantity_design}>{quantity}</div>
//     </div>
//   );
// }
