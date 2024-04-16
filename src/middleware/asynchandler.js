export const asynchandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
}