document.addEventListener('DOMContentLoaded', (event) => {

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
    if (isNaN(numbercall) || false || numbercall < 8 || numbercall > 128 ){
      alert("Incorrect value.");
      lengthConfirm()
    }else{
     passwordLength = numbercall ;
    }
  }
 
  let generatePasswordLength = lengthConfirm();

  let lowercaseCharacter;
  let uppercaseCharacter;
  let numericCharacter;
  let specialCharacter;

  let charSetConfirm = () => {
    lowercaseCharacter = confirm("Does it require a lower case character?");
    uppercaseCharacter = confirm("Does it require an upper case character?");
    numericCharacter = confirm("Does it require a numeric character?");
    specialCharacter = confirm("Does it require a special character?");

    if( lowercaseCharacter !== true && uppercaseCharacter !== true && numericCharacter !== true && specialCharacter !== true ){
      alert("You must include at least one character set.");
      charSetConfirm();
    }
  }

  charSetConfirm();


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



 let generatedPassword = () => {
    password = '';
    while (password.length <= Number(passwordLength)) {
      let randomNumber = Math.floor(Math.random() * Number(chars.length));
      if (randomNumber === 0){
        password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
      }else if(randomNumber === 1){
        password += upperCase[Math.floor(Math.random() * lowerCase.length)];
      }else if(randomNumber === 2){
        password += numbers[Math.floor(Math.random() * numbers.length)];
      }else if(randomNumber === 3){
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
      }
    }

    if(lowercaseCharacter === true){
      if(password.match(/[a-z]/i) === null){
        generatedPassword();
      }
    }

    if(uppercaseCharacter === true){
      if(password.match(/[A-Z]/i) === null){
        generatedPassword();
      }
    }

    if(numericCharacter === true){
      if(password.match(/[!#$%&()*+,-./:;<=>?@^_`{|}~]/i) === null){
        generatedPassword();
      }
    }
 } 



document.getElementById('generate').addEventListener("click", () => {
  generatedPassword();
  document.getElementById('password').innerHTML = password; 
  document.getElementById('copy').disabled = false;
});

document.getElementById('copy').addEventListener("click", () => {
  let copyText = document.getElementById("password");
  copyText.select();
  copyText.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert("Copied the text: " + copyText.value);
  });

});