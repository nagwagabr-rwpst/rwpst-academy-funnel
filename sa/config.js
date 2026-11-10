/* Saudi Arabia funnel configuration.
   Loaded only by sa/index.html. The Egyptian funnel keeps scripts/config.js.

   Prices are numbers. sa/index.html formats them with currencyLabel.
   Savings are calculated as regularPrice - launchPrice.

   whatsappNumber: digits only, country code, no plus sign, spaces, or
   leading zero. The owner approved the existing business number for
   Saudi inquiries. It is stored here on its own. This file does not
   read scripts/config.js.

   checkoutUrl: leave empty. Payment details are sent privately on
   WhatsApp after the customer confirms the order. Do not add a
   checkout URL, and do not point this at the Egyptian Odoo product.

   metaPixelId: numeric Pixel ID for this market only. Leave "" until
   a real ID is supplied. An empty value does not load the Pixel.
*/
window.RWPST_FUNNEL = Object.freeze({
  market: "SA",
  productName: "Prompting Like a Pro + RWPST AI Studio",
  regularPrice: 149,
  launchPrice: 99,
  currencyLabel: "ر.س",
  priceCurrency: "SAR",
  checkoutUrl: "",
  whatsappNumber: "201006786392",
  messages: {
    enroll: "مرحبًا، أرغب في معرفة تفاصيل الاشتراك في Prompting Like a Pro بسعر الإطلاق 99 ريال سعودي. أرجو إرسال تفاصيل المحتوى وطريقة الدفع.",
    library: "مرحبًا، أرغب في معرفة المزيد عن Context Library المرفقة مع حزمة Prompting Like a Pro + RWPST AI Studio بسعر الإطلاق 99 ريال سعودي.",
    inquiry: "مرحبًا، لدي استفسار من صفحة السعودية بخصوص حزمة Prompting Like a Pro + RWPST AI Studio."
  },
  metaPixelId: ""
});
