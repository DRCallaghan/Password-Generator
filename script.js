//creating function to generate a random number
var getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}
//creating an array variable to store the different character types
var allTypes = ["lowercase letters", "uppercase letters", "numbers", "special characters"];
//creating array variables to hold all possible versions of the above character types
var lowers = "abcdefghijklmnopqrstuvwxyz";
var allLowercase = lowers.split("");
console.log(allLowercase);
var uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var allUppercase = uppers.split("");
console.log(allUppercase);
var numbers = "1234567890";
var allNumbers = numbers.split("");
console.log(allNumbers);
var specials = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";
var allSpecials = specials.split("");
allSpecials.push('"','\\');
console.log(allSpecials);


//generating a password function
var password = "You have not selected any data types, so no password was generated.";
var generatePassword = function() {
  //prompting the user for password length and storing the value
  var passwordLength = prompt("How many characters is your password? Please choose a length from 8 to 128.");
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("Please choose an appropriate length between 8 and 128.");
  }
  //prompting the user for the types of characters required in the password
  var passwordTypes = prompt("What types of characters should be in your password? Your options are lowercase letters, uppercase letters, numbers, and special characters. Please separate your choices with commas.");
  console.log(passwordTypes);
  //splitting and trimming all the choices for password types
  while (passwordTypes == null) {
    passwordTypes = prompt("Please choose at least one of the following character types: lowercase letters, uppercase letters, numbers, and special characters.");
  }
  passwordTypes = passwordTypes.split(",");
  for (i = 0; i < passwordTypes.length; i++) {
    passwordTypes[i] = passwordTypes[i].trim();
    var typeConfirm = confirm("Are you sure you wish to include " + passwordTypes[i] + " in your password?")
    if (typeConfirm !== true) {
      passwordTypes.splice(i, 1);
    }
  }
  console.log(passwordTypes);
  //determining starting order, using all unique chosen types immediately
  var starter = getRandomInt(passwordTypes.length);
  if (starter !== 0) {
    passwordTypes.unshift(passwordTypes[starter]);
    passwordTypes.splice(starter+1, 1);
  }
  password = [];
  for (i = 0; i < passwordTypes.length; i++) {
    switch(passwordTypes[i]) {
      case "lowercase letters":

    }
  }
  //randomly choose each other character afterwards
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  generatePassword();
  document.querySelector("#password").textContent = password;

}

//Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
