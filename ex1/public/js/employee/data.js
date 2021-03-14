const GET_ALL_EMPLOYEES_URL = 'http://localhost:3000/employee/getEmployeeByOfficeId';

const getEmployees = (employeesDataAreReadyCB) => {
    let officeId = window.location.href.split('/');
    officeId = officeId[officeId.length - 1]
    console.log(officeId);
    $.post(GET_ALL_EMPLOYEES_URL, { officeId },
        function(employees, textStatus, jqXHR) {
            console.log(employees);
            employeesDataAreReadyCB(employees, officeId)
        }
    );
}