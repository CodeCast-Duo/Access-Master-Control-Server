module.exports = {
  secret: process.env.SECRET_KEY,
  jwtExpiration: Number(process.env.JWT_EXPIRATION),
  jwtRefreshExpiration: Number(process.env.JWT_REFRESH_EXPIRATION)
};