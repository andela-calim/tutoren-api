// export the configurations
module.exports = {
  DBUrl             : process.env.DBUrl || process.env.HQDBUrl,
  secret            : process.env.secret || process.env.HQSecret,
  resave            : true,
  saveUninitialized : true
}