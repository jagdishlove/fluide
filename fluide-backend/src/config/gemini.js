const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("../config/config");

// Initialize the Google Generative AI with your API Key
// Ensure your config file has a 'googleApiKey' property
const genAI = new GoogleGenerativeAI(config.googleApiKey);

// Export the genAI instance to be used across your modules
module.exports = genAI;
