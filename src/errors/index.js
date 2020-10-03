class HttpError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

class DataTooOldError extends HttpError {
  constructor(daysAgo) {
    super(`Failed to get statistics, data is older than ${daysAgo} days ago`, 422)
  }
}

module.exports = {
  HttpError,
  DataTooOldError,
}
