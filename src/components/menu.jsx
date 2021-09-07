import { graphql, useStaticQuery, Link } from "gatsby";
import * as React from "react";
import slugify from "@sindresorhus/slugify";
// app
import { navStyle, navLink, activeLink } from "./menu.module.css";

export function Menu({ className }) {
  const {
    allShopifyProduct: { productTypes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        productTypes: distinct(field: productType)
      }
    }
  `);

  return (
    <nav className={[navStyle, className].join(" ")}>
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        All products
      </Link>
      {productTypes.map((name) => (
        <Link
          key={name}
          className={navLink}
          to={`/products/${slugify(name)}`}
          activeClassName={activeLink}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
}
