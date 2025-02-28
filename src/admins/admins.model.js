import { Schema, model } from 'mongoose';

const AdminSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username of the admin is required"],
    },
    profilePicture: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email of the admin is required"],
    },
    password: {
        type: String,
        required: [true, "Password of the admin is required"],
    },
    role: {
        type: String,
        required: true,
        default: "ADMIN_ROLE",
    },
}, {
    versionKey: false,
    timestamps: true,
});

AdminSchema.methods.toJSON = function () {
    const { __v, password, ...admin } = this.toObject();
    admin.uid = _id
    return admin;

}

export default model('Admin', AdminSchema);