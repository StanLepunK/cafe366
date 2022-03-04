/// REACT
import * as React from "react";
// GATSBY
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
// CAFE 366
import { Layout } from "../../components/layout/layout";
import { SelectMD } from "../../components/markdown";
import { container, container_image, image, article } from "./misc_page.module.css";


export default function Page({data}) {
  const brownser_is = typeof window !== "undefined";
  if (brownser_is) {
    localStorage.setItem("lang", "fr");
  }

  const node = data.contentfulTest;

  if (node.contenu !== undefined) {
    return (
      <Layout>
        <div className={container}>
          <div className={article}>
            <h1>{node.titre}</h1>
          </div>
          
          <div className={container_image}>
            <GatsbyImage alt={node.image.title} className={image} image={node.image.gatsbyImageData} />
          </div>
          <SelectMD className={article} node={node.contenu.childMarkdownRemark} />
        </div>
      </Layout>
    );
  } else {
    return <Layout />;
  }
}


export const query = graphql`
  query($id: String!) {
    contentfulTest(id: {eq: $id}) {
      titre
      contenu {
        childMarkdownRemark {
          html
          frontmatter {
            title
          }
        }
      }
      image {
        title
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`;
