"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = void 0;
const analytics_1 = require("analytics");
require("dotenv/config");
const googleAnalytics = require("@analytics/google-analytics").default;
// https://github.com/davidwells/analytics
exports.analytics = (0, analytics_1.Analytics)({
    app: "MetaShield-Nodejs",
    version: "0.01",
    plugins: [
        googleAnalytics({
            trackingId: process.env.SEVER_GOOGLE_ANALYTICS_KEY,
        }),
    ]
});
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
