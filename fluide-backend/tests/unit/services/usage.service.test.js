const jwt = require("jsonwebtoken");
const config = require("../../../src/config/config");
const { resolveIdentity } = require("../../../src/services/usage.service");

describe("usage service", () => {
  describe("resolveIdentity", () => {
    test("should use req.user when available", () => {
      const identity = resolveIdentity({
        user: { _id: "user-id-1" },
        headers: {},
      });

      expect(identity).toBe("user:user-id-1");
    });

    test("should use bearer token subject for logged-in user", () => {
      const token = jwt.sign({ sub: "user-id-2" }, config.jwt.secret, {
        expiresIn: "1h",
      });

      const identity = resolveIdentity({
        headers: {
          authorization: ["Bearer", token].join(" "),
          "x-client-id": "device-1",
        },
      });

      expect(identity).toBe("user:user-id-2");
    });

    test("should fall back to device id for invalid bearer token", () => {
      const identity = resolveIdentity({
        headers: {
          authorization: "Bearer invalid-token",
          "x-client-id": "device-2",
        },
      });

      expect(identity).toBe("device:device-2");
    });
  });
});
