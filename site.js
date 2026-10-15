// Preserve links to sections moved off the original homepage.
const legacySections = {
  features: "/features/",
  certificates: "/features/#certificates",
  pricing: "/pricing/",
  faq: "/faqs/",
  roadmap: "/about/#roadmap",
};
if (location.pathname === "/" || location.pathname === "/index.html") {
  const destination = legacySections[location.hash.slice(1)];
  if (destination) location.replace(destination);
}
const menu = document.querySelector(".mobile-menu");
if (menu) {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) || event.target.closest("a"))
      menu.open = false;
  });
}
