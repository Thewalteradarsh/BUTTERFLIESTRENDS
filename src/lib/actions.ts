"use server";

export async function createCartAndGetCheckoutUrl(variantId: string, quantity: number = 1) {
    // For mock products, just redirect to home
    if (variantId.startsWith("mock-")) {
        return "/";
    }

    const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
    const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;

    if (!domain || !token) {
        throw new Error("Missing Shopify credentials");
    }

    const query = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
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
        input: {
            lines: [
                {
                    merchandiseId: variantId,
                    quantity: quantity
                }
            ]
        }
    };

    const endpoint = `https://${domain}/api/2024-01/graphql.json`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store'
    });

    const json = await response.json();

    if (json.errors || json.data?.cartCreate?.userErrors?.length > 0) {
        console.error("[Shopify Fetch] Cart creation failed", json.errors || json.data?.cartCreate?.userErrors);
        throw new Error("Failed to create cart");
    }

    return json.data.cartCreate.cart.checkoutUrl;
}
