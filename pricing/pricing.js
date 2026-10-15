(() => {
  const format = (amount) => "£" + amount.toLocaleString("en-GB");
  const billing = document.querySelector(".billing-switch");
  const prices = [...document.querySelectorAll(".plan-price")];
  if (billing) {
    function updateBilling() {
      const yearly = billing.querySelector(":checked").value === "yearly";
      prices.forEach((price) => {
        const monthly = Number(price.dataset.monthly);
        price.querySelector(".plan-amount").textContent = format(
          monthly * (yearly ? 10 : 1),
        );
        price.querySelector(".plan-period").textContent = yearly
          ? " + VAT /user/year"
          : " + VAT /user/month";
        price.querySelector(".price-cta-sub").textContent = yearly
          ? `${format(monthly * 2)} less than 12 monthly payments`
          : `or ${format(monthly * 10)} + VAT per user, billed yearly`;
      });
      document.getElementById("billing-status").textContent =
        `Prices per user, billed ${yearly ? "yearly" : "monthly"}. All prices exclude VAT.`;
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
    document.getElementById("scYear").textContent = format(monthly * 10);
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
