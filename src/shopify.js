// src/shopify.js


// import Client from 'shopify-buy';

// // Initialize the Shopify client
// const client = Client.buildClient({
//   domain: '506b1d-2b.myshopify.com', // Replace with your actual Shopify store domain
//   storefrontAccessToken: '829046d98f4d3f86f34488c28ed6a4ff', // Replace with your Storefront API access token
// });




import {createStorefrontApiClient} from '@shopify/storefront-api-client';

const client = createStorefrontApiClient({
  storeDomain: 'http://506b1d-2b.myshopify.com',
  apiVersion: '2024-04',
  publicAccessToken: '829046d98f4d3f86f34488c28ed6a4ff',
});


export default client;
