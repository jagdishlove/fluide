const normalizeUrl = (url) => (url ? url.replace(/\/+$/, "") : undefined);

const serverAddress = normalizeUrl(process.env.REACT_APP_API_URL);
const websocketUrl = normalizeUrl(
  process.env.REACT_APP_WS_URL ||
    (serverAddress ? serverAddress.replace(/^http/, "ws") : undefined),
);

if (!serverAddress) {
  console.warn(
    "[config] REACT_APP_API_URL is not set. API requests will fail. Set it in .env.development / .env.production or Vercel project settings."
  );
}
if (!websocketUrl) {
  console.warn(
    "[config] REACT_APP_WS_URL is not set and could not be derived from REACT_APP_API_URL. Streaming (description/examples/ask-question) will fail."
  );
}

export { serverAddress, websocketUrl };
