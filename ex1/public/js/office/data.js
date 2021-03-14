const GET_ALL_OFFICES_URL = 'http://localhost:3000/office/all';

const getOffices = (officesDataAreReadyCB) => {
    $.get(GET_ALL_OFFICES_URL,
        function(offices, textStatus, jqXHR) {
            officesDataAreReadyCB(offices)
        }
    );
}