const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const { data } = await jwt.verify(token, process.env.SECRETKEY)
    req.userData = data
   
    next()
  } catch (error) {
    console.log(error)
    return res.status(404).json({message: "Invalid Token"});
  }
}

module.exports = {
  verifyToken,
}
