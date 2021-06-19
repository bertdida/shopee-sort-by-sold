(() => {
  const ITEM_SELECTOR = ".shopee-search-item-result__item";
  const ITEM_SOLD_SELECTOR = ".go5yPW";
  const CONTAINER_SELECTOR = ".shopee-search-item-result__items";

  function parseSold(value) {
    const cleanedValue = value.toString().replace(/sold/i, "").trim();

    if (!cleanedValue.length) {
      return 0;
    }

    const multipliers = { h: 100, k: 1000, m: 1000000 };
    const multiplierKey = cleanedValue.split("").pop().toLowerCase();
    const multiplier = multipliers[multiplierKey] || 1;

    return parseFloat(value) * multiplier;
  }

  function sortSold(a, b) {
    return (
      parseSold(b.querySelector(ITEM_SOLD_SELECTOR).innerText) -
      parseSold(a.querySelector(ITEM_SOLD_SELECTOR).innerText)
    );
  }

  const elements = document.createDocumentFragment();
  [...document.querySelectorAll(ITEM_SELECTOR)]
    .filter((e) => e.querySelector(ITEM_SOLD_SELECTOR))
    .sort(sortSold)
    .forEach((e) => elements.appendChild(e.cloneNode(true)));

  const container = document.querySelector(CONTAINER_SELECTOR);
  if (container) {
    container.innerHTML = null;
    container.appendChild(elements);
    container.scrollIntoView({ behavior: "smooth" });
  }
})();
