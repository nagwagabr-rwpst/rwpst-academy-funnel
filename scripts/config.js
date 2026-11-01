/* RWPST funnel configuration
   scripts/main.js reads this object. Change prices, the WhatsApp
   number, and the Meta Pixel ID here — not in each page section.

   Prices are numbers. The page formats them with currencyLabel.
   Savings are calculated as regularPrice - launchPrice.

   whatsappNumber: digits only, with country code, no plus sign,
   spaces, or leading zero. This is the only place the official
   WhatsApp Business number is stored. An empty or invalid value
   must not create a wa.me link.

   metaPixelId: numeric Pixel ID. Leave it as an empty string to keep
   the Pixel off. See README for what fires when an ID is added.
   Do not put a guessed ID here.
*/
window.RWPST_FUNNEL = Object.freeze({
  productName: "Prompting Like a Pro",
  regularPrice: 999,
  launchPrice: 799,
  currencyLabel: "ج.م",
  priceCurrency: "EGP",
  /* Previous Odoo product URL. Online checkout is not the enrollment
     channel, so the page does not link to it. */
  checkoutUrl: "https://edu-rwpst-web1.odoo.com/shop/prompting-like-a-pro-4",
  whatsappNumber: "201006786392",
  messages: {
    enroll: "مرحباً، أرغب في الاشتراك في كورس Prompting Like a Pro. من فضلكم أرسلوا لي تفاصيل التسجيل والدفع.",
    library: "مرحباً، أريد معرفة المزيد عن Context Library المرفقة مع كورس Prompting Like a Pro.",
    inquiry: "مرحباً، لدي استفسار بخصوص كورس Prompting Like a Pro."
  },
  metaPixelId: ""
});
