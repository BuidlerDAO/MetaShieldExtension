import { Analytics } from "analytics"
import "dotenv/config"

const googleAnalytics = require("@analytics/google-analytics").default

// https://github.com/davidwells/analytics
export const analytics = Analytics({
  app: "MetaShield-Nodejs",
  version: "0.01",
  plugins: [
    googleAnalytics({
      trackingId: process.env.SEVER_GOOGLE_ANALYTICS_KEY??"G-1PEVFJ8R43",
    }),
  ]
})

// Example
// /* Track a page view */
// analytics.page()

// /* Track a custom event */
// analytics.track("userPurchase", {
//   price: 20,
//   item: "pink socks"
// })

// /* Identify a visitor */
// analytics.identify("user-id-xyz", {
//   firstName: "bill",
//   lastName: "murray",
//   email: "da-coolest@aol.com"
// })