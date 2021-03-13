const path = require('path');

const Office = require(path.join(path.dirname(__dirname), 'models', 'office.js'));

const getAll = (req, res, next) => {
    Office.find({}, (err, offices) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(offices)
    });
}

const getOne = (req, res, next) => {
    Office.findById({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(employee);
    });
}

const create = (req, res, next) => {
    const newOffice = new Office({
        name: req.body.name,
        registryNumber: req.body.registryNumber,
        city: req.body.city,
        province: req.body.province,
        registryDate: req.body.registryDate,
        number: req.body.number
    })

    newOffice.save((err, office) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(office);
    })
}

const remove = (req, res, next) => {
    Office.findOneAndDelete({ _id: req.body.id }, (err, office) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(office);
    })
}

const update = (req, res, next) => {
    Office.findOneAndUpdate({ _id: req.body.id }, req.body, (err, office) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(office);
    })
}


const getOfficeWithSpecificAge = (req, res, next) => {
    let age = +req.body.age;
    let date = new Date();
    date.setFullYear(date.getFullYear() - age);
    Office.find({ registryDate: { $gte: date.toISOString() } }, { name: 1 }, (err, offices) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(offices);
    })
}



module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update,
    getOfficeWithSpecificAge
}