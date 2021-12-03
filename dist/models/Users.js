"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    verified: Boolean,
    token: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    qrCode: String,
    password: String,
    stripeIds: [{ companyId: String, stripeId: String, monthlyUses: 0 }],
    employee: Boolean
});
exports.Users = mongoose_1.default.model('user', UsersSchema);
//# sourceMappingURL=Users.js.map