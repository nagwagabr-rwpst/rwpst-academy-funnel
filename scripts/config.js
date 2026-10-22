/* RWPST funnel configuration
   Change the checkout URL here. scripts/main.js copies it onto every
   [data-checkout] link. Keep the matching href values in index.html
   in sync so the buttons still work if JavaScript is unavailable.

   Price label: observed on the Odoo product page on 22 Oct 2026.
   The product page is the price of record at payment. Do not invent a discount.
*/
window.RWPST_FUNNEL = Object.freeze({
  productName: "Prompting Like a Pro",
  checkoutUrl: "https://edu-rwpst-web1.odoo.com/shop/prompting-like-a-pro-4",
  priceLabel: "599 ج.م",
  priceCurrency: "EGP"
});
