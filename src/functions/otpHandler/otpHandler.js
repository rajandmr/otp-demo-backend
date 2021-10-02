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

    //* Check if number of digits is 7
    const digitLen = otp.toString().length;
    if (digitLen !== 7) {
      return getErrorResponse("Total number of digits must be equal to 7", 422);
    }

    //* check if the last digit is 7

    const str = otp.toString();
    const lastDigit = parseInt(str.charAt(str.length - 1));
    if (lastDigit === 7) {
      return getErrorResponse("LastDigit can't be 7", 422);
    }

    return getSuccessResponse(otp);
  } catch (error) {
    return getErrorResponse(error.message);
  }
};
