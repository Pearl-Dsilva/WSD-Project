function isValidName(name) {
    return new RegExp("[a-zA-Z0-9 '#@!]{3}").test(name);
}



// dd-mm-yyyy
function isValidDate(date) {

    return true;

    // compare date with current, it must always be ahead of current

    // return new RegExp("^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$").test(startDate);
}
//TODO:isValidTimeRange
function isValidTimeRange(startTime, endTime) {
    return true;
}

function isValidEmail(email) {
    return new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$").test(email);
}
function isValidPassword(password) {
    if (password.length < 8) return ({ result: false, message: "Length is less than 8" })
    if (!new RegExp("[a-z]").test(password)) return ({ result: false, message: "Missing lowercase characters" })
    if (!new RegExp("[A-Z]").test(password)) return ({ result: false, message: "Missing uppercase characters" })
    if (!new RegExp("[0-9]").test(password)) return ({ result: false, message: "Missing digits" })
    if (!new RegExp("[!@#$%^&*?]").test(password)) return ({ result: false, message: "Missing special characters" })
    return { result: true, message: "" }
}

export { isValidDate, isValidName, isValidTimeRange, isValidEmail, isValidPassword }