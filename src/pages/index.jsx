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
import describe from "../../media/json/describe.json";
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
  let txt_intro = "";

  if (get_lang() === "fr") {
    txt_intro = find_lang(describe.describe, "introduction", "fr");
    // txt_intro = describe.describe[0].label_fr;
  } else {
    txt_intro = find_lang(describe.describe, "introduction", "en");
    //txt_intro = describe.describe[0].label_en;
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
