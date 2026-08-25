const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const { GenerationUsage } = require("../models");

const getDailyKey = (identity) => {
  const date = new Date().toISOString().slice(0, 10);
  return `daily:${date}:${identity}`;
};

const resolveIdentity = (req) => {
  if (req.user && req.user._id) {
    return `user:${req.user._id}`;
  }
  const authHeader = req.headers?.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length).trim();
    if (token) {
      try {
        const payload = jwt.verify(token, config.jwt.secret);
        if (payload?.sub) {
          return `user:${payload.sub}`;
        }
      } catch (error) {
        // fall through to device identity when auth token is invalid/expired
      }
    }
  }
  if (req.headers?.["x-client-id"]) {
    return `device:${req.headers["x-client-id"]}`;
  }
  return null;
};

const getUsage = async (identity) => {
  const limit = config.generationLimit;
  if (!identity) {
    return { count: 0, limit, remaining: limit };
  }
  const usage = await GenerationUsage.findOne({ key: getDailyKey(identity) });
  const count = usage ? usage.count : 0;
  return { count, limit, remaining: Math.max(0, limit - count) };
};

const checkAndIncrement = async (identity) => {
  const limit = config.generationLimit;
  if (!identity) {
    return { count: 0, limit, remaining: limit };
  }
  const key = getDailyKey(identity);
  const current = await GenerationUsage.findOne({ key });
  const count = current ? current.count : 0;
  if (count >= limit) {
    throw new ApiError(
      httpStatus.TOO_MANY_REQUESTS,
      "You have exceeded the maximum number of generation attempts."
    );
  }
  await GenerationUsage.updateOne(
    { key },
    { $inc: { count: 1 }, $setOnInsert: { lastGeneratedAt: new Date() } },
    { upsert: true, setDefaultsOnInsert: true }
  );
  const newCount = count + 1;
  return { count: newCount, limit, remaining: Math.max(0, limit - newCount) };
};

module.exports = {
  getDailyKey,
  resolveIdentity,
  getUsage,
  checkAndIncrement,
};
