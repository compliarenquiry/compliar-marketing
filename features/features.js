(() => {
  const filters = document.querySelector(".feature-filters");
  const cards = [...document.querySelectorAll(".feature-card")];
  if (!filters || !cards.length) return;

  const buttons = [...filters.querySelectorAll("[data-filter]")];
  const status = document.querySelector(".filter-status");
  function showCategory(category) {
    let visible = 0;
    cards.forEach((card) => {
      const matches =
        category === "all" ||
        card.dataset.category.split(" ").includes(category);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.filter === category),
      );
    });
    status.textContent = `Showing ${visible} of ${cards.length} features`;
  }
  buttons.forEach((button) => {
    button.addEventListener("click", () => showCategory(button.dataset.filter));
  });
  // Deep links remain usable even after a visitor has narrowed the feature list.
  window.addEventListener("hashchange", () => {
    const target = cards.find((card) => `#${card.id}` === location.hash);
    if (target?.hidden) {
      showCategory("all");
      target.scrollIntoView();
    }
  });
  filters.hidden = false;
  showCategory("all");
})();
