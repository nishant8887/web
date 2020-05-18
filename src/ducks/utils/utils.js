export function getErrorsFromResponse(json) {
  let errors = {};
  if (json.parameters) {
    for (var i = 0; i < json.parameters.length; i++) {
      let err = json.parameters[i];
      errors[err.parameter] = err.message;
    }
  }
  if (!json.parameters && json.message) {
    errors['common'] = json.message;
  }
  return errors;
}
