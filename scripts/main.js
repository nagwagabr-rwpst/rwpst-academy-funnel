(function () {
  var config = window.RWPST_FUNNEL || {};
  var checkoutUrl = config.checkoutUrl || "";

  if (checkoutUrl) {
    document.querySelectorAll("[data-checkout]").forEach(function (link) {
      link.href = checkoutUrl;
    });
  }

  if (config.priceLabel) {
    document.querySelectorAll("[data-price]").forEach(function (node) {
      node.textContent = config.priceLabel;
    });
  }

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
