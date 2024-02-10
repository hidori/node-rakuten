"use strict";

export const Emagazine = {
  RakutenJob: class EMagazineRakutenJob {
    async run({ crawler, page, nickname }) {
      await page.goto(
        "https://emagazine.rakuten.co.jp/ns?act=chg_news&l=ja&f=member",
      );

      const checkboxes = await page.$$(
        "input[type='checkbox'][name='sid[]'][checked]",
      );
      crawler.infoSync(`${nickname}: found ${checkboxes.length} items`);

      if (checkboxes.length < 1) {
        crawler.infoSync(`${nickname}: done`);
        return;
      }

      const allUncheck = page.locator("#allUncheck").first();
      await allUncheck.click();

      const commit = page.locator("#btnRegister");
      await commit.click();

      crawler.infoSync(`${nickname}: done`);
    }
  },
  ShopJob: class EMagazineShopJob {
    async run({ crawler, page, nickname }) {
      await page.goto(
        "https://emagazine.rakuten.co.jp/ns?act=chg_rmail&f=member",
      );

      const checkboxes = await page.$$(
        "div#rmail_container >> form >> input[type='checkbox'][name='sid[]'][checked]",
      );
      crawler.infoSync(`${nickname}: found ${checkboxes.length} items`);

      if (checkboxes.length < 1) {
        crawler.infoSync(`${nickname}: done`);
        return;
      }

      const allUncheck = page
        .locator("div#rmail_container >> form >> #allUncheck")
        .first();
      await allUncheck.click();

      const confirm = page
        .locator("div#rmail_container >> form >> input[type='submit']")
        .first();
      await confirm.click();

      const commit = page.locator("form >> input[type='submit']").first();
      await commit.click();

      crawler.infoSync(`${nickname}: done`);
    }
  },
};
