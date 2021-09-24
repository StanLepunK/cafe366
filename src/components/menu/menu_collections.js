// REACT
import React from "react";
// OTHER
import slugify from "@sindresorhus/slugify";
// GATSBY
import { graphql, useStaticQuery, Link } from "gatsby";
// GATSBY SHOPYFY STARTER
import { navStyle, navLink, activeLink } from "./menu.module.css";

function LinkCollection({ type }) {
  console.log("LinkCollection:", `/collection/${slugify(type)}`);
  return (
    <div>
      <Link
        key={type}
        className={navLink}
        to={`/collection/${slugify(type)}`}
        activeClassName={activeLink}
      >
        {type}
      </Link>
    </div>
  );
}

export default function MenuCollections({ className }) {
  const {
    allShopifyProduct: { collec },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        collec: distinct(field: collections___handle)
      }
    }
  `);

  console.log("collec", collec);

  return (
    <div className={[navStyle, className].join(" ")}>
      {collec.map((elem) => {
        return <LinkCollection type={elem} />;
      })}
    </div>
  );
}
