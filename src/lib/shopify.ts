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

export async function getShopifyProduct(handle: string) {
    const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;

    const mockProduct = {
        id: "mock-product-1",
        title: 'A-Line Umbrella Kalamkari Kurti',
        handle: handle,
        descriptionHtml: "<p>Crafted from premium cotton, this A-Line kurti blends traditional Kalamkari prints with modern comfort. Perfect for everyday elegance.</p>",
        options: [{ name: "Size", values: ["S", "M", "L", "XL", "XXL"] }],
        priceRange: { minVariantPrice: { amount: "1299" } },
        images: { edges: [{ node: { url: "/hero-kurti.png.png", altText: "Mock Kurti" } }] },
        variants: {
            edges: [
                { node: { id: "mock-1-S", title: "S", availableForSale: true, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "S" }] } },
                { node: { id: "mock-1-M", title: "M", availableForSale: true, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "M" }] } },
                { node: { id: "mock-1-L", title: "L", availableForSale: false, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "L" }] } },
                { node: { id: "mock-1-XL", title: "XL", availableForSale: true, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "XL" }] } },
                { node: { id: "mock-1-XXL", title: "XXL", availableForSale: true, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "XXL" }] } }
            ]
        }
    };

    if (!domain || !token) {
        console.error("Missing Shopify credentials. Returning fallback data.");
        return mockProduct;
    }

    const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        options {
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 250) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
              }
              selectedOptions {
                name
                value
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
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`[Shopify Fetch] HTTP Error: ${response.status}`);
            return mockProduct;
        }

        const json = await response.json();

        if (json.errors) {
            console.error(`[Shopify Fetch] GraphQL Errors:`, JSON.stringify(json.errors, null, 2));
            return mockProduct;
        }

        return json.data?.product || mockProduct;
    } catch (error) {
        console.error(`[Shopify Fetch] Network or Fetch Error:`, error);
        return mockProduct;
    }
}

export async function getCollectionProducts(collectionHandle: string) {
    const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;

    if (!domain || !token) {
        console.error("Missing Shopify credentials. Returning fallback data.");
        return getFallbackProducts().slice(0, 4);
    }

    const query = `
    query getCollection($handle: String!) {
      collection(handle: $handle) {
        products(first: 4) {
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
            body: JSON.stringify({ query, variables: { handle: collectionHandle } }),
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`[Shopify Fetch] HTTP Error: ${response.status}`);
            return getFallbackProducts().slice(0, 4);
        }

        const json = await response.json();

        if (json.errors) {
            console.error(`[Shopify Fetch] GraphQL Errors:`, JSON.stringify(json.errors, null, 2));
            return getFallbackProducts().slice(0, 4);
        }

        const products = json.data?.collection?.products?.edges;
        if (!products || products.length === 0) {
            return getFallbackProducts().slice(0, 4);
        }
        return products;
    } catch (error) {
        console.error(`[Shopify Fetch] Network or Fetch Error:`, error);
        return getFallbackProducts().slice(0, 4);
    }
}
