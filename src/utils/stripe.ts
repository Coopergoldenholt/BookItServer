import { CreateCompanyInput } from 'src/typeDef';
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51JUL3xIlu3K2SUYEExyrhZwuvgNRWcurqi6f2KYaNKSd5G8wsw3PKaBJYH8j7VCrYqsGyMeZIYp5yp9CwLUZoQ9w00k4ZuSt4T', {
    apiVersion: '2020-08-27',
    maxNetworkRetries: 3
});

export const createCustomer = async (email: string, name: string, phone: string): Promise<Stripe.Customer> => {
    const params: Stripe.CustomerCreateParams = {
        email,
        name,
        phone
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);

    return customer
};

export const createConnectedAccount = async (company: CreateCompanyInput) => {
    const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US',
        individual: {
            first_name: company.individual.firstName,
            last_name: company.individual.lastName,
            email: company.individual.email,
            address: {
                line1: company.individual.address.street,
                city: company.individual.address.city,
                state: company.individual.address.province,
                postal_code: company.individual.address.postalCode,
                country: company.individual.address.country
            },
            phone: company.individual.phone,
            dob: {
                day: company.individual.dob.day,
                month: company.individual.dob.month,
                year: company.individual.dob.year
            },
            ssn_last_4: company.individual.ssnLast4
        },
        email: company.email,
        business_type: company.businessType,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
        business_profile: {
            mcc: company.businessProfile.mcc,
            product_description: company.businessProfile.productDescription
        },
        external_account: {
            object: 'bank_account',
            country: 'US',
            currency: 'USD',
            routing_number: company.externalAccount.routingNumber,
            account_number: company.externalAccount.accountNumber,
        },
        tos_acceptance: { date: company.tokenAcceptance.date, ip: company.tokenAcceptance.ip }

    });

    return account

}