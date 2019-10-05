document.addEventListener('DOMContentLoaded', (event) => {


    document.getElementById('generate').addEventListener("click", () => {
        document.getElementById("modal").classList.remove("hide");
        document.getElementById("modalOverlay").classList.remove("hide");
    });

    document.getElementById('close-button').addEventListener("click", () => {
        document.getElementById("modal").classList.add("hide");
        document.getElementById("modalOverlay").classList.add("hide");
        // Clear situation changes to html
      errorMessage.innerHTML = '';
      document.getElementById('passwordLength').classList.remove('redBorder');
    });

    


  // On click of the generate button the password generation will be run and if the copy button is disabled it will be removed as a password if now available to copy
 document.getElementById('generateNow').addEventListener("click", () => {
     

      let chars = [];
      let lowerCase = "abcdefghijklmnopqrstuvwxyz";
      let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let numbers = "0123456789";
      let specialChars = "!#$%&()*+,-./:;<=>?@^_`{|}~";
      let passwordLength = document.getElementById('passwordLength').value;
      let password = '';
      let lowercaseCharacter = document.getElementById("lc_yes").checked;
      let uppercaseCharacter = document.getElementById("up_yes").checked;
      let numericCharacter = document.getElementById("num_yes").checked;
      let specialCharacter = document.getElementById("spch_yes").checked;
      let errorMessage = document.getElementById("errorMessage"); 

      // Clear situation changes to html
      errorMessage.innerHTML = '';
      document.getElementById('passwordLength').classList.remove('redBorder');
    
      // Checks and repeats until at least one type of character set is used
      if(isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128){
        errorMessage.innerHTML = 'Please provide a password length in numerical format, it must be between 8 and 128 characters';
        document.getElementById('passwordLength').classList.add('redBorder');
      }else if (lowercaseCharacter !== true && uppercaseCharacter !== true && numericCharacter !== true && specialCharacter !== true) {
        errorMessage.innerHTML = 'You must include at least one character set for the password generation.';
      }else{
        

      // Checks which of the character sets were asked for and pushes them to the chars variable
      if (lowercaseCharacter === true) {
          chars.push(lowerCase);
      }
      if (uppercaseCharacter === true) {
          chars.push(upperCase);
      }
      if (numericCharacter === true) {
          chars.push(numbers);
      }
      if (specialCharacter === true) {
          chars.push(specialChars);
      }

      //Generates at random the characters in our password generator
      let generatedPassword = () => {
          // Resets password value for loop to create new password
          password = '';
          //Loops equal to the previous set passwordLength
          while (password.length <= Number(passwordLength)) {
              //Randomizes from the array of character sets which to choose from either minimum 1 to a maximum of 4
              let charRand = Math.floor(Math.random() * Number(chars.length));
              // Randomizes a number from the length of the array index, this is used to brag a part of the string of for a password character
              let charRandRes = Math.random() * chars[charRand].length
              // CharAt to pull character from the array child string
              password += chars[charRand].charAt(charRandRes);
          }

          //Recursive fallbacks to make sure every specified character appears at least once.
          if (lowercaseCharacter === true) {
              if (password.match(/[a-z]/) === null) {
                  generatedPassword();
              }
          }

          if (uppercaseCharacter === true) {
              if (password.match(/[A-Z]/) === null) {
                  generatedPassword();
              }
          }

          if (numericCharacter === true) {
              if (password.match(/[0-9]/) === null) {
                  generatedPassword();
              }
          }

          if (specialCharacter === true) {
              if (password.match(/[!#$%&()*+,-./:;<=>?@^_`{|}~]/) === null) {
                  generatedPassword();
              }
          }
      }

      // Stops generation of a password when clicking to generate a password if numbercall is null otherwise generates password
          generatedPassword();
          document.getElementById('password').innerHTML = password;
          document.getElementById('copy').disabled = false;
      // Clears Modal
          document.getElementById("modal").classList.add("hide");
          document.getElementById("modalOverlay").classList.add("hide");
      }
  });

  // This targets the generated copy displayed on screen and copies it to the clipboard
  document.getElementById('copy').addEventListener("click", () => {
      let copyText = document.getElementById("password");
      copyText.select();
      copyText.setSelectionRange(0, 99999)
      document.execCommand("copy");
      alert("Copied the text: " + copyText.value);
  });



});