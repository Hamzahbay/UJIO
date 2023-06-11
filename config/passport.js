import LocalStrategy from 'passport-local'
import { Admin } from '../models/Admin.js'
import { Siswa } from '../models/Siswa.js'
import { Guru } from '../models/Guru.js'

const psp = passport => {
    passport.use(new LocalStrategy.Strategy({ usernameField: 'id' }, (id, password, done) => {
        Admin.findOne({ where: { nama: id } }).then(res => {
            if( res ) {
                if( res.toJSON().password == password ) {
                    return done(null, res.toJSON())
                }
            } else {
                Siswa.findOne({ where: { nis: id } }).then(res => {
                    if( res ) {
                        if( res.toJSON().password == '' ) {
                            if( res.toJSON().nis == password ) {
                                return done(null, res.toJSON())
                            } else {
                                return done(null, false, { message: 'Password Salah!' })
                            }
                        }
                        if( res.toJSON().password == password ) {
                            return done(null, res.toJSON())
                        }
                    } else {
                        Guru.findOne({ where: { nip: id } }).then(res => {
                            if( res ) {
                                
                            } else {
                                return done(null, false, { message: 'Anda Tidak terdaftar!' })
                            }
                        }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    }))

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        Admin.findOne({ where: { id } }).then(res => {
            if( res ) {
                return done(null, res.toJSON())
            } else {
                Siswa.findOne({ where: { id } }).then(res => {
                    if( res ) {
                        return done(null, res.toJSON())
                    } else {
                        Guru.findOne({ where: { id } }).then(res => {
                            if( res ) {
                                return done(null, res.toJSON()) 
                            }
                        }).catch(err => console.log(err))
                    }
                }).catch(err => console.log(err))
            }
        }).catch(err => console.log(err))
    })
}

export default psp