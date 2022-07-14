"use strict";
var _a;
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
            trackingId: (_a = process.env.SEVER_GOOGLE_ANALYTICS_KEY) !== null && _a !== void 0 ? _a : "UA-230613860-3",
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
