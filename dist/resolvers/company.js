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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyResolver = void 0;
const type_graphql_1 = require("type-graphql");
const typeDef_1 = require("../typeDef");
const stripe_1 = require("../utils/stripe");
let Company = class Company {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Company.prototype, "string", void 0);
Company = __decorate([
    (0, type_graphql_1.ObjectType)()
], Company);
let CompanyResponse = class CompanyResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [typeDef_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], CompanyResponse.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Company, { nullable: true }),
    __metadata("design:type", Company)
], CompanyResponse.prototype, "company", void 0);
CompanyResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CompanyResponse);
let CompanyResolver = class CompanyResolver {
    async createCompany(company, { req }) {
        let account;
        try {
            account = await (0, stripe_1.createConnectedAccount)();
        }
        catch (_a) {
            return {
                error: [{ message: 'Could not create company', field: 'company error' }]
            };
        }
        console.log(account);
        return undefined;
    }
    async getCompany({ req }) {
        return undefined;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => CompanyResponse),
    __param(0, (0, type_graphql_1.Arg)('company')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeDef_1.CreateCompanyInput, Object]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "createCompany", null);
__decorate([
    (0, type_graphql_1.Query)(() => CompanyResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyResolver.prototype, "getCompany", null);
CompanyResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CompanyResolver);
exports.CompanyResolver = CompanyResolver;
//# sourceMappingURL=company.js.map