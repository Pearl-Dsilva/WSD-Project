function isValidName(name) {
    return new RegExp("[a-zA-Z0-9 '#@!]{3}").test(name);
}



// dd-mm-yyyy
function isValidDate(date) {
    return true;

    // compare date with current, it must always be ahead of current

    // return new RegExp("^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$").test(startDate);
}

function isValidTimeRange(startTime, endTime) {
    return true;
}


export { isValidDate, isValidName, isValidTimeRange }