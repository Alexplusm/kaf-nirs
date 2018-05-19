const csrfSafeMethod = (method) => {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

module.exports = {csrfSafeMethod}