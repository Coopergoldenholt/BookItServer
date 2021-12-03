import mongoose from 'mongoose';
const { Schema } = mongoose;

const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    verified: Boolean,
    token: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    qrCode: String,
    password: String,
    stripeIds: [{ companyId: String, stripeId: String, monthlyUses: 0 }],
    employee: Boolean
});

export const Users = mongoose.model('user', UsersSchema)