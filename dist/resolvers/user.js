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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const argon2_1 = __importDefault(require("argon2"));
const typeDef_1 = require("../typeDef");
const type_graphql_1 = require("type-graphql");
const stripe_1 = require("../utils/stripe");
let EmailPasswordInput = class EmailPasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], EmailPasswordInput.prototype, "password", void 0);
EmailPasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], EmailPasswordInput);
let UserInput = class UserInput extends EmailPasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserInput.prototype, "phoneNumber", void 0);
UserInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserInput);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [typeDef_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "error", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => typeDef_1.User, { nullable: true }),
    __metadata("design:type", typeDef_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    async findSession({ req }) {
        let user = req.session.user;
        if (!user) {
            return {
                error: [{ field: 'no data', message: 'Could not find a session' }]
            };
        }
        return { user };
    }
    async register(userInput, { req }) {
        const { email, firstName, lastName, password, phoneNumber } = userInput;
        const db = req.app.get('db');
        if (!/^\w + ([\.-] ?\w +)*@\w + ([\.-] ?\w +)* (\.\w{ 2, 3 }) +$ /.test(email)) {
            return {
                error: [{ field: 'email', message: 'Please enter a valid email' }]
            };
        }
        if (password.length <= 2) {
            return {
                error: [{ field: 'password', message: 'Password must be at least 2 characters long' }]
            };
        }
        let user = await db.User.getUserByEmail(email)[0];
        if (user) {
            return {
                error: [{ field: 'Email', message: 'Email is already in use' }]
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        try {
            const customer = await (0, stripe_1.createCustomer)(email, `${firstName} ${lastName}`, phoneNumber);
            user = await db.User.insertUser([firstName, lastName, phoneNumber, email, hashedPassword, customer.id])[0];
        }
        catch (err) {
            if (err.code === '23505') {
                return {
                    error: [{ field: 'email', message: 'Email already in use' }]
                };
            }
        }
        req.session.user = {
            userId: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            phoneNumber: user.phone_number,
            email: user.email,
            addressId: user.address_id,
            stripeId: user.stripe_id,
            verified: user.verified,
            isEmployee: user.employee
        };
        return { user };
    }
    async login(userInput, { req }) {
        const { email, password } = userInput;
        const db = req.app.get('db');
        const user = await db.User.getUserByEmail(email)[0];
        if (!user) {
            return {
                error: [{ field: 'email or password', message: 'Email or Password is incorrect' }]
            };
        }
        const valid = await argon2_1.default.verify(user.password, password);
        if (!valid) {
            return {
                error: [{ field: 'email or password', message: 'Email or Password is incorrect' }]
            };
        }
        req.session.user = {
            userId: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            phoneNumber: user.phone_number,
            email: user.email,
            addressId: user.address_id,
            stripeId: user.stripe_id,
            verified: user.verified,
            isEmployee: user.employee
        };
        return { user };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => UserResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findSession", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('user')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('userInput')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmailPasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map