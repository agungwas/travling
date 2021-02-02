const { Review } = require('../models')

module.exports = async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.userLoginned);
    const { id } = req.userLoginned
    const data = await Review.findByPk(+req.params.id)
    if (!data) throw { status: 404, error: "Reviews was not found"}
    console.log(data);
    if (data.UserId !== id) throw { status: 403, error: "You are not allowed"}
    req.data = data
    next()
  } catch (error) {
    next(error)
  }
}