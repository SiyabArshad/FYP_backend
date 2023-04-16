const jwt = require('jsonwebtoken');

// Function to generate a JWT token
function generateToken(data, duration="30d") {
  // Define the token payload
  const payload = {
    data: data
  };

  // Generate the token with the payload and a secret key
  const token = jwt.sign(payload, process.env.SECKEY, { expiresIn: duration });

  // Return the token
  return token;
}

module.exports={generateToken}