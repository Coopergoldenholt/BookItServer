"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.SlotsSchema = new Schema({
    availableTime: String,
    price: String,
    name: String,
    traveling: Boolean,
    location: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    productId: [String],
    employeeId: mongoose_1.default.Types.ObjectId
});
//# sourceMappingURL=Slots.js.map