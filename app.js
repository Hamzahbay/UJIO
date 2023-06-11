//framework
import express, { urlencoded, json } from 'express'
import layout from 'express-ejs-layouts'
import session from 'express-session'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import passport from 'passport'
const app = express()

//build in
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//port
const port = 1020

//db connection
import connection from './config/connection.js'

//passport auth
import psp from './config/passport.js'
psp(passport)

//set app session
app.use(session({
    secret: 'YudhaKocak',
    resave: true,
    saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//connect flash
app.use(flash())

//global variables //flash message
app.use((request, response, next) => {
    response.locals.success_message = request.flash('success_message')
    response.locals.error_message = request.flash('error_message')
    response.locals.warning_message = request.flash('warning_message')
    response.locals.error = request.flash('error')
    next()
})

//view engine //set ejs
app.set('views', join(__dirname, '/views/'))
app.set('view engine', 'ejs')

//body parser //parse request.body to JSON
app.use(urlencoded({ extended: false }))
app.use(json())

//public access
app.use(express.static(join(__dirname, 'public')))

//routes
import { login } from './routes/login.js'
app.use('/log', login)

import { admin } from './routes/admin.js'
app.use('/admin', admin)
import { adminA } from './routes/adminA.js'
app.use('/admin/siswa', adminA)
// import { adminB } from './routes/adminB.js'
// app.use('/admin/guru', adminB)
import { adminC } from './routes/adminC.js'
app.use('/admin/ujian', adminC)

import { siswaA } from './routes/siswaA.js'
app.use('/siswa', siswaA)

app.get('/admin/guru/data', (request, response) => response.redirect('/admin/data-nilai'))


//run server //listening port
app.listen(port, console.log(`Server is running at port: ${port}`))