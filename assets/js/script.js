//creating function to generate a random number
var getRandomInt = function(max) {
  return Math.floor(Math.random() * max);
}

//creating array variables to hold all possible versions of the 4 character types
var lowers = "abcdefghijklmnopqrstuvwxyz";
var allLowercase = lowers.split("");
var uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var allUppercase = uppers.split("");
var numbers = "1234567890";
var allNumbers = numbers.split("");
var specials = " !#$%&'()*+,-./:;<=>?@[]^_`{|}~";
var allSpecials = specials.split("");
allSpecials.push('"','\\');

//generating a password function
var password = "";
var generatePassword = function() {
  //prompting the user for password length and storing the value
  var passwordLength = prompt("How many characters is your password? Please choose a length from 8 to 128.");
  //forcing the user to pick a correct length
  while (passwordLength < 8 || passwordLength > 128) {
    passwordLength = prompt("Please choose an appropriate length between 8 and 128.");
  }
  //prompting the user for the types of characters required in the password and making sure at least one is chosen
  var passwordTypes = prompt("What types of characters should be in your password? Your options are lowercase letters, uppercase letters, numbers, and special characters. Please separate your choices with commas.");
  //forcing the user to pick at least one character type
  while (passwordTypes == null) {
    passwordTypes = prompt("Please choose at least one of the following character types: lowercase letters, uppercase letters, numbers, and special characters.");
  }
  //splitting all choices into an array
  passwordTypes = passwordTypes.split(",");
  //using that array to confirm all choices and remove any the user declines to keep
  var length = passwordTypes.length;
  var toSplice = [];
  for (i = 0; i < length; i++) {
    passwordTypes[i] = passwordTypes[i].trim();
    var typeConfirm = confirm("Are you sure you wish to include " + passwordTypes[i] + " in your password?")
    if (typeConfirm !== true) {
      toSplice.unshift(passwordTypes[i]);
    }
  }
  //sorting our finished character type array alphabetically
  passwordTypes.sort();
  //creating an array of indices to splice out of passwordTypes
  if (toSplice.length > 0) {
    //finding the index where each character type to be removed exists in passwordTypes
    for (i = 0; i < toSplice.length; i++) {
      toSplice[i] = passwordTypes.findIndex(checkTypes => checkTypes === toSplice[i]);
    }
    //sorting the index array numerically
    toSplice = toSplice.sort(function(a, b){return a - b});
    toSplice = toSplice.reverse();
    //splicing out all unwanted character types
    for (i = 0; i < toSplice.length; i++) {
      passwordTypes.splice(toSplice[i], 1);
    }
  }
  //determining starting order, using all unique chosen types immediately
  var starter = getRandomInt(passwordTypes.length);
  //re-ordering the passwordTypes according so that our starting character type is first
  if (starter !== 0) {
    passwordTypes.unshift(passwordTypes[starter]);
    passwordTypes.splice(starter+1, 1);
  }
  password = "";
  //randomly generating one of each unique chosen character type at the front of the password
  for (i = 0; i < passwordTypes.length; i++) {
    switch(passwordTypes[i]) {
      case "lowercase letters":
        var character = allLowercase[getRandomInt(allLowercase.length)];
        break;
      case "uppercase letters":
        var character = allUppercase[getRandomInt(allUppercase.length)];
        break;
      case "numbers":
        var character = allNumbers[getRandomInt(allNumbers.length)];
        break;
      case "special characters":
        var character = allSpecials[getRandomInt(allSpecials.length)];
    }
    password = password.concat(character);
  }
  //randomly generating each other character afterwards, without forcing a character type
  for (i = passwordTypes.length; i < passwordLength; i++) {
    var currentType = passwordTypes[getRandomInt(passwordTypes.length)];
    switch(currentType) {
      case "lowercase letters":
        var character = allLowercase[getRandomInt(allLowercase.length)];
        break;
      case "uppercase letters":
        var character = allUppercase[getRandomInt(allUppercase.length)];
        break;
      case "numbers":
        var character = allNumbers[getRandomInt(allNumbers.length)];
        break;
      case "special characters":
        var character = allSpecials[getRandomInt(allSpecials.length)];
    }
    password = password.concat(character);
  }
  //making sure undefined password length does not create an error
  if (passwordTypes.length === 0) {
    password = "User has canceled the password generator.";
  }
  return password;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  generatePassword();
  document.querySelector("#password").textContent = password;

}

//Add event listener to generate button to write password
generateBtn.addEventListener("click", writePassword);