/**
 * Returns Error Response for Error Status Received
 * @function errorResponse
 * @param {object} err - error
 * @returns {(string|object)} Error Object or String
 */
const errorResponse = (err) => {
  switch (err.response.status) {
    case 400:
      return err.response.data.errors;
    case 401:
    case 403:
    case 404:
    case 409:
      return err.response.data.error;
    case 500:
      return 'Something happened, please check your connection and try again';
    default:
      return err.response.statusText;
  }
};

export default errorResponse;