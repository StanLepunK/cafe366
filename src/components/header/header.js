// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY
import { Link } from "gatsby";
// GATSBY SHOPIFY STARTER
import { StoreContext } from "./../../context/store_context";
import Logo from "./../../icons/logo";
import { Menu } from "./../menu/menu";
import { CartButton } from "./../cart/cart_button";
import SearchIcon from "./../../icons/search";
import { Toast } from "./../toast";
import {
  header,
  container,
  // logo as logoCss,
  searchButton,
  menu,
} from "./header.module.css";
// APP
import {
  num_to_red,
  num_to_green,
  num_to_blue,
  num_to_hue,
  num_to_saturation,
  num_to_brightness,
} from "./../../utils/color";

import { get_constants } from "./../../utils/misc";

export function Header() {
  const { checkout, loading, didJustAddToCart } =
    React.useContext(StoreContext);

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */
  const [r, set_r] = useState(get_constants());

  return (
    <div className={container}>
      <header className={header}>
        <Link to="/">
          {/* <Link to="/" className={logoCss}> */}
          <Logo size="60px" color={r.LIN} translate_x={-30} />
        </Link>
        <Menu className={menu} />
        {/* REASEARH */}
        {/* <Link to="/search" className={searchButton}>
          <SearchIcon />
        </Link> */}
        <CartButton quantity={quantity} />
      </header>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
    </div>
  );
}
