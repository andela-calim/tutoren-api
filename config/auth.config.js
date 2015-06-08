// export the configurations
module.exports = {
  googleAuth : {
    clientID     : process.env.clientID || process.env.HQClientID,
    clientSecret : process.env.clientSecret || process.env.HQClientSecret,
    callbackURL  : process.env.callbackURL || process.env.HQCallbackURL
  }
}