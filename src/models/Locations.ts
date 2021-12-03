import mongoose from 'mongoose';
const { Schema } = mongoose;

export const LocationsSchema = new Schema({
    companyId: mongoose.Types.ObjectId,
    name: String,
    description: String,
    phoneNumber: String,
    email: String,
    address: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    slots: [mongoose.Types.ObjectId]
});