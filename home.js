(() => {
  const tabs = document.querySelector(".journey-tabs");
  if (!tabs) return;
  const buttons = [...tabs.querySelectorAll("[data-stage]")];
  const panels = buttons.map((button) =>
    document.getElementById(button.getAttribute("aria-controls")),
  );
  if (panels.some((panel) => !panel)) return;

  function activate(index, focus = false) {
    buttons.forEach((button, i) => {
      const selected = i === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (focus) buttons[index].focus();
  }

  buttons.forEach((button, index) => {
    panels[index].setAttribute("role", "tabpanel");
    panels[index].setAttribute("aria-labelledby", button.id);
    panels[index].tabIndex = 0;
    button.addEventListener("click", () => activate(index));
    button.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % buttons.length;
      else if (event.key === "ArrowLeft")
        next = (index - 1 + buttons.length) % buttons.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = buttons.length - 1;
      else return;
      event.preventDefault();
      activate(next, true);
    });
  });
  activate(0);
  tabs.hidden = false;
})();
