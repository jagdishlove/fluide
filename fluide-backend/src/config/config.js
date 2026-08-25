const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

const envType =
  process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: path.join(__dirname, `../../${envType}`) });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number(),
    GOOGLE_API_KEY: Joi.string(),
    CLIENT_ID: Joi.string().description("Google OAuth client id"),
    CLIENT_SECRET: Joi.string().description("Google OAuth client secret"),
    SESSION_SECRET: Joi.string().description(
      "Secret used to sign session cookies",
    ),
    MONGODB_URL: Joi.string().description("Mongo DB url"),
    JWT_SECRET: Joi.string().description("JWT secret key"),
    API_URL: Joi.string().description("Backend API URL").when("NODE_ENV", {
      is: "production",
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    CLIENT_URL: Joi.string().description("Frontend app URL").when("NODE_ENV", {
      is: "production",
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(180)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    SMTP_HOST: Joi.string().description("server that will send the emails"),
    SMTP_PORT: Joi.number().description("port to connect to the email server"),
    SMTP_USERNAME: Joi.string().description("username for email server"),
    SMTP_PASSWORD: Joi.string().description("password for email server"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app",
    ),
    GENERATION_LIMIT: Joi.number()
      .default(3)
      .description("Daily AI generation limit per user or device"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const normalizeUrl = (url) => (url ? url.replace(/\/+$/, "") : undefined);

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT || 8080,
  googleApiKey: envVars.GOOGLE_API_KEY,
  google: {
    clientID: envVars.CLIENT_ID,
    clientSecret: envVars.CLIENT_SECRET,
  },
  sessionSecret: envVars.SESSION_SECRET || "cyberwolve",
  openaiKey: envVars.OPENAI_KEY,
  generationLimit: envVars.GENERATION_LIMIT,
  apiUrl: normalizeUrl(envVars.API_URL) || `http://localhost:${envVars.PORT || 8080}`,
  clientUrl: normalizeUrl(envVars.CLIENT_URL) || "http://localhost:3001",
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
