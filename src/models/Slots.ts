import mongoose from 'mongoose';
const { Schema } = mongoose;

export const SlotsSchema = new Schema({
    availableTime: String,
    price: String,
    name: String,
    traveling: Boolean,
    location: {
        streetName: String,
        city: String,
        state: String,
        zipcode: String
    },
    productId: [String],
    employeeId: mongoose.Types.ObjectId
});