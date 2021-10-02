const { getSuccessResponse } = require("../../utils/success");
const { getErrorResponse } = require("../../utils/error");

const Validate = require("./validate");

module.exports.main = async (event) => {
  try {
    const request = JSON.parse(event.body);

    //* Validate the payload
    const valid = Validate(request);

    if (valid !== true) {
      const error = valid;
      return getErrorResponse(error, 422);
    }

    const { otp } = request;

    return getSuccessResponse(otp);
  } catch (error) {
    return getErrorResponse(error);
  }
};
