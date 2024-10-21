const { Router } = require("express")
const {
  getMembership,
  postMembership,
} = require("../controllers/joinMembershipController")
const { isAuthenticated } = require("../passportConfig")
const joinMembershipRouter = Router()

joinMembershipRouter.get("/", isAuthenticated, getMembership)
joinMembershipRouter.post("/", postMembership)

module.exports = joinMembershipRouter
