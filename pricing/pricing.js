(() => {
  const format = (amount) =>
    "£" + amount.toLocaleString("en-GB", { maximumFractionDigits: 2 });
  const paidMonths = 10;
  const monthsPerYear = 12;
  const billing = document.querySelector(".billing-switch");
  const prices = [...document.querySelectorAll(".plan-price")];
  if (billing) {
    function updateBilling() {
      const yearly = billing.querySelector(":checked").value === "yearly";
      prices.forEach((price) => {
        const monthly = Number(price.dataset.monthly);
        const annual = monthly * paidMonths;
        const atMonthlyRate = monthly * monthsPerYear;
        // Yearly view leads with what the year costs; the monthly equivalent and the saving sit underneath.
        price.querySelector(".plan-amount").textContent = format(
          yearly ? annual : monthly,
        );
        price.querySelector(".plan-period").textContent = yearly
          ? " + VAT /user/year, billed yearly"
          : " + VAT /user/month";
        const original = price.querySelector(".plan-original");
        original.hidden = !yearly;
        original.lastChild.textContent = format(atMonthlyRate);
        price.querySelector(".price-cta-sub").textContent = yearly
          ? `Works out at ${format(annual / monthsPerYear)} + VAT per user a month`
          : `or ${format(annual)} + VAT per user, billed yearly`;
        const saving = price.querySelector(".plan-saving");
        saving.textContent = `Save ${format(atMonthlyRate - annual)} a year (2 months free)`;
        saving.hidden = !yearly;
      });
      document.getElementById("billing-status").textContent =
        yearly
          ? "Yearly prices per user, paid once a year. Two months free compared with monthly billing. All prices exclude VAT."
          : "Prices per user, billed monthly. All prices exclude VAT.";
    }
    billing.addEventListener("change", updateBilling);
    billing.hidden = false;
    updateBilling();
  }

  const calculator = document.getElementById("seatCalc");
  if (!calculator) return;
  const inputs = [...calculator.querySelectorAll("input[data-price]")];
  const seatCount = (input) =>
    Number.isFinite(input.valueAsNumber)
      ? Math.min(500, Math.max(0, Math.floor(input.valueAsNumber)))
      : 0;
  function updateTotal() {
    const monthly = inputs.reduce(
      (total, input) => total + seatCount(input) * Number(input.dataset.price),
      0,
    );
    document.getElementById("scMonth").textContent = format(monthly);
    const annual = monthly * paidMonths;
    document.getElementById("scYear").textContent = format(annual);
    document.getElementById("scEquivalent").textContent = format(
      annual / monthsPerYear,
    );
    document.getElementById("scSaving").textContent = format(
      monthly * monthsPerYear - annual,
    );
  }
  inputs.forEach((input) => {
    input.addEventListener("input", updateTotal);
    input.addEventListener("blur", () => {
      input.value = seatCount(input);
      updateTotal();
    });
  });
  updateTotal();
})();
