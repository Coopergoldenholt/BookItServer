import mongoose from 'mongoose';
const { Schema } = mongoose;

export const CompaniesSchema = new Schema({
    name: String,
    description: String,
    stripeId: String,
    email: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    qrCode: String,
    employees: [{
        employeeId: mongoose.Types.ObjectId,
        employeePermissions: [{ locationId: mongoose.Types.ObjectId, permissions: [String] }]
    }],
    adminId: mongoose.Types.ObjectId,
});