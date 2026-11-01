(function () {
  var config = window.RWPST_FUNNEL || {};
  var currencyLabel = config.currencyLabel || "ج.م";

  function amount(value) {
    var number = Number(value);
    if (!isFinite(number)) {
      return "";
    }
    return String(Math.round(number)) + " " + currencyLabel;
  }

  function applyPrices() {
    var regular = Number(config.regularPrice);
    var launch = Number(config.launchPrice);
    var savings = regular - launch;
    var labels = {
      regular: amount(regular),
      launch: amount(launch),
      savings: amount(savings)
    };

    document.querySelectorAll("[data-price]").forEach(function (node) {
      var key = node.getAttribute("data-price");
      if (labels[key]) {
        node.textContent = labels[key];
      }
    });

    if (!(savings > 0)) {
      document.querySelectorAll(".price-was, .price-save").forEach(function (node) {
        node.hidden = true;
      });
    }
  }

  function whatsappDigits() {
    return String(config.whatsappNumber || "").replace(/\D/g, "");
  }

  function whatsappUrl(message) {
    var digits = whatsappDigits();
    if (!/^[1-9]\d{7,14}$/.test(digits)) {
      return "";
    }
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(message || "");
  }

  /* hero and pricing stay as tracking categories. Both are enrollment. */
  function messageKey(source) {
    if (source === "library" || source === "inquiry") {
      return source;
    }
    return "enroll";
  }

  function messageFor(source) {
    var messages = config.messages || {};
    var key = messageKey(source);
    var raw = messages[key] || messages.enroll || "";
    var launch = Number(config.launchPrice);
    var launchLabel = isFinite(launch) ? String(Math.round(launch)) : "";
    return raw.replace(/\{\{launchPrice\}\}/g, launchLabel);
  }

  function pixelId() {
    var id = String(config.metaPixelId || "").trim();
    return /^\d{5,20}$/.test(id) ? id : "";
  }

  function loadPixel() {
    var id = pixelId();
    if (!id || window.fbq) {
      return;
    }

    /* Official Meta loader, injected once, and only when an ID exists. */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", id);
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", {
      content_name: config.productName || "Prompting Like a Pro",
      content_type: "product",
      currency: config.priceCurrency || "EGP",
      value: Number(config.launchPrice) || 0
    });
  }

  function track(eventName, params) {
    if (!pixelId() || typeof window.fbq !== "function") {
      return;
    }
    window.fbq("track", eventName, params || {});
  }

  /* Lead and Purchase are available for a later confirmed step.
     Nothing on this page calls them. A WhatsApp click is Contact only. */
  window.RWPST_TRACK = {
    lead: function (params) {
      track("Lead", params);
    },
    purchase: function (params) {
      track("Purchase", params);
    }
  };

  function applyEnrollmentLinks() {
    var pending = document.querySelectorAll("[data-enroll-pending]");
    var ready = false;

    document.querySelectorAll("[data-enroll]").forEach(function (link) {
      var source = link.getAttribute("data-enroll") || "hero";
      var url = whatsappUrl(messageFor(source));
      var label = (link.textContent || "").replace(/\s+/g, " ").trim();

      if (!url) {
        link.href = link.getAttribute("data-fallback") || "#enroll";
        link.removeAttribute("target");
        link.removeAttribute("rel");
        return;
      }

      ready = true;
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("data-fallback");
      if (label) {
        link.setAttribute("aria-label", label + "، يفتح واتساب في علامة تبويب جديدة");
      }

      link.addEventListener("click", function () {
        track("Contact", {
          content_name: config.productName || "Prompting Like a Pro",
          content_category: source
        });
      });
    });

    pending.forEach(function (node) {
      node.hidden = ready;
    });
  }

  applyPrices();
  loadPixel();
  applyEnrollmentLinks();

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  if (!toggle || !nav) {
    return;
  }

  function setNav(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setNav(false);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setNav(false);
      toggle.focus();
    }
  });
})();
