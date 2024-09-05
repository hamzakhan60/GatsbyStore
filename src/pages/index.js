import React, { useState, useEffect } from 'react';
// import { graphql } from "gatsby"
import { Link } from 'gatsby';
// import { Layout } from "../components/layout"
import { ProductListing } from "../components/product-listing.js"
import client from '../shopify';

import {
  container,
  intro,
  callOut,
  callToAction,
  deployButton,
  cartButton
} from "./index.module.css"




const data = {
  shopifyCollection: {
    products: [
      {
        ProductName: "WINTER'23 MEN WAISTCOAT FORMAL CHARCOAL",
        CategoryName: "Clothe",
        Stock: 37,
        Price: 6743,
        Description: "Fabric: Blended\nBan Collar Kurta Sleeves\nDisclaimer: Due to the photographic lighting & different screen calibrations, the colors of the original product may slightly vary from the picture",
        imgUrl: "https://mtjonline.com/cdn/shop/files/MWC-1553_9_540x.jpg?v=1695626774"
      },
      {
        ProductName: "WINTER'23 MEN WAISTCOAT FORMAL CHARCOAL",
        CategoryName: "Clothe",
        Stock: 37,
        Price: 6743,
        Description: "Fabric: Blended\nBan Collar Kurta Sleeves\nDisclaimer: Due to the photographic lighting & different screen calibrations, the colors of the original product may slightly vary from the picture",
        imgUrl: "https://mtjonline.com/cdn/shop/files/MWC-1553_9_540x.jpg?v=1695626774"
      },
      {
        ProductName: "WINTER'23 MEN WAISTCOAT FORMAL CHARCOAL",
        CategoryName: "Clothe",
        Stock: 37,
        Price: 6743,
        Description: "Fabric: Blended\nBan Collar Kurta Sleeves\nDisclaimer: Due to the photographic lighting & different screen calibrations, the colors of the original product may slightly vary from the picture",
        imgUrl: "https://mtjonline.com/cdn/shop/files/MWC-1553_9_540x.jpg?v=1695626774"
      },

    ],
  }
}

function Hero(props) {
  return (
    <div className={container}>
      <h1 className={intro}>Welcome to the GatsbyJS + Shopify Demo Store.</h1>
      {!!process.env.GATSBY_DEMO_STORE && (
        <>
          <p className={callOut}>
            It's a proof-of-concept in a box, with 10k products and 30k variants
            to help you get to proof-of-concept as soon as right now.
          </p>
          <p className={callToAction}>
            Hook it up to your own Shopify store data and start customizing in
            minutes by deploying it to Gatsby Cloud for free. Grab your Shopify
            store credentials and
            <a href="https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-shopify&utm_campaign=shopify-starter">
              <img
                src="https://www.gatsbyjs.com/deploynow.png"
                alt="Deploy to Gatsby Cloud"
                className={deployButton}
              />
            </a>
          </p>
        </>
      )}
    </div>
  )
}

export default function IndexPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productQuery = `
  {
    products(first: 2) {
      edges {
        node {
          id
          title
          description
          vendor
          productType
          availableForSale
          tags
          options {
            name
            values
          }
          variants(first: 2) {
            edges {
              node {
                title
                price {
                  amount
                  currencyCode
                }
                sku
                weight
                weightUnit
                availableForSale
                id
              }
            }
          }
          images(first: 2) {
            edges {
              node {
                src
                altText
              }
            }
          }
        }
      }
    }
  }
  `;
  const getProduct=async()=>{
  const {data, errors, extensions} = await client.request(productQuery, {
    variables: {
      handle: 'sample-product',
    },
    
  });
  console.log(data);
 // Assuming 'data' is the response from the Shopify query
const productsData = data?.products?.edges || [];

// Map the data to the desired format
const formattedProducts = productsData.map(({ node }) => {
  // Extract details from each product node
  const { 
    title, 
    description, 
    availableForSale, 
    images, 
    variants
     
  } = node;

  // Extract the first image URL
  const imageUrl = images?.edges[0]?.node?.src || '';

  // Extract the first variant price
  
      const variantId = variants?.edges[0]?.node?.id || '';
  console.log(variantId)
  const price = variants?.edges[0]?.node?.price?.amount || '0.00';
  const currency = variants?.edges[0]?.node?.price?.currencyCode || 'USD';

  return {
    title,
    description,
    price: `${currency} ${price}`,
    imageUrl,
    availableForSale,
    variantId,

  };

}
  ); 
console.log(formattedProducts);
setProducts(formattedProducts);
  }
  getProduct();
  
  }, []);

  return (
  <>
      <Hero />
      <ProductListing products={products} />
      <Link to="/cart" className={cartButton}>
        View Cart
      </Link>
      </>
  )
}
{/* <ProductListing products={products} /> */}

export const Head = () => <title>Home</title>
