// REACT
import * as React from "react";
import { useContext } from "react";
// GATSBY

// GATSBY SHOPIFY STARTER
import { ContextStore } from "../../context/context_store";
// CAFE 366
import { Menu } from "./../menu/menu";

import { header, container, logo, cart_container, cart_picto } from "./header.module.css";
import "./header.module.css";
import SearchIcon from "./../../icons/search";

import { Select, SelectAnimation } from "./select";

import { CartButton } from "./../cart/cart_button";

// CAFE 366
import { Logo }  from "./../../icons/picto";


export function Header() {
  const { checkout, loading, did_just_add_to_cart } =
    useContext(ContextStore);

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  /**
   *  Deal with SSR Gatsby rendering problem with class Object need to pass by useState, useEffect
   *  https://blog.logrocket.com/using-localstorage-react-hooks/
   *  https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
   */

    {/* <Link to="/search" className={searchButton}>
    <SearchIcon />
  </Link> */}

  // return (
  //   <div className={container}>
  //     <div style={{maxWidth: "640px", width: "100%", margin: "0 auto"}}>truc machin bidule pas chouette</div>
  //   </div>
  // );

  return (
    <>
        <div className={container}>
          {/* barre de navigation */}
          <header className={header}>
            <Logo classNameContainer={logo}/>
            <CartButton quantity={quantity} classNameContainer={cart_container} classNamePicto={cart_picto}/>
            <Menu/>
          </header>
          <Select show={loading || did_just_add_to_cart} >
            <SelectAnimation  just_add={did_just_add_to_cart}/>
          </Select>
        </div>
    </>
  );
}
