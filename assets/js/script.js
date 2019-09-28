document.addEventListener('DOMContentLoaded', (event) => {



// On click of the generate button the password generation will be run and if the copy button is disabled it will be removed as a password if now available to copy
document.getElementById('generate').addEventListener("click", () => {

  let chars = [];
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";
  let specialChars = "!#$%&()*+,-./:;<=>?@^_`{|}~";
  let passwordLength;
  let password = '';
  
  
  // Call function to check is if the prompts value is a number greater than 7 or 8 if it's not rerun the function
    let lengthConfirm = () => {
      let numbercall = prompt("Provide a password length, it must be between 8 and 128 characters");

      
      /*if( numbercall === null){
        console.log("I want to escape that would be good.")
      }else*/ if (isNaN(numbercall) || false || numbercall < 8 || numbercall > 128 ){
        alert("Incorrect value.");
        lengthConfirm()
      }else{
       passwordLength = numbercall ;
      }
    }
   
    // Runs lengthConfrim function grabbing the length for the password
    let generatePasswordLength = lengthConfirm();
    let lowercaseCharacter;
    let uppercaseCharacter;
    let numericCharacter;
    let specialCharacter;
  
    // Gathers all the other information for program logic and error checking
    let charSetConfirm = () => {
      lowercaseCharacter = confirm("Does it require a lower case character?");
      uppercaseCharacter = confirm("Does it require an upper case character?");
      numericCharacter = confirm("Does it require a numeric character?");
      specialCharacter = confirm("Does it require a special character?");
  
      // Checks and repeats until at least one type of character set is used
      if( lowercaseCharacter !== true && uppercaseCharacter !== true && numericCharacter !== true && specialCharacter !== true ){
        alert("You must include at least one character set.");
        charSetConfirm();
      }
    }
  
    // Checks at least one type of character set is used
    charSetConfirm();
  
    // Checks which of the character sets were asked for and pushes them to the chars variable
    if(lowercaseCharacter === true){
      chars.push(lowerCase);
    }
    if(uppercaseCharacter === true){
      chars.push(upperCase);
    }
    if(numericCharacter === true){
      chars.push(numbers);
    }
    if(specialCharacter === true){
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
        if(lowercaseCharacter === true){
          if(password.match(/[a-z]/) === null){
            console.log('1');
            generatedPassword();
          }
        }
    
        if(uppercaseCharacter === true){
          if(password.match(/[A-Z]/) === null){
            console.log('2');
            generatedPassword();
          }
        }
    
        if(numericCharacter === true){
          if(password.match(/[0-9]/) === null){
            console.log('3');
            generatedPassword();
          }
        }
    
        if(specialCharacter === true){
          if(password.match(/[!#$%&()*+,-./:;<=>?@^_`{|}~]/) === null){
            console.log('4');
            generatedPassword();
          }
        }
    }


  generatedPassword();
  document.getElementById('password').innerHTML = password; 
  document.getElementById('copy').disabled = false;
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