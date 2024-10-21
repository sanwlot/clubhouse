const { Router } = require("express")
const {
  getCreateNewMessage,
  postCreateNewMessage,
} = require("../controllers/createNewMessageController")
const { isAuthenticated } = require("../passportConfig")
const createNewMessageRouter = Router()

createNewMessageRouter.get("/", isAuthenticated, getCreateNewMessage)
createNewMessageRouter.post("/", isAuthenticated, postCreateNewMessage)

module.exports = createNewMessageRouter
