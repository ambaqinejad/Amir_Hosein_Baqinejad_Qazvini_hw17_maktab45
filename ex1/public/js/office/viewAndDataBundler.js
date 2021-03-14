!$(document).ready(function() {
    getOffices(officesDataAreReady)
});

const officesDataAreReady = (offices) => {
    putOfficesInPage(offices)
}