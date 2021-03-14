let office_id = ''

function putEmployeesInPage(employees, officeId) {
    office_id = officeId;
    console.log(office_id);
    $('#create').click(createClick)
    let pageContent = '';
    employees.forEach(employee => {
        pageContent += `
            <div class="col-sm-12 col-md-6 col-lg-4 p-3">
                <div class="card p-3">
                    <div class="card-body">
                        <h5 class="card-title text-center p-2">${employee.firstName}</h5>
                        <h5 class="card-title text-center p-2">${employee.lastName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted text-center p-2">شماره ملی: ${employee.nationalId}</h6>
                        <p class="card-text text-center p-2">${employee.birthDate.substring(0, 10)}</p>
                        <p class="card-text text-center p-2">${employee.gender}</p>
                        <p class="card-text text-center p-2">Is manager? ${employee.isManager}</p>
                        <p class="card-text text-center p-2">${employee.officeId.name}</p>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-dark m-1 updateBtn" data-bs-toggle="modal" data-bs-target="#my_modal" id="${employee._id}">بروزرسانی</button>
                            <button type="button" class="btn btn-danger m-1 deleteBtn" id="${employee._id}">حذف</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        $('#offices-content-row').html(pageContent);
        $('.updateBtn').click(updateBtnClick);
        $('.deleteBtn').click(deleteBtnClick);
    })
}

function deleteBtnClick() {
    let ok = confirm("Are you sure?");
    const id = this.id;
    if (ok) {
        $.ajax({
            type: "delete",
            url: 'http://localhost:3000/employee/delete',
            data: { id },
            success: function(response) {
                console.log(response);
                window.location.assign(`/${office_id}`)
            }
        });
    }
}

function updateBtnClick() {
    setModalHeader('Update');
    let modalBodyContent = "";
    let id = this.id;
    $.get(`http://localhost:3000/employee/${id}`,
        function(employee, textStatus, jqXHR) {
            let employeeId = employee._id
            delete employee['_id'];
            delete employee['__v'];
            for (const [key, value] of Object.entries(employee)) {
                modalBodyContent += `
                    <div class="row p-1">
                        <div class="col-sm-5">
                            <label class="p-2" for="${key}">${key}:</label>
                        </div>
                        <div class="col-sm-7">
                            <input class="p-2" type="text" value="${key === "birthDate" ? value.substring(0, 10) : value}" id="${key}" placeholder="${key}">
                        </div>
                    </div>`
            }
            modalBodyContent += `
                    <p id="error-message" class="row p-1 error display-none">
        
                    </p>`
            $('#modal-body').html(modalBodyContent);
            let modalFooterContent = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="commit-btn" class="btn btn-dark">Commit</button>
            `
            $('#modal-footer').html(modalFooterContent);
            $('#commit-btn').click(commitUpdate.bind(null, employee, id, employeeId));
        }
    );

}

function commitUpdate(employee, id, employeeId) {
    let commitData = {
        id: employeeId,
        firstName: $('#firstName').val() ? $('#firstName').val() : employee.firstName,
        lastName: $('#lastName').val() ? $('#lastName').val() : employee.lastName,
        gender: $('#gender').val() ? $('#gender').val() : employee.gender,
        isManager: $('#isManager').val() ? $('#isManager').val() : employee.isManager,
        nationalId: $('#nationalId').val() ? $('#nationalId').val() : employee.nationalId,
        birthDate: $('#birthDate').val() ? $('#birthDate').val() : employee.birthDate,
        officeId: $('#officeId').val() ? $('#officeId').val() : employee.officeId
    }
    console.log(commitData);
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/employee/update",
        data: commitData,
        success: function(info) {
            window.location.assign(`/${office_id}`)
        },
        error: function(err) {
            $('#error-message').removeClass('display-none');
            // $('#error-message').text(err.message);
            console.log(err);
        }
    });
}

function createClick() {
    setModalHeader('Create');
    let modalBodyContent = "";
    let keys = ['firstName', 'lastName', 'gender', 'isManager', 'nationalId', 'birthDate'];
    keys.forEach(key => {
        modalBodyContent += `
        <div class="row p-1">
            <div class="col-sm-5">
                <label class="p-2" for="${key}">${key}:</label>
            </div>
            <div class="col-sm-7">
                <input class="p-2" type="text" id="${key}" placeholder="${key}">
            </div>
        </div>`
    })

    modalBodyContent += `
        <p id="error-message" class="row p-1 error display-none">
                
        </p>`
    $('#modal-body').html(modalBodyContent);
    let modalFooterContent = `
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" id="commit-create" class="btn btn-success">Create</button>
    `
    $('#modal-footer').html(modalFooterContent);
    $('#commit-create').click(commitCreate);
}

function commitCreate() {
    if (!$('#firstName').val() || !$('#lastName').val() || !$('#gender').val() ||
        !$('#isManager').val() || !$('#nationalId').val() || !$('#birthDate').val()) {
        $('#error-message').removeClass('display-none');
        $('#error-message').text('Please fill all values.');
        return;
    }
    let createData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        gender: $('#gender').val(),
        isManager: $('#isManager').val(),
        nationalId: $('#nationalId').val(),
        birthDate: $('#birthDate').val(),
        officeId: office_id
    }
    console.log(createData);
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/employee/create",
        data: createData,
        success: function(employee) {
            window.location.assign(`/${office_id}`)
        },
        error: function(err) {
            console.log(err);
            $('#error-message').removeClass('display-none');
            $('#error-message').text(err.responseJSON.message);
        }
    });
}

function setModalHeader(title) {
    let content = `
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    $('#modal-header').html(content);
}