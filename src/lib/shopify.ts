export async function getShopifyProducts() {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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
            next: { tags: ['products'] },
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
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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
                { node: { id: "mock-1-S", title: "S", availableForSale: true, quantityAvailable: 4, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "S" }] } },
                { node: { id: "mock-1-M", title: "M", availableForSale: true, quantityAvailable: 10, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "M" }] } },
                { node: { id: "mock-1-L", title: "L", availableForSale: false, quantityAvailable: 0, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "L" }] } },
                { node: { id: "mock-1-XL", title: "XL", availableForSale: true, quantityAvailable: 2, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "XL" }] } },
                { node: { id: "mock-1-XXL", title: "XXL", availableForSale: true, quantityAvailable: 20, price: { amount: "1299" }, selectedOptions: [{ name: "Size", value: "XXL" }] } }
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
              quantityAvailable
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
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

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

export async function shopifyFetch({ query, variables }: { query: string, variables?: any }) {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!domain || !token) {
        throw new Error("Missing Shopify credentials.");
    }

    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(`[Shopify Fetch] HTTP Error: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
        throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
    }

    return json;
}

export async function createCart(variantId?: string, quantity?: number) {
    const query = `
        mutation cartCreate($input: CartInput) {
            cartCreate(input: $input) {
                cart {
                    id
                    checkoutUrl
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    let variables = {};
    if (variantId && quantity) {
        variables = {
            input: {
                lines: [
                    {
                        merchandiseId: variantId,
                        quantity: quantity
                    }
                ]
            }
        };
    }
    const res = await shopifyFetch({ query, variables });
    return res.data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string, quantity: number }[]) {
    const query = `
        mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                    checkoutUrl
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    const variables = {
        cartId,
        lines
    };
    const res = await shopifyFetch({ query, variables });
    return res.data?.cartLinesAdd?.cart;
}

export async function getCart(cartId: string) {
    const query = `
        query getCart($cartId: ID!) {
            cart(id: $cartId) {
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
                                    image {
                                        url
                                        altText
                                    }
                                    price {
                                        amount
                                    }
                                    product {
                                        title
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `;
    const variables = {
        cartId
    };
    const res = await shopifyFetch({ query, variables });
    return res.data?.cart;
}

export async function getShopPolicy(handle: string) {
    const query = `
        query getPolicies {
            shop {
                privacyPolicy { title body }
                termsOfService { title body }
                refundPolicy { title body }
                shippingPolicy { title body }
            }
        }
    `;
    
    try {
        const res = await shopifyFetch({ query });
        const shop = res.data?.shop;
        if (!shop) return null;

        switch (handle) {
            case 'privacy-policy':
                return shop.privacyPolicy;
            case 'terms-of-service':
                return shop.termsOfService;
            case 'refund-policy':
                return shop.refundPolicy;
            case 'shipping-policy':
                return shop.shippingPolicy;
            default:
                return null;
        }
    } catch (error) {
        console.error("Error fetching policy:", error);
        return null;
    }
}

