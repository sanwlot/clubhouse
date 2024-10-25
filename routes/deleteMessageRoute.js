const { Router } = require("express")
const deleteMessageRouter = Router()
const { postDeleteMessage } = require("../controllers/deleteMessageController")

deleteMessageRouter.post("/:id", postDeleteMessage)

module.exports = deleteMessageRouter
