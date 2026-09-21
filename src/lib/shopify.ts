export async function getShopifyProducts() {
    const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;

    if (!domain || !token) {
        console.error("Missing Shopify credentials. Returning fallback data.");
        return getFallbackProducts();
    }

    const query = `
    {
      products(first: 8) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token,
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            console.error(`[Shopify Fetch] HTTP Error: ${response.status}`);
            return getFallbackProducts();
        }

        const json = await response.json();

        if (json.errors) {
            console.error(`[Shopify Fetch] GraphQL Errors:`, JSON.stringify(json.errors, null, 2));
            return getFallbackProducts();
        }

        const products = json.data?.products?.edges ?? [];
        if (products.length === 0) {
            return getFallbackProducts();
        }
        return products;
    } catch (error) {
        console.error(`[Shopify Fetch] Network or Fetch Error:`, error);
        return getFallbackProducts();
    }
}

function getFallbackProducts() {
    return [
        { node: { id: "1", title: 'A-Line Umbrella Kalamkari Kurti', priceRange: { minVariantPrice: { amount: "1299" } }, images: { edges: [{ node: { url: "/hero-kurti.png.png", altText: "Mock Kurti" } }] }, variants: { edges: [{ node: { id: "mock-1" } }] } } },
        { node: { id: "2", title: 'Straight Cut Indigo Kurti', priceRange: { minVariantPrice: { amount: "999" } }, images: { edges: [{ node: { url: "/hero-kurti.png.png", altText: "Mock Kurti" } }] }, variants: { edges: [{ node: { id: "mock-2" } }] } } },
        { node: { id: "3", title: 'Batik Printed Cotton Kurti', priceRange: { minVariantPrice: { amount: "1099" } }, images: { edges: [{ node: { url: "/hero-kurti.png.png", altText: "Mock Kurti" } }] }, variants: { edges: [{ node: { id: "mock-3" } }] } } },
        { node: { id: "4", title: 'Handblock Print Umbrella Kurti', priceRange: { minVariantPrice: { amount: "1599" } }, images: { edges: [{ node: { url: "/hero-kurti.png.png", altText: "Mock Kurti" } }] }, variants: { edges: [{ node: { id: "mock-4" } }] } } }
    ];
}

export async function getShopifyCollection(handle: string) {
    const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;

    if (!domain || !token) {
        console.error("Missing Shopify credentials.");
        return null;
    }

    const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token,
            },
            body: JSON.stringify({ query, variables: { handle } }),
        });

        if (!response.ok) {
            console.error(`[Shopify Fetch] HTTP Error: ${response.status}`);
            return null;
        }

        const json = await response.json();

        if (json.errors) {
            console.error(`[Shopify Fetch] GraphQL Errors:`, JSON.stringify(json.errors, null, 2));
            return null;
        }

        return json.data?.collection || null;
    } catch (error) {
        console.error(`[Shopify Fetch] Network or Fetch Error:`, error);
        return null;
    }
}
