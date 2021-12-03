import argon2 from "argon2";
import { FieldError, User } from "../typeDef";
import { Resolver, Query, ObjectType, Field, Mutation, Arg, InputType, Ctx } from "type-graphql";
import { MyContext } from "../types";
import { createCustomer } from "../utils/stripe";

@InputType()
class EmailPasswordInput {
    @Field()
    email!: string;

    @Field()
    password!: string;
}

@InputType()
class UserInput extends EmailPasswordInput {
    @Field()
    firstName!: string;

    @Field()
    lastName!: string;

    @Field()
    phoneNumber!: string;

}


@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    error?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;

}

@Resolver()
export class UserResolver {
    @Query(() => UserResponse)
    async findSession(@Ctx() { req }: MyContext): Promise<UserResponse | undefined> {
        let user = req.session.user

        if (!user) {
            return {
                error: [{ field: 'no data', message: 'Could not find a session' }]
            }
        }
        return { user }
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('user') userInput: UserInput, @Ctx() { req }: MyContext): Promise<UserResponse | undefined> {
        const { email, firstName, lastName, password, phoneNumber } = userInput
        const db = req.app.get('db')
        if (!/^\w + ([\.-] ?\w +)*@\w + ([\.-] ?\w +)* (\.\w{ 2, 3 }) +$ /.test(email)) {
            return {
                error: [{ field: 'email', message: 'Please enter a valid email' }]
            }
        }
        if (password.length <= 2) {
            return {
                error: [{ field: 'password', message: 'Password must be at least 2 characters long' }]
            }
        }

        let user = await db.User.getUserByEmail(email)[0]

        if (user) {
            return {
                error: [{ field: 'Email', message: 'Email is already in use' }]
            }
        }

        const hashedPassword = await argon2.hash(password)

        try {
            const customer = await createCustomer(email, `${firstName} ${lastName}`, phoneNumber)
            user = await db.User.insertUser([firstName, lastName, phoneNumber, email, hashedPassword, customer.id])[0]
        } catch (err) {
            if (err.code === '23505') {
                return {
                    error: [{ field: 'email', message: 'Email already in use' }]
                }
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
        }

        return { user }
    }

    @Mutation(() => UserResponse)
    async login(@Arg('userInput') userInput: EmailPasswordInput, @Ctx() { req }: any): Promise<UserResponse> {
        const { email, password } = userInput

        const db = req.app.get('db')

        const user = await db.User.getUserByEmail(email)[0]

        if (!user) {
            return {
                error: [{ field: 'email or password', message: 'Email or Password is incorrect' }]
            }
        }

        const valid = await argon2.verify(user.password, password)

        if (!valid) {
            return {
                error: [{ field: 'email or password', message: 'Email or Password is incorrect' }]
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
        }

        return { user }
    }
}
