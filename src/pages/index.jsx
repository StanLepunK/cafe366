import * as React from "react";
// gatsby
import { graphql } from "gatsby";
// app
import { Layout } from "../components/layout";
import { ProductListing } from "../components/product_listing";
import {
  container,
  intro,
  callOut,
  callToAction,
  deployButton,
} from "./index.module.css";
import content from "../../media/json/content.json";
import { get_lang, find_lang } from "../utils/misc";

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`;

function Introduction() {
  // replace the lines below by hooks useState
  let txt_intro = "";

  if (get_lang() === "fr") {
    txt_intro = find_lang(content.info, "introduction", "fr");
  } else {
    txt_intro = find_lang(content.info, "introduction", "en");
  }

  return (
    <div className={container}>
      <h1 className={intro}>{txt_intro}</h1>
    </div>
  );
}

export default function IndexPage({ data }) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  return (
    <Layout>
      <Introduction />
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  );
}
