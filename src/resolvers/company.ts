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
        const db = req.app.get('db')
        let account;
        let createdCompany
        try {
            account = await createConnectedAccount(company)
            const address = await db.insertAddress([
                company.companyAddress.street,
                company.companyAddress.postalCode,
                company.companyAddress.city,
                company.companyAddress.province,
                company.companyAddress.country
            ])

            createdCompany = await db.insertCompany([
                company.companyName,
                address.address_id,
                company.businessProfile.productDescription,
                account.id,
                1
            ])
        }
        catch {
            return {
                error: [{ message: 'Could not create company', field: 'company error' }]
            }
        }

        return createdCompany
    }

    @Query(() => CompanyResponse)
    async getCompany(@Ctx() { req }: MyContext): Promise<CompanyResponse | undefined> {
        return undefined
    }
}