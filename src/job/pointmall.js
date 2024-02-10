"use strict";

export const Pointmall = {
  BoxJob: class BoxJob {
    async run({ crawler, page, nickname }) {
      await page.goto("https://member.pointmail.rakuten.co.jp/box");

      const ok = await crawler.try(60, async () => {
        const checkboxes = await page.$$("div.mailboxBox >> ul >> li >> div.bookmark >> a.favorite_off_icon");
        if (checkboxes.length > 0) {
          crawler.infoSync(`${nickname}: found ${checkboxes.length} items`);
          return true
        }

        await page.waitForTimeout(1000)
      })
      if (!ok) {
        crawler.infoSync(`${nickname}: done`);
        return;
      }

      for (; ;) {
        const item = await page.$("div.mailboxBox >> ul >> li");
        if (item == null) {
          break;
        }

        const bookmark = await item.$("a.favorite_off_icon");
        if (bookmark == null) {
          break;
        }

        await bookmark.click();
        await item.click();

        break;
      }

      crawler.infoSync(`${nickname}: done`);
    }
  },
};
