const getErrorResponse = (info, status) => {
  console.log(info);
  return {
    statusCode: status || 500,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(info),
  };
};

module.exports = { getErrorResponse };
