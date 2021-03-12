const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 40,
        unique: true,
        dropDups: true
    },
    registryNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
        unique: true,
        dropDups: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 10
    },
    province: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 20
    },
    registryDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    number: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    }
});

module.exports = mongoose.model('Office', OfficeSchema);