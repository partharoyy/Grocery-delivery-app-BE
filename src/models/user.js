import mongoose from "mongoose";

// Base User Schema
const userSchema = new mongoose.Schema({
    name: {type: String},
    role: {
        type: String,
        enum: ['Customer', 'Admin', 'DeliveryPartner'],
        required: true
    },
    isActivated: {type: Boolean, default: false}
})

// Customer Schema
const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: {type: Number, required: true, unique: true},
    role: {type: String, enum: ['Customer'], default: 'Customer'},
    liveLocation: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
    address: {type: String}
})

// Delivery Partner Schema
const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    role: {type: String, enum: ['DeliveryPartner'], default: 'DeliveryPartner'},
    liveLocation: {
        latitude: {type: Number},
        longitude: {type: Number}
    },
    address: {type: String},
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch'
    }
})

// Admin Schema
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true, unique: true},
    role: {type: String, enum: ['Admin'], default: 'Admin'}
})

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema)
const DeliveryPartner = mongoose.models.DeliveryPartner || mongoose.model('DeliveryPartner', deliveryPartnerSchema)
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema)

export {Customer, DeliveryPartner, Admin}