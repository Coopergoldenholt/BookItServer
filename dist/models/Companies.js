"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompaniesSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.CompaniesSchema = new Schema({
    name: String,
    description: String,
    stripeId: String,
    email: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    qrCode: String,
    employees: [{
            employeeId: mongoose_1.default.Types.ObjectId,
            employeePermissions: [{ locationId: mongoose_1.default.Types.ObjectId, permissions: [String] }]
        }],
    adminId: mongoose_1.default.Types.ObjectId,
});
//# sourceMappingURL=Companies.js.map