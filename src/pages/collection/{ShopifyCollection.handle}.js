/// REACT
import * as React from "react";
import { useState } from "react";
// GATSVBY
import { graphql } from "gatsby";
// GATSBY SHOPIFY REACT STARTER
import { Layout } from "../../components/layout";
import { ProductListing } from "../../components/product/product_listing";
import {
  container,
  intro,
  callOut,
  callToAction,
  deployButton,
} from "./index.module.css";
// CAFE 366
import content from "../../../media/json/content.json";
import { content_by_lang } from "../../utils/misc";

function Introduction() {
  const [txt_intro, set_txt_intro] = useState(
    content_by_lang(
      content.info,
      "introduction",
      "CAFÉ 366 the real test of the coffee"
    )
  );

  return (
    <div className={container}>
      <h1 className={intro}>{txt_intro}</h1>
    </div>
  );
}

export const query = graphql`
  query ($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      products {
        ...ProductCard
      }
    }
  }
`;

export default function IndexPage({ data }) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  return (
    <Layout>
      {/* <Introduction /> */}
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  );
}
