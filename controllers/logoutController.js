module.exports = {
  getLogout: (req, res, next) => {
    req.logout((err) => {
      if (err) next(err)
      res.redirect("/")
    })
  },
}
