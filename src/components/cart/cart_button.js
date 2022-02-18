/**
 * CART BUTTON
 * 2022
 * v 0.0.2
 */
// REACT
import * as React from "react";
// CAFE 366
import { quantity_design } from "./cart.module.css";
import { Panier }  from "./../../icons/picto";


// export function CartButton({ quantity, classNameContainer }) {
//   return (
//   <Panier styleContainer={style_test}/>
//   );
// }

// {quantity > 0 ? <div className={quantity_design}>{quantity}</div> : null}
// <div className={classNameContainer}>

export function CartButton({ quantity, classNameContainer }) {
  return (
    <div className={classNameContainer}>
      <Panier/>
      <div className={quantity_design}>{quantity}</div>
    </div>
  );
}
