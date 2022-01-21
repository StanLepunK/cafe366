// REACT
import * as React from "react";
import { useState } from "react";
// GATSBY

// GATSBY SHOPIFY STARTER
import { StoreContext } from "./../../context/store_context";
// import Logo from "./../../icons/logo";
import { Menu } from "./../menu/menu";
import { CartButton } from "./../cart/cart_button";
import SearchIcon from "./../../icons/search";
import { Toast } from "./../toast";
import { header, container, searchButton, menu } from "./header.module.css";
// APP
import {
  num_to_red,
  num_to_green,
  num_to_blue,
  num_to_hue,
  num_to_saturation,
  num_to_brightness,
} from "./../../utils/color";
import { Picto } from "./../../components/button/button";
import { style_num_to_filter } from "./../../utils/color";
import { get_constants } from "./../../utils/misc";
// CAFE 366
import tick from "./../../../media/picto/tick.svg";
import logo_366 from "./../../../media/logo/cafe366_logo_noir.svg";

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

  const style_logo = style_num_to_filter(r.LIN);
  const picto_logo = {
    filter: style_logo,
  };

  const style_tick = style_num_to_filter(r.CAFE);
  const picto_tick = {
    filter: style_tick,
  };

  return (
    <div className={container}>
      <header className={header}>
        <Picto src={logo_366} alt="café 366" to="/" stylePicto={picto_logo} />
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
            Added to cart
            <Picto src={tick} alt="ok" stylePicto={picto_tick} />
          </>
        )}
      </Toast>
    </div>
  );
}