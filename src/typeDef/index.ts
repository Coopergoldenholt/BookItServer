import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Address {
    @Field()
    street: string;

    @Field()
    postalCode: string;

    @Field()
    city: string;

    @Field()
    province: string;

    @Field()
    country: string;
}

@ObjectType()
export class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
export class User {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phoneNumber: string;

    @Field()
    email: string;

    @Field()
    stripeId: string;

    @Field()
    verified: boolean;

    @Field()
    employee: boolean;

    @Field()
    address: Address;
}

@InputType()
export class AddressInput {
    @Field()
    street: string;

    @Field()
    city: string;

    @Field()
    province: string;

    @Field()
    postalCode: string;

    @Field()
    country: string;

}

@InputType()
class StripeDOB {
    @Field()
    day: number;
    @Field()
    month: number;
    @Field()
    year: number;
}

@InputType()
export class IndividualInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    address: AddressInput;

    @Field()
    phone: string;

    @Field()
    dob: StripeDOB;

    @Field()
    ssnLast4: string;
}

@InputType()
class StripeBusinessProfile {
    @Field()
    mcc: string;

    @Field()
    productDescription: string;
}

@InputType()
class StripeCardInfo {
    @Field()
    routingNumber: string;

    @Field()
    accountNumber: string;
}

@InputType()
class StripeAcceptance {
    @Field()
    date: number;

    @Field()
    ip: string;
}

@InputType()
export class CreateCompanyInput {
    @Field()
    individual!: IndividualInput;

    @Field()
    email: string;

    @Field()
    businessType: 'individual';

    @Field()
    businessProfile: StripeBusinessProfile

    @Field()
    externalAccount: StripeCardInfo;

    @Field()
    tokenAcceptance: StripeAcceptance;
}