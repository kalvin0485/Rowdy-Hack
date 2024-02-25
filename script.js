const dropdowns = document.querySelectorAll('.dropdown');

//Loop through all dropdown elements
dropdowns.forEach(dropdown => {
   const select = dropdown.querySelector('.select');
   const caret = dropdown.querySelector('.caret');
   const menu = dropdown.querySelector('.menu');
   const options = dropdown.querySelectorAll('.menu li');
   const selected = dropdown.querySelector('.selected');

   select.addEventListener('click', () => {
      select.classList.toggle('select-clicked');
      caret.classList.toggle('caret-rotate');
      menu.classList.toggle('menu-open');
   });
   options.forEach(option => {
      option.addEventListener('click', () => {
         selected.innerText = option.innerText;
         select.classList.remove('select-clicked');
         caret.classList.remove('caret-rotate');
         menu.classList.remove('menu-open');
         options.forEach(option => {
            option.classList.remove('active');
         });
         option.classList.add('active');
      });
   });
});

function convertText() {
   const selectedValue = document.querySelector('.selected').innerText; // Retrieve the selected value within the function
   console.log("Selected Cipher:", selectedValue);

   const plaintext = document.getElementById('plaintext').value;
   const shift = parseInt(document.getElementById('shift').value); // Parse shift value as an integer
   const resultElement = document.getElementById('result');

   // Function to decode text using Caesar Cipher
   function decodeCaesarCipher(text, shift) {
      let decodedText = '';
      for (let i = 0; i < text.length; i++) {
         let charCode = text.charCodeAt(i);
         if (charCode >= 65 && charCode <= 90) {
            // For uppercase letters
            decodedText += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
         } else if (charCode >= 97 && charCode <= 122) {
            // For lowercase letters
            decodedText += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
         } else {
            // For non-alphabetic characters
            decodedText += text[i];
         }
      }
      return decodedText;
   }
   // Function to perform ROT13 cipher
   function cipherRot13(str) {
      str = str.toUpperCase();
      return str.replace(/[A-Z]/g, rot13);

      function rot13(correspondence) {
         const charCode = correspondence.charCodeAt();
         // A = 65, Z = 90
         return String.fromCharCode(
            ((charCode + 13) <= 90) ? charCode + 13 : (charCode + 13) % 90 + 64
         );
      }
   }
   const caesarCipherText = decodeCaesarCipher(plaintext, shift);
   const rot13CipherText = cipherRot13(plaintext);

   console.log("Caesar Cipher:", caesarCipherText);
   console.log("ROT13 Cipher:", rot13CipherText);
   document.getElementById("result").innerText = cipherRot13(plaintext);
   // Decode plaintext using Caesar Cipher
   // const decodedText = decodeCaesarCipher(plaintext, shift);

   // Display the decoded text based on the selected cipher
   if(selectedValue === "Rot-13") {
      resultElement.textContent = `Decoded Text (ROT13): ${rot13CipherText}`;
   } else {
      resultElement.textContent = `Decoded Text (Caesar Cipher): ${caesarCipherText}`;
   }
}

document.getElementById("convertButton").addEventListener("click", convertText);
