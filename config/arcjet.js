import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import { ARCJET_API } from "./env.js"
const aj = arcjet({
    key: ARCJET_API,
    characteristics: ["ip.src"],
    rules:[
        // Shield protects the apps from common attacks e.g. SQL injection
        shield({ mode:"LIVE" }),
        detectBot({
            mode: "LIVE",
            allow:[
                "CATEGORY:ACADEMIC",
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:UNKNOWN",
                "CATEGORY:ADVERTISING",
                "CATEGORY:AI"
            ]
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 10,
            interval: 15,
            capacity: 15,
        })
    ]
});


export default aj;