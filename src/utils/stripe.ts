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
            address: { line1: company.individual.address.street, city: 'Vineyard', state: 'Utah', postal_code: '84059', country: 'US' },
            phone: '8016347706',
            dob: {
                day: 1,
                month: 1,
                year: 1901
            },
            ssn_last_4: '0000'
        },
        email: 'jenny.rosen@example.com',
        business_type: 'individual',
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
        },
        business_profile: {
            mcc: '5045',
            product_description: 'We do stuff for out customer'
        },
        external_account: {
            object: 'bank_account',
            country: 'US',
            currency: 'USD',
            routing_number: '110000000',
            account_number: '000999999991',
        },
        tos_acceptance: { date: 1609798905, ip: '8.8.8.8' }

    });

    return account

}