const path = require('path');

const Employee = require(path.join(path.dirname(__dirname), 'models', 'employee.js'));
const Office = require(path.join(path.dirname(__dirname), 'models', 'office.js'))

const getAll = (req, res, next) => {
    Employee.find({}, { __v: false }, (err, employees) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(employees)
    });
}

const getOne = (req, res, next) => {
    Employee.findById({ _id: req.params.id }, (err, employee) => {
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
    Office.findById({ _id: req.body.officeId }, (err, office) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        } else if (!office) {
            return res.status(404).json({
                message: `Office with this id doesn't exist`
            })
        }

        if (req.body.isManager) {
            Employee.find({ isManager: true, officeId: req.body.officeId }, (err, employee) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Server Error',
                        error: err.message
                    })
                } else if (employee) {
                    return res.status(404).json({
                        message: `This office already has manager`
                    })
                } else {
                    return createEmployeeDocument(req, res, office)
                }
            })
        } else {
            return createEmployeeDocument(req, res, office)
        }
    });
}

const createEmployeeDocument = (req, res, office) => {
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationalId: req.body.nationalId,
        gender: req.body.gender,
        isManager: req.body.isManager,
        birthDate: req.body.birthDate,
        officeId: office._id
    })

    newEmployee.save((err, employee) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(employee);
    })
}

const getManagers = (req, res, next) => {
    Employee.find({ isManager: true }, { __v: 0 }).populate('officeId', { name: 1, _id: 0 }).exec((err, employees) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(employees);
    })
}

const getEmployeeByOfficeName = (req, res, next) => {
    let specificEmployees = [];
    Employee.find({}, { __v: false }).populate('officeId', { name: 1, _id: 0 }).exec((err, employees) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        for (const employee of employees) {
            employee.officeId.name === req.body.officeName ? specificEmployees.push(employee) : ''
        }
        return res.status(200).json(specificEmployees);
    })
}

const getOfficeManager = (req, res, next) => {
    let specificEmployees = [];
    Employee.find({ isManager: true }, { firstName: 1, lastName: 1, _id: 0 })
        .populate('officeId', { name: 1, _id: 0 }).exec((err, employees) => {
            if (err) {
                return res.status(500).json({
                    message: 'Server Error',
                    error: err.message
                })
            }
            for (const employee of employees) {
                employee.officeId.name === req.body.officeName ? specificEmployees.push(employee) : ''
            }
            return res.status(200).json(specificEmployees);
        })
}

const getEmployeeBetweenTwoAges = (req, res, next) => {
    let greaterThanDate = new Date();
    let lessThanDate = new Date();
    let greaterThan = +req.body.greaterThan;
    let lessThan = +req.body.lessThan;
    greaterThanDate.setFullYear(greaterThanDate.getFullYear() - lessThan);
    lessThanDate.setFullYear(lessThanDate.getFullYear() - greaterThan);

    Employee.find({ birthDate: { $gte: greaterThanDate, $lte: lessThanDate } }, { _id: 0 }, (err, employees) => {
        if (err) {
            return res.status(500).json({
                message: 'Server Error',
                error: err.message
            })
        }
        return res.status(200).json(employees);
    })
}

module.exports = {
    getAll,
    getOne,
    create,
    getManagers,
    getEmployeeByOfficeName,
    getOfficeManager,
    getEmployeeBetweenTwoAges
}