// GLOBAL VARIABLES: These werw asked to be Globals, so that's why they are here.
let price = 1.87;
// CID = Cash in drawer
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

document.addEventListener("DOMContentLoaded", () => {
  const cash = document.getElementById("cash");
  const purchaseBtn = document.getElementById("purchase-btn");
  const changeDueDiv = document.getElementById("change-due");
  const priceDisplay = document.getElementById("price");
  const cashDrawer = document.getElementById("cash-drawer");
  // The currency unit in order to calculate the change.
  const currencyUnit = {
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };

  // Update price display
  priceDisplay.textContent = `$${price.toFixed(2)}`;

  // Populate cash drawer
  const drawerHTML = cid
    .map(([unit, amount]) => `<span>${unit}: $${amount.toFixed(2)}</span>`)
    .join("");
  cashDrawer.innerHTML = drawerHTML;

  const calculateChange = (price, cash, cid) => {
    let result = [];
    // Due is the amount of change that needs to be returned to the customer.
    let changeDue = Number((cash - price).toFixed(2));
    // Reverse the CID array to get the highest currency unit first.
    const drawer = [...cid].reverse();
    // Calculate total cash in drawer
    const totalCID = cid.reduce((sum, [, amount]) => sum + amount, 0);

    console.log("Change needed:", changeDue);

    // Handle status based on remaining changeDue
    if (totalCID < changeDue) {
      // status.textContent = "Status: INSUFFICIENT_FUNDS";
      changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
    }

    if (totalCID === changeDue) {
      changeDueDiv.textContent =
        "Status: CLOSED " +
        cid
          .filter(([, amount]) => amount > 0)
          .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
          .join(" ");
      return;
    } else {
      // Calculate change using each denomination
      for (const [unit, drawerAmount] of drawer) {
        const unitValue = currencyUnit[unit];
        let unitSum = 0;

        // Keep giving this denomination while possible
        while (changeDue >= unitValue && drawerAmount >= unitSum + unitValue) {
          unitSum = Number((unitSum + unitValue).toFixed(2));
          changeDue = Number((changeDue - unitValue).toFixed(2));
        }

        if (unitSum > 0) {
          result.push([unit, unitSum]);
        }
      }

      if (changeDue > 0) {
        status.textContent = "Status: INSUFFICIENT_FUNDS";
        return;
      }
    }
    // Format change output
    const changeString = result
      .filter(([, amount]) => amount > 0)
      .map(([unit, amount]) => `${unit}: $${amount.toFixed(2)}`)
      .join(" ");
    changeDueDiv.textContent = "Status: OPEN " + `${changeString}`;
  };

  purchaseBtn.addEventListener("click", () => {
    // Convert cash input value to number
    const cashAmount = Number(cash.value);

    if (price > cashAmount) {
      alert("Customer does not have enough money to purchase the item");
      return;
    }

    if (cashAmount === price) {
      changeDueDiv.textContent =
        "No change due - customer paid with exact cash";
      return;
    }

    calculateChange(price, cashAmount, cid);
  });
});
