import { Router } from "express"
import { authentication } from "../config/auth.js"
import { siswaA } from './../controller/siswaA.js'
const router = Router()
const controller = new siswaA

// page handle
//get page
router.get('/home', authentication, controller.getPage.jadwal)
router.get('/kartu-ujian', authentication, controller.getPage.kartu)
router.get('/ujian/:id', authentication, controller.getPage.bfr)
router.get('/ujian/:id/start', authentication, controller.getPage.start)
router.get('/ujian/:id/json/data', authentication, controller.getPage.json)

// post page
router.post('/kartu-ujian', authentication, controller.postPage.kartu)
router.post('/ujian/:id', authentication, controller.postPage.selesai)

export { router as siswaA }