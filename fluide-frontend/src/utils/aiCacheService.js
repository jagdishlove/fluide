const STORAGE_KEY = "fluide_ai_generated_cache_v1";
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const KEY_FIELDS = [
  "topic",
  "module",
  "lesson",
  "chapter",
  "level",
  "language",
  "question",
];

const normalize = (value) => String(value ?? "").trim().toLowerCase();

export const hashText = (value = "") => {
  let hash = 5381;
  const text = String(value);
  for (let i = 0; i < text.length; i++) {
    hash = ((hash * 33) ^ text.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
};

const readStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
};

const writeStore = (store) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch (error) {
    if (error && (error.name === "QuotaExceededError" || error.code === 22)) {
      const keys = Object.keys(store);
      keys.sort((a, b) => (store[a].createdAt || 0) - (store[b].createdAt || 0));
      keys
        .slice(0, Math.max(1, Math.floor(keys.length * 0.25)))
        .forEach((key) => delete store[key]);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
        return true;
      } catch (innerError) {
        return false;
      }
    }
    return false;
  }
};

const buildKey = (type, ctx = {}) => {
  const parts = [type];
  KEY_FIELDS.forEach((field) => {
    const value = ctx[field];
    if (value !== undefined && value !== null && value !== "") {
      parts.push(normalize(value));
    }
  });
  return parts.join("|");
};

export const getCached = (type, ctx = {}) => {
  const store = readStore();
  const key = buildKey(type, ctx);
  const entry = store[key];
  if (!entry) return null;
  if (entry.createdAt && Date.now() - entry.createdAt > MAX_AGE_MS) {
    delete store[key];
    writeStore(store);
    return null;
  }
  return entry.value;
};

export const setCached = (type, ctx = {}, value) => {
  if (value === undefined || value === null) return;
  const store = readStore();
  store[buildKey(type, ctx)] = {
    value,
    topic: normalize(ctx.topic),
    module: normalize(ctx.module),
    createdAt: Date.now(),
  };
  writeStore(store);
};

export const purgeCache = (match = {}) => {
  const store = readStore();
  let changed = false;
  Object.keys(store).forEach((key) => {
    const entry = store[key];
    if (!entry) {
      delete store[key];
      changed = true;
      return;
    }
    if (
      match.topic != null &&
      match.topic !== "" &&
      normalize(entry.topic) !== normalize(match.topic)
    ) {
      delete store[key];
      changed = true;
      return;
    }
    if (
      match.module != null &&
      match.module !== "" &&
      normalize(entry.module) !== normalize(match.module)
    ) {
      delete store[key];
      changed = true;
    }
  });
  if (changed) writeStore(store);
};
