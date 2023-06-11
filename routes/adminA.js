import { Router } from "express"
import { authentication } from "../config/auth.js"
import { adminA } from './../controller/adminA.js'
const router = Router()
const controller = new adminA

//page handle
//get method
router.get('/data', authentication, controller.getPage.dataSiswa)
router.get('/tambah', authentication, controller.getPage.tambahSiswa)

//post metod
router.post('/data', authentication, controller.postPage.dataSiswa)
router.post('/tambah', authentication, controller.postPage.tambahSiswa)

export { router as adminA }