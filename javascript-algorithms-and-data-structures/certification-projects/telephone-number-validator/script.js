document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const checkBtn = document.getElementById("check-btn");
  const clearBtn = document.getElementById("clear-btn");
  const resultsDiv = document.getElementById("results-div");

  // Function that checks if a phone number is a valid US phone number.
  function isValidPhoneNumber(phoneNumber) {
    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(phoneNumber);
  }

  // Function that updates the result message based on the phone number validity.
  function updateResultMessage(phoneNumber, isValid) {
    resultsDiv.textContent = isValid
      ? "Valid US number: " + phoneNumber
      : "Invalid US number: " + phoneNumber;
  }

  // Function that checks if there is a phone number and then calls the isValidPhoneNumber & updateResultMessage functions.
  function checkPhoneNumber() {
    const phoneNumber = userInput.value;
    if (!phoneNumber) {
      alert("Please provide a phone number");
      return;
    }

    const isValid = isValidPhoneNumber(phoneNumber);
    updateResultMessage(phoneNumber, isValid);
  }

  // Function that clears the result message and the user input.
  function clearResult() {
    resultsDiv.textContent = "";
    userInput.value = "";
  }

  checkBtn.addEventListener("click", checkPhoneNumber);
  clearBtn.addEventListener("click", clearResult);
});
