import * as React from "react"
// gatsby
import { graphql } from "gatsby"
// app
import { Layout } from "../../components/layout"
import { ProductListing } from "../../components/product_listing"
import { Seo } from "../../components/seo"
import { MoreButton } from "../../components/more_button"
import { title } from "./index.module.css"

export default function Products({ data: { products } }) {
  return (
    <Layout>
      <Seo title="All Products" />
      <h1 className={title}>Products</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search#more`}>More products</MoreButton>
      )}
    </Layout>
  )
}

export const query = graphql`
  {
    products: allShopifyProduct(
      sort: { fields: publishedAt, order: ASC }
      limit: 24
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
