import { MyContext } from "../types";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { CreateCompanyInput, FieldError } from "../typeDef";
import { createConnectedAccount } from "../utils/stripe";

@ObjectType()
class Company {
    @Field()
    string: string;
}

@ObjectType()
class CompanyResponse {
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];

    @Field(() => Company, { nullable: true })
    company?: Company

}

@Resolver()
export class CompanyResolver {
    @Mutation(() => CompanyResponse)
    async createCompany(@Arg('company') company: CreateCompanyInput, @Ctx() { req }: MyContext): Promise<CompanyResponse | undefined> {
        let account;
        try {
            account = await createConnectedAccount()
        }
        catch {
            return {
                error: [{ message: 'Could not create company', field: 'company error' }]
            }
        }

        console.log(account)
        return undefined
    }

    @Query(() => CompanyResponse)
    async getCompany(@Ctx() { req }: MyContext): Promise<CompanyResponse | undefined> {
        return undefined
    }
}