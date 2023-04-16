const bcrypt = require('bcrypt');

// Function to encrypt a text using bcrypt
async function encryptText(text) {
  // Generate a salt with 10 rounds
  const salt = await bcrypt.genSalt(10);

  // Hash the text with the generated salt
  const encryptedText = await bcrypt.hash(text, salt);

  // Return the encrypted text
  return encryptedText;
}

// Function to decrypt a text using bcrypt
async function compareText(text, encryptedText) {
  // Compare the plain text with the encrypted text using bcrypt
  const isMatch = await bcrypt.compare(text, encryptedText);

  // Return true if the text matches the encrypted text, false otherwise
  return isMatch;
}

module.exports={encryptText,compareText}