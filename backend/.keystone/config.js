var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_config = require("dotenv/config");
var import_core2 = require("@keystone-6/core");

// schemas/User.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: {
    operation: {
      ...(0, import_access.allOperations)(import_access.allowAll)
    }
  },
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({ isIndexed: "unique", validation: { isRequired: true } }),
    password: (0, import_fields.password)()
  }
});
var User_default = User;

// keystone.ts
var databaseURL = process.env.DATABASE_URL || "file:./keystone.db";
var sessionConfig = {
  maxAtge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET || "This secret should only be used in testing"
};
var keystone_default = (0, import_core2.config)(
  {
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true
      }
    },
    db: {
      provider: "sqlite",
      url: databaseURL
    },
    lists: {
      User: User_default
    },
    ui: {
      isAccessAllowed: () => true
    }
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
