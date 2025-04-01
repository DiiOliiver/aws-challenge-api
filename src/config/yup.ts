import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "The '${path}' field is required",
    notType: "The '${path}' field must be of the correct type",
  },
  string: {
    min: "The '${path}' field must be at least ${min} characters long",
    max: "The '${path}' field cannot be longer than ${max} characters",
    trim: "The '${path}' field cannot contain extraneous spaces",
  },
  number: {
    min: "The value of '${path}' must be at least ${min}",
    max: "The value of '${path}' must be at most ${max}",
    integer: "The '${path}' field must be an integer",
  },
});

export default yup;
