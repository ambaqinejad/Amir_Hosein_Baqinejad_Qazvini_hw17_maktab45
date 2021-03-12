const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    nationalId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        dropDups: true,
        minlength: 1,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
        default: 'male'
    },
    isManager: {
        type: Boolean,
        required: true,
        default: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    officeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Office'
    }
});

module.exports = mongoose.model('Employee', employeeSchema);