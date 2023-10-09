function isValidName(name) {
    return new RegExp("[a-zA-Z0-9 '#@!]{3}").test(name);
}



// date must be ahead of current date
function isValidDate(date) {
    const currentDate = new Date().toLocaleDateString();
    if (currentDate < date) return true;
    return false;
}
//start time less than end time
function isValidTimeRange(startTime, endTime) {
    if (startTime < endTime) return true;
    return false;
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