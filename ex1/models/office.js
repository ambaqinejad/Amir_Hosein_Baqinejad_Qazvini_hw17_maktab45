const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const path = require('path');
const employeeSchema = require(path.join(__dirname, 'employee.js'));

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

OfficeSchema.post('findOneAndDelete', function() {
    const officeId = this._conditions._id;
    employeeSchema.deleteMany({ officeId }, (err, employees) => {
        if (err) {
            return console.log(err.message);
        }
        return console.log(employees);
    })
})

module.exports = mongoose.model('Office', OfficeSchema);