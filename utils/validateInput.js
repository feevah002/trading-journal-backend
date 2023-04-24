class ValidateInput {
  constructor(inputObj) {}
  // capitalize string
  capitalize(string) {
    string.toLowerCase();
    let capitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized;
  }
  atSignUp(data, avatar) {
    let validated = {};
    // email
    if (data.email) {
      validated.email = data.email;
    }
    // profile pic
    if (avatar) {
      validated.avatar = avatar.path;
    }
    // firstname
    if (data.firstname) {
      validated.firstname = this.capitalize(data.firstname);
    }
    // lastname
    if (data.lastname) {
      validated.lastname = this.capitalize(data.lastname);
    }
    // middlename
    if (data.middlename) {
      validated.middlename = this.capitalize(data.middlename);
    }
    // username
    if (data.username) {
      validated.username = data.username;
    }
    // password
    if (data.password) {
      validated.password = data.password;
    }
    return validated;
  }
  atEdit(data, avatar) {
    let validated = {};
    // email
    if (data.email) {
      validated.email = data.email;
    }
    // profile pic
    if (avatar) {
      validated.avatar = avatar.path;
    }
    // firstname
    if (data.firstname) {
      validated.firstname = this.capitalize(data.firstname);
    }
    // lastname
    if (data.lastname) {
      validated.lastname = this.capitalize(data.lastname);
    }
    // middlename
    if (data.middlename) {
      validated.middlename = this.capitalize(data.middlename);
    }
    // username
    if (data.username) {
      validated.username = data.username;
    }
    return validated;
  }
  atLogin(data) {
    let validated = {};
    // email
    if (data.email) {
      validated.email = data.email.toLowerCase();
    }
    // password
    if (data.password) {
      validated.password = data.password;
    }
    return validated;
  }
}

module.exports = ValidateInput;
