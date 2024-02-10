"use strict";

// import * as Crawler from "@hidori/playwright-crawler-core";
import dotenv from "dotenv";

import * as Crawler from "../../node-playwright-crawler-core/src/index.js";
import * as Job from "./job/index.js";

dotenv.config();

const config = {
  crawler: {
    playwright: {
      channel: process.env.PLAYWRIGHT_CHANNEL,
      headless: process.env.PLAYWRIGHT_HEADLESS === "true",
    },
  },
  login: {
    id: process.env.LOGIN_ID,
    pw: process.env.LOGIN_PW,
  },
};

const crawler = new Crawler.Crawler(config.crawler, {
  login: new Job.LoginJob(config.login),
  "emagazine/rakuten": new Job.Emagazine.RakutenJob(),
  "emagazine/shop": new Job.Emagazine.ShopJob(),
  "pointmall/box": new Job.Pointmall.BoxJob(),
});

(async () => await crawler.run(process.argv.slice(2)))();
