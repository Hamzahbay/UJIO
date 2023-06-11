import { Router } from "express"
import { authentication } from "../config/auth.js"
import { adminC } from './../controller/adminC.js'
const router = Router()
const controller = new adminC

//page handle
//get method
router.get('/jadwal', authentication, controller.getPage.jadwal)
router.get('/tambah', authentication, controller.getPage.tambah)
router.get('/edit', authentication, controller.getPage.edit)

//post metod
router.post('/jadwal', authentication, controller.postPage.jadwal)
router.post('/tambah', authentication, controller.postPage.tambah)
router.post('/edit', authentication, controller.postPage.edit)

export { router as adminC }