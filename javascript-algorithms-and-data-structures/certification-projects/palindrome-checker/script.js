document.getElementById('check-btn').addEventListener('click', function () {
    // Firs we get the input value.
    const str = document.getElementById('text-input').value;
    // Then we get the div from the HTML with the ID result.
    const resultDiv = document.getElementById('result');

    // This if statement is to check if the str value for the input is empty to create an alert.
    if (!str.trim()) {
        alert('Please input a value');
        return;
    }

    // We create an arrow function to check if the string is a palindrom.
    const isPalindrome = str => {
        // Convert the string into lower case and replace non-alphanumeric characters, we save this into cleanedStr.
        const cleanedStr = str.toLowerCase().replace(/[\W_]/g, '');
        // We return the boolean from the comparison between cleanedStr and the reverse string, if they are the same it's true.
        return cleanedStr === cleanedStr.split('').reverse().join('');
    };

    // Use if statement to return one text or the other to the resultDiv.
    if (isPalindrome(str)) {
        resultDiv.textContent = `${str} is a palindrome.`;
    } else {
        resultDiv.textContent = `${str} is not a palindrome.`;
    }
    // Afterwards we remove the "hidden" class for the div to show the result.
    resultDiv.classList.remove('hidden');
});