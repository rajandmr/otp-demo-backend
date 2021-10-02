const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const bodySchema = {
  type: "object",
  properties: {
    otp: {
      type: "number",
    },
  },
  required: ["otp"],
};

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

module.exports = (body) => {
  const validate = ajv.compile(bodySchema);
  const valid = validate(body);
  if (!valid) {
    const validationErrors = validate.errors.map((error) => {
      let errorObject = { message: "", name: "" };
      switch (error.keyword) {
        case "required":
          errorObject = {
            message: `${error.params.missingProperty} is required.`,
            name: error.params.missingProperty,
          };
          break;
        default:
          errorObject = {
            message: `${error.instancePath.split("/")[1]} is required.`,
            name: error.instancePath.split("/")[1],
          };
      }
      return errorObject;
    });
    return validationErrors;
  }
  return true;
};
