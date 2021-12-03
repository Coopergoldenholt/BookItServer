"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyInput = exports.IndividualInput = exports.AddressInput = exports.User = exports.FieldError = exports.Address = void 0;
const type_graphql_1 = require("type-graphql");
let Address = class Address {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Address.prototype, "province", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
Address = __decorate([
    (0, type_graphql_1.ObjectType)()
], Address);
exports.Address = Address;
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
exports.FieldError = FieldError;
let User = class User {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "stripeId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], User.prototype, "employee", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Address)
], User.prototype, "address", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)()
], User);
exports.User = User;
let AddressInput = class AddressInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddressInput.prototype, "street", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddressInput.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddressInput.prototype, "province", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddressInput.prototype, "postalCode", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AddressInput.prototype, "country", void 0);
AddressInput = __decorate([
    (0, type_graphql_1.InputType)()
], AddressInput);
exports.AddressInput = AddressInput;
let StripeDOB = class StripeDOB {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StripeDOB.prototype, "day", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StripeDOB.prototype, "month", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StripeDOB.prototype, "year", void 0);
StripeDOB = __decorate([
    (0, type_graphql_1.InputType)()
], StripeDOB);
let IndividualInput = class IndividualInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IndividualInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IndividualInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IndividualInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", AddressInput)
], IndividualInput.prototype, "address", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IndividualInput.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", StripeDOB)
], IndividualInput.prototype, "dob", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IndividualInput.prototype, "ssnLast4", void 0);
IndividualInput = __decorate([
    (0, type_graphql_1.InputType)()
], IndividualInput);
exports.IndividualInput = IndividualInput;
let StripeBusinessProfile = class StripeBusinessProfile {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StripeBusinessProfile.prototype, "mcc", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StripeBusinessProfile.prototype, "productDescription", void 0);
StripeBusinessProfile = __decorate([
    (0, type_graphql_1.InputType)()
], StripeBusinessProfile);
let StripeCardInfo = class StripeCardInfo {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StripeCardInfo.prototype, "routingNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StripeCardInfo.prototype, "accountNumber", void 0);
StripeCardInfo = __decorate([
    (0, type_graphql_1.InputType)()
], StripeCardInfo);
let StripeAcceptance = class StripeAcceptance {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], StripeAcceptance.prototype, "date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], StripeAcceptance.prototype, "ip", void 0);
StripeAcceptance = __decorate([
    (0, type_graphql_1.InputType)()
], StripeAcceptance);
let CreateCompanyInput = class CreateCompanyInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", IndividualInput)
], CreateCompanyInput.prototype, "individual", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCompanyInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateCompanyInput.prototype, "businessType", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", StripeBusinessProfile)
], CreateCompanyInput.prototype, "businessProfile", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", StripeCardInfo)
], CreateCompanyInput.prototype, "externalAccount", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", StripeAcceptance)
], CreateCompanyInput.prototype, "tokenAcceptance", void 0);
CreateCompanyInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateCompanyInput);
exports.CreateCompanyInput = CreateCompanyInput;
//# sourceMappingURL=index.js.map