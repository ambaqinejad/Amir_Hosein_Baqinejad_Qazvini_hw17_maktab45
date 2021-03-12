$(document).ready(function() {
    $('tr').click(trClick);
    $('#create').click(createClick);
});


function trClick() {
    setModalHeader('Read');
    $.ajax({
        type: "GET",
        url: `http://localhost:3000/office/${this.id}`,
        success: function(office) {
            let modalBodyContent = "";
            for (const [key, value] of Object.entries(office)) {
                modalBodyContent += `
                    <div class="row p-2">
                        <div class="col-sm-5">${key === '_id' ? 'id' : key}:</div>
                        <div class="col-sm-7">${key === "registryDate" ? value.substring(0, 10) : value}</div>
                    </div>`
            }
            modalBodyContent += `
                <p id="error-message" class="row p-1 error display-none">
                
                </p>`
            $('#modal-body').html(modalBodyContent);
            let modalFooterContent = `
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" id="delete-btn" class="btn btn-danger">Delete</button>
                <button type="button" id="update-btn" class="btn btn-warning">Update</button>
            `
            $('#modal-footer').html(modalFooterContent)
            let id = this.url.split('/');
            id = id[id.length - 1]
            $('#delete-btn').click(removeOffice.bind(null, id))
            $('#update-btn').click(createUpdateModal.bind(null, office))
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function createClick() {
    setModalHeader('Create');
    let modalBodyContent = "";
    let keys = ['name', 'registryNumber', 'city', 'province', 'registryDate'];
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
    if (!$('#name').val() || !$('#registryNumber').val() || !$('#city').val() ||
        !$('#province').val() || !$('#registryDate').val()) {
        $('#error-message').removeClass('display-none');
        $('#error-message').text('Please fill all values.');
        return;
    }
    let createData = {
        name: $('#name').val(),
        registryNumber: $('#registryNumber').val(),
        city: $('#city').val(),
        province: $('#province').val(),
        registryDate: $('#registryDate').val()
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/office/create",
        data: createData,
        success: function(office) {
            window.location.assign('/office')
        },
        error: function(err) {
            $('#error-message').removeClass('display-none');
            $('#error-message').text(err.responseJSON.error);
        }
    });
}

function setModalHeader(title) {
    let content = `
        <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>`;
    $('#modal-header').html(content);
}

function removeOffice(id) {
    let ok = confirm("Are you sure?");
    if (ok) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/office/delete",
            data: { id },
            success: function(response) {
                console.log(response);
                window.location.assign("/office")
            },
            error: function(err) {
                $('#error-message').removeClass('display-none');
                $('#error-message').text(err.responseJSON.error);
            }
        });
    }
}

function createUpdateModal(office) {
    setModalHeader('Update');
    let modalBodyContent = "";
    let id = office['_id'];
    delete office['_id'];
    delete office['__v'];
    for (const [key, value] of Object.entries(office)) {
        modalBodyContent += `
            <div class="row p-1">
                <div class="col-sm-5">
                    <label class="p-2" for="${key}">${key}:</label>
                </div>
                <div class="col-sm-7">
                    <input class="p-2" type="text" value="${key === "registryDate" ? value.substring(0, 10) : value}" id="${key}" placeholder="${key}">
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
    $('#commit-btn').click(commitUpdate.bind(null, office, id));
}

function commitUpdate(office, id) {
    let commitData = {
        id,
        name: $('#name').val() ? $('#name').val() : office.name,
        registryNumber: $('#registryNumber').val() ? $('#registryNumber').val() : office.registryNumber,
        city: $('#city').val() ? $('#city').val() : office.city,
        province: $('#province').val() ? $('#province').val() : office.province,
        registryDate: $('#registryDate').val() ? $('#registryDate').val() : office.registryDate
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/office/update",
        data: commitData,
        success: function(info) {
            window.location.assign('/office')
        },
        error: function(err) {
            $('#error-message').removeClass('display-none');
            $('#error-message').text(err.responseJSON.error);
        }
    });
}