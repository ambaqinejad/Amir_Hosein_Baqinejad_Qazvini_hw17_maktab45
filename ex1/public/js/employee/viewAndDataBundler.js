!$(document).ready(function() {
    getEmployees(employeesDataAreReady)
});

const employeesDataAreReady = (employees, officeId) => {
    putEmployeesInPage(employees, officeId)
}