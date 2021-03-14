function putOfficesInPage(offices) {
    $('#create').click(createClick)
    let pageContent = '';
    offices.forEach(office => {
        pageContent += `
            <div class="col-sm-12 col-md-6 col-lg-4 p-3">
                <div class="card p-3">
                    <div class="card-body">
                        <h5 class="card-title text-center p-2">${office.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted text-center p-2">شماره ثبت: ${office.registryNumber}</h6>
                        <p class="card-text text-center p-2">شهر: ${office.city}</p>
                        <p class="card-text text-center p-2">استان: ${office.province}</p>
                        <p class="card-text text-center p-2">${office.registryDate.substring(0, 10)}</p>
                        <p class="card-text text-center p-2">${office.number}</p>
                        <div class="d-flex justify-content-center">
                            <a type="button" href="http://localhost:3000/${office._id}" class="btn btn-primary m-1 enterBtn" id="${office._id}">ورود</a>
                            <button type="button" class="btn btn-dark m-1 updateBtn" data-bs-toggle="modal" data-bs-target="#my_modal" id="${office._id}">بروزرسانی</button>
                            <button type="button" class="btn btn-danger m-1 deleteBtn" id="${office._id}">حذف</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        $('#offices-content-row').html(pageContent);
        // $('.enterBtn').click(function(e) {

        // });
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
            url: 'http://localhost:3000/office/delete',
            data: { id },
            success: function(response) {
                console.log(response);
                window.location.assign("/")
            }
        });
    }
}

function updateBtnClick() {
    setModalHeader('Update');
    let modalBodyContent = "";
    let id = this.id;
    $.get(`http://localhost:3000/office/${id}`,
        function(office, textStatus, jqXHR) {
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
    );

}

function commitUpdate(office, id) {
    let commitData = {
        id,
        name: $('#name').val() ? $('#name').val() : office.name,
        registryNumber: $('#registryNumber').val() ? $('#registryNumber').val() : office.registryNumber,
        city: $('#city').val() ? $('#city').val() : office.city,
        province: $('#province').val() ? $('#province').val() : office.province,
        registryDate: $('#registryDate').val() ? $('#registryDate').val() : office.registryDate,
        number: $('#number').val() ? $('#number').val() : office.number
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:3000/office/update",
        data: commitData,
        success: function(info) {
            window.location.assign('/')
        },
        error: function(err) {
            $('#error-message').removeClass('display-none');
            $('#error-message').text(err.responseJSON.error);
        }
    });
}

function createClick() {
    setModalHeader('Create');
    let modalBodyContent = "";
    let keys = ['name', 'registryNumber', 'city', 'province', 'registryDate', 'number'];
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
        !$('#province').val() || !$('#registryDate').val() || !$('#number').val()) {
        $('#error-message').removeClass('display-none');
        $('#error-message').text('Please fill all values.');
        return;
    }
    let createData = {
        name: $('#name').val(),
        registryNumber: $('#registryNumber').val(),
        city: $('#city').val(),
        province: $('#province').val(),
        registryDate: $('#registryDate').val(),
        number: $('#number').val()
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/office/create",
        data: createData,
        success: function(office) {
            window.location.assign('/')
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