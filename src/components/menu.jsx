import * as React from "react";
import slugify from "@sindresorhus/slugify";
// gatsby
import { graphql, useStaticQuery, Link } from "gatsby";
// APP TEMPLATE
import { navStyle, navLink, activeLink } from "./menu.module.css";
// APP CUSTOM
import content from "../../media/json/content.json";
import { get_lang, find_lang } from "../utils/misc";

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

  // replace the lines below by hooks useState
  let all_prod = "All products";

  if (get_lang() === "fr") {
    all_prod = find_lang(content.collection, "all products", "fr");
  } else {
    all_prod = find_lang(content.collection, "all products", "en");
  }

  return (
    <nav className={[navStyle, className].join(" ")}>
      <Link
        key="All"
        className={navLink}
        to="/products/"
        activeClassName={activeLink}
      >
        {all_prod}
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
