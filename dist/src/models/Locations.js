"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
exports.LocationsSchema = new Schema({
    companyId: mongoose_1.default.Types.ObjectId,
    name: String,
    description: String,
    phoneNumber: String,
    email: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    slots: [mongoose_1.default.Types.ObjectId]
});
//# sourceMappingURL=Locations.js.map