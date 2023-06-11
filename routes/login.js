import { Router } from "express"
import { Login } from "../controller/login.js"
const router = Router()
const Controller = new Login()

//login page handle
//get method
router.get('/out', Controller.getPage.logout)
router.get('/in/set', Controller.getPage.login)

//post method
router.post('/in/set', Controller.postPage.login)

export { router as login }