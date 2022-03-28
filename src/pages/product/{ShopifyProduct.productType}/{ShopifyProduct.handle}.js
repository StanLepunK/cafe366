/**
 * Fiche produit
 * v 0.3.0
 * 2021-2022
 *
 */
// REACT
import * as React from "react";
import { CgChevronRight as ChevronIcon } from "react-icons/cg";
import { useState, useContext, useCallback, useEffect } from "react";
// MISC
import isEqual from "lodash.isequal";
import sanitizeHtml from 'sanitize-html';
// GATSBY
import { GatsbyImage, getSrc } from "gatsby-plugin-image";
import { graphql, Link } from "gatsby";
// GATSBY SHOPIFY STARTER
import { Layout } from "../../../components/layout/layout";
import { ContextStore } from "../../../context/context_store";

import { Seo } from "../../../components/seo";
// CAFE 366

// The Search part don't work must be work on it for the future
// import { MetaSection } from "./meta_section.js"; 
// APP

// PRODUCT 366
import { AddUnits } from "../../../components/product/add_units.js";
import { Selection } from "../../../components/product/selection.js";

// UTILS
import { formatPrice } from "../../../utils/format_price";
import { Get_width } from "../../../utils/canvas";

import {
  prod_box,
  container,
  title_design,
  prod_img_wrapper,
  product_img_list,
  product_img_list_item,
  scrollForMore,
  noImagePreview,
  priceValue,
  collection_link,
  prod_description,
} from "./product_page.module.css";





export default function Product({ data: { product, suggestions } }) {
  const {
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    descriptionHtml,
    images: [firstImage],
  } = product;
  
  const { client } = useContext(ContextStore);
  const [variant, set_variant] = useState({ ...initialVariant });
  const product_variant = client.product.helpers.variantForOptions(product, variant) || variant;
  const [available, setAvailable] = useState(product_variant.availableForSale);

  const checkAvailablity = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === product_variant.storefrontId
          ) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [product_variant.storefrontId, client.product]
  );

  const change_option = (index, event) => {
    const value = event.target.value;
    if (value === "") { return; }
    const currentOptions = [...variant.selectedOptions];
    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };
    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions);
    });
    set_variant({ ...selectedVariant });
  };

  useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [product_variant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  );

  return (
    <Layout>
      {firstImage ? (
        <Seo
          title={title}
          description={sanitizeHtml(descriptionHtml)}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
      <div className={container}>
        <OrganizeDisplay product={product} available={available} price={price} change_option={change_option} product_variant={product_variant} />
      </div>
    </Layout>
  );
}




// OTHER
function OrganizeDisplay({product, available, price, change_option, product_variant}) {
  if(Get_width() >= 640) {
    return(
      <div className={prod_box}>
        <ShowImages product={product}/>
        <div>
          <HeaderProduct product={product} available={available} price={price} change_option={change_option} product_variant={product_variant}/>
          <Description className={prod_description} content_html={product.descriptionHtml}></Description>
        </div>
      </div>
    )
  } else {
    return(
      <div className={prod_box}>
        <HeaderProduct product={product} available={available} price={price} change_option={change_option} product_variant={product_variant}/>
        <ShowImages product={product}/>
        <Description className={prod_description} content_html={product.descriptionHtml}></Description>
      </div>
    )
  }
}

function ShowImages({product}) {
  const hasImages = product.images.length > 0;
  const hasMultipleImages = true || product.images.length > 1;
  return (<div>
    {hasImages && (
      <div className={prod_img_wrapper}>
        <ShowAllImagesProduct images={product.images} title={product.title}/>
        {hasMultipleImages && (
          <div className={scrollForMore} id="instructions">
            <span aria-hidden="true">←</span> scroll for more{" "}
            <span aria-hidden="true">→</span>
          </div>
        )}
      </div>
    )}
    {!hasImages && (
      <span className={noImagePreview}>No Preview image</span>
    )}
  </div>)
}


function HeaderProduct({product, available, price, change_option, product_variant}) {
  const hasVariants = product.variants.length > 1;

  return(
    <div>
      <div className={collection_link}>
      <ChevronIcon size={20} />
      <Link to={product.productTypeSlug}>{product.productType}</Link> 
    </div>
    <h1 className={title_design}>{product.title}</h1>
    <Order 
      priceValue={priceValue}
      price={price}
      hasVariants={hasVariants}
      options={product.options}
      handleOptionChange={change_option}
      productVariant={product_variant}
      available={available}
    />
  </div>
  );
}

function ShowAllImagesProduct({images, title}) {
  return(<div
    role="group"
    aria-label="gallery"
    aria-describedby="instructions"
  >
    <ul className={product_img_list}>
      {images.map((image, index) => (
        <li
          key={`product-image-${image.id}`}
          className={product_img_list_item}
        >
          <GatsbyImage
            objectFit="contain"
            loading={index === 0 ? "eager" : "lazy"}
            alt={
              image.altText
                ? image.altText
                : `Product Image of ${title} #${index + 1}`
            }
            image={image.gatsbyImageData}
          />
        </li>
      ))}
    </ul>
  </div>);
}

// https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
// https://stackoverflow.com/questions/59467152/how-to-render-html-code-in-strings-of-a-gatsby-config-file
function Description({className, content_html}) {
  const content_clean = sanitizeHtml(content_html, {
    allowedTags: ['br'],
  })
  return(<div className={className} dangerouslySetInnerHTML={{__html: content_clean}}/>)
}



function Order(props) {
  return(
  <>
    <h2 className={props.priceValue}>
      <span>{props.price}</span>
    </h2>
    <Selection hasVariants={props.hasVariants} options={props.options} handleOptionChange={props.handleOptionChange}/>
    <AddUnits productVariant= {props.productVariant} available={props.available}/>
  </>)
}



export const query = graphql`
  query ($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      descriptionHtml
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/product/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(
      limit: 3
      filter: { productType: { eq: $productType }, id: { ne: $id } }
    ) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
