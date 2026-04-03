const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require("./src/config/config");

async function listAvailableModels() {
  try {
    if (!config.googleApiKey) {
      console.error("❌ Error: GOOGLE_API_KEY is not set in your .env file");
      process.exit(1);
    }

    const genAI = new GoogleGenerativeAI(config.googleApiKey);

    console.log("🔄 Fetching available models...\n");

    const models = await genAI.listModels();

    console.log("✅ Available Models:\n");
    console.log("═".repeat(80));

    models.forEach((model) => {
      console.log(`\n📱 Model: ${model.name}`);
      console.log(`   Display Name: ${model.displayName}`);
      console.log(`   Description: ${model.description}`);
      console.log(`   Input Token Limit: ${model.inputTokenLimit}`);
      console.log(`   Output Token Limit: ${model.outputTokenLimit}`);
      console.log(`   Supported Methods:`);

      if (
        model.supportedGenerationMethods &&
        model.supportedGenerationMethods.length > 0
      ) {
        model.supportedGenerationMethods.forEach((method) => {
          console.log(`     - ${method}`);
        });
      } else {
        console.log(`     - (none listed)`);
      }

      console.log("─".repeat(80));
    });

    console.log(
      "\n💡 Tip: Use the model name (e.g., 'gemini-pro', 'gemini-1.5-flash') in your code"
    );
  } catch (error) {
    console.error("❌ Error fetching models:", error.message);
    console.error("\nPossible fixes:");
    console.error(
      "1. Make sure GOOGLE_API_KEY is set correctly in your .env file"
    );
    console.error(
      "2. Enable 'Generative Language API' in Google Cloud Console"
    );
    console.error("3. Make sure your API key has access to this API");
    process.exit(1);
  }
}

listAvailableModels();
