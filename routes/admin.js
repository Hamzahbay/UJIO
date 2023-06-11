import { Router } from "express"
import { authentication } from "../config/auth.js"
import { admin } from "../controller/admin.js"
const router = Router()
const controller = new admin

//page handle
//get
router.get('/tambah-jurusan', authentication, controller.getPage.tambahJurusan)
router.get('/tambah-mapel', authentication, controller.getPage.tambahMapel)
router.get('/tambah-kelas', authentication, controller.getPage.tambahKelas)
router.get('/data-nilai', authentication, controller.getPage.nilai)

router.get('/change-profile', authentication, controller.getPage.editAdmin)

//post
router.post('/tambah-jurusan', authentication, controller.postPage.tambahJurusan)
router.post('/tambah-mapel', authentication, controller.postPage.tambahMapel)
router.post('/tambah-kelas', authentication, controller.postPage.tambahKelas)

export { router as admin }