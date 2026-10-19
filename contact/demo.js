(() => {
  const preferences = document.querySelector(".demo-preferences");
  const email = document.getElementById("demo-email");
  if (!preferences || !email) return;
  const focus = document.getElementById("demo-focus");
  const team = document.getElementById("demo-team");
  const notes = document.getElementById("demo-notes");
  const summary = document.getElementById("demo-request-summary");
  function updateRequest() {
    const extra = notes && notes.value.trim() ? `\n\nMy request:\n${notes.value.trim()}` : "";
    const body = `Hi Compliar,\n\nI’d like to arrange a demo.\n\nFocus: ${focus.value}\nTeam size: ${team.value}\nTrade: \nCurrent software: \nPreferred times: ${extra}\n\nThanks,`;
    email.href = `mailto:enquiry@compliar.co.uk?subject=${encodeURIComponent("Compliar demo request")}&body=${encodeURIComponent(body)}`;
    summary.textContent = `Your email draft will include: ${focus.value.toLowerCase()}${team.value === "Not specified" ? "" : ", " + team.value.toLowerCase()}.`;
  }
  preferences.addEventListener("change", updateRequest);
  preferences.addEventListener("input", updateRequest);
  updateRequest();
  preferences.hidden = false;
})();
