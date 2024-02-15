const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("output");

const romanNumberConverter = (num) => {
    // This array of objects holds the Roman numeral letters and their corresponding values.
    const romanNumerals = [
        { letter: 'M', value: 1000 },
        { letter: 'CM', value: 900 },
        { letter: 'D', value: 500 },
        { letter: 'CD', value: 400 },
        { letter: 'C', value: 100 },
        { letter: 'XC', value: 90 },
        { letter: 'L', value: 50 },
        { letter: 'XL', value: 40 },
        { letter: 'X', value: 10 },
        { letter: 'IX', value: 9 },
        { letter: 'V', value: 5 },
        { letter: 'IV', value: 4 },
        { letter: 'I', value: 1 },
    ];
    // This string will hold the final Roman numeral.
    let roman = '';
    // Loop through the romanNumerals array.
    for (let i = 0; i < romanNumerals.length; i++) {
        // Check if the number passed is greater than or equal to the current roman numeral value.
        // If it's not: the program moves on to the next iteration of the for loop.
        // If it is: the program will run the code inside the while loop till the condition is false.
        while (num >= romanNumerals[i].value) {
            // First it will add the current roman numeral letter to the final string.
            roman += romanNumerals[i].letter;
            // Second subtract the current roman numeral value from the number, and finally run the while loop again.
            num -= romanNumerals[i].value;
        }
    }

    return roman;
};

const checkUserInput = () => {
    const inputInt = parseInt(numberInput.value);

    if (!numberInput.value || isNaN(inputInt)) {
        result.textContent = "Please enter a valid number";
        result.classList.remove("hidden");
        result.classList.add("error");
        return;
    } else if (inputInt <= 0) {
        result.textContent = "Please enter a number greater than or equal to 1";
        result.classList.remove("hidden");
        result.classList.add("error");
        return;
    } else if (inputInt >= 4000) {
        result.textContent = "Please enter a number less than or equal to 3999";
        result.classList.remove("hidden");
        result.classList.add("error");
        return;
    }

    result.classList.remove("error");
    result.textContent = romanNumberConverter(inputInt);
    result.classList.remove("hidden");
    numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
});