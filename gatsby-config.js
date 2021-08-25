module.exports = {
  siteMetadata: {
    siteUrl: `https://cafe-366.myshopify.com`,
  },

  flags: {
    FAST_DEV: true,
  },
  // plugins: [
  //   {
  //     resolve: `gatsby-source-shopify`,
  //     options: {
  //       apiKey: process.env.SHOPIFY_API_KEY,
  //       password: process.env.SHOPIFY_SHOP_PASSWORD,
  //       storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
  //       // storeUrl: "cafe-366.myshopify.com",
  //       shopifyConnections: ["collections"],
  //     },
  //   },
  // ],
};
