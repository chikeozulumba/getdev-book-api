let validator = require("email-validator");

function fields(body) {
  let message;
  let required = [
    "email",
    "password",
    "first_name",
    "last_name",
    "telephone",
    "street",
    "state",
    "country",
    "confirm_password"
  ];
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      const el = body[key];
      if (el.length === 0) {
        return {
          message: `${key.replace("_", " ")} field is required!`,
          field: key,
          status: 400
        };
      }
      message = {
        status: 200,
        body: body
      };
    }
  }
  return message;
}
function email(email) {
  return validator.validate(email);
}

const registerValidator = function(body) {
  let fieldCheck = fields(body);
  if (typeof fieldCheck.status !== "undefined" && fieldCheck.status === 200) {
    if (email(fieldCheck.body.email) === true) {
      if (fieldCheck.body.password === fieldCheck.body.confirm_password) {
        return {
          email: true,
          password: true,
          payload: body,
          status: 200
        };
      } else {
        return {
          message: `Passwords do not match!`,
          field: "confirm_password",
          status: 400
        };
      }
    }
  } else {
    return fieldCheck;
  }
};

module.exports = registerValidator;
