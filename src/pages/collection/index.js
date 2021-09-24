import * as React from "react";
// GATSBY
import { graphql } from "gatsby";
// APP TEMPLATE
import { Layout } from "../../components/layout";
import { ProductListing } from "../../components/product/product_listing";
import { Seo } from "../../components/seo";
import { MoreButton } from "../../components/more_button";
import { title } from "./index.module.css";
// APP CUSTOM
// import content from "../../../media/json/content.json";
// import { get_lang, find_lang } from "../../utils/misc";

export default function IndexCollection({
  data,
  pageContext: { collections___title },
}) {
  console.log("je suis la collection", data);
  // replace the lines below by hooks useState
  // let all_prod = "All products";

  // if (get_lang() === "fr") {
  //   all_prod = find_lang(content.collection, "all products", "fr");
  // } else {
  //   all_prod = find_lang(content.collection, "all products", "en");
  // }

  return (
    <Layout>
      <ProductListing products={data?.shopifyCollection?.products} />
      {/* <Seo title={`Collection: ${collections___title}`} /> */}
      {/* <h1 className={title}>{collections___title}</h1> */}
      {/* <ProductListing products={collections___title.nodes} /> */}
      {/* {collection.pageInfo.hasNextPage && (
        <MoreButton to={`/search#more`}>More products</MoreButton>
      )} */}
    </Layout>
  );
}

export const query = graphql`
  query ($collections___title: String!) {
    shopifyCollection(handle: { eq: $collections___title }) {
      products {
        ...ProductCard
      }
    }
  }
`;
