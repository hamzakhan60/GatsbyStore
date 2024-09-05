import client from '../shopify';

export async function createCart() {
    try {
      const response = await client.request(`
        mutation {
          cartCreate {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        price {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
               userErrors {
            field
            message
          }
          }
        }
      `);
  
      const cart = response.data.cartCreate.cart;
      console.log('Cart created:', cart);
      return cart;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    }
  }




  export async function addToCart(cartId, variantId, quantity) {
    console.log('Cart ID:', cartId);
    console.log('Variant ID:', variantId);
    console.log('Quantity:', quantity);
  
    if (!cartId || typeof cartId !== 'string') {
      throw new Error('Invalid cart ID provided');
    }
  
    if (!variantId || typeof variantId !== 'string') {
      throw new Error('Invalid variant ID provided');
    }
  
    quantity = parseInt(quantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      throw new Error('Invalid quantity provided');
    }
    const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

    const variables = {
        cartId: cartId, // Ensure this is correctly formatted
        lines: [
          {
            merchandiseId: variantId, // Ensure this is correctly formatted
            quantity: quantity, // Should be a valid integer
          },
        ],
      };
      console.log('GraphQL Mutation:', mutation);
      console.log('Variables:', variables);
    try {
      //const response = await client.request(mutation, variables);
     
      const response = await fetch('https://506b1d-2b.myshopify.com/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '829046d98f4d3f86f34488c28ed6a4ff', // Replace with your token
        },
        body: JSON.stringify({ query: mutation, variables }), // Ensure payload is correct
      });
      console.log("after",cartId);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Read and parse the response body
      const result = await response.json();
  
      // Check if there are any GraphQL errors
      if (result.errors) {
        console.error('GraphQL Errors:', result.errors);
        throw new Error('GraphQL errors occurred');
      }
      else
        console.log(result);
  
      return ;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  }


 export async function getCart(cartId) {
    const endpoint = 'https://506b1d-2b.myshopify.com/api/2024-04/graphql.json'; // Replace with your Shopify Storefront API endpoint
    const query = `
      query getCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
          checkoutUrl
        }
      }
    `;
  
    const variables = {
      cartId: cartId
    };
  
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '829046d98f4d3f86f34488c28ed6a4ff' // Replace with your Storefront API access token
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    });
  
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error('GraphQL query failed');
    }
  
    return data.data.cart;
  }
  
  // Example usage
  
  
  