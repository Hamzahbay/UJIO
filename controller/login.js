import { response } from 'express'
import passport from 'passport'
import { Admin } from "../models/Admin.js"
import { Guru } from '../models/Guru.js'
import { Siswa } from '../models/Siswa.js'

class Controller {
    constructor() {
        this.getPage = {
            login: (request, response) => {
                let query = request.query
                if( request.query.role == 'admin' ) {
                    Admin.findOne({ where: { userKey: query.key } }).then(res => {
                        if( res ) {
                            response.render('login', { query })
                        } else {
                            response.redirect('/error')
                        }
                    }).catch(err => console.log(err))
                } else {
                    return response.render('login', { query: query })
                }                
            },
            logout: (request, response) => {
                request.logOut()
                request.flash('success_message', `Berhasil Keluar Akun`)
                response.redirect('/log/in/set?role=user&key=nis')
            }
        }

        this.postPage = {
            login: (request, response, next) => {
                for( let i = 0; i < Object.keys(request.body).length; i++ ) {
                    if( Object.keys(request.body)[i] == '' ) {
                        request.flash('error_message', 'Isi Untuk Lanjut!')
                        return response.redirect(`/log/in/set?role=${request.query.role}&key=${request.query.key}`)
                    }
                }
                if( request.query.role == 'admin' ) {
                    Admin.findOne({ where: { userKey: request.query.key } }).then(res => {
                        if( res ) {
                            if( res.toJSON().nama == request.body.id ) {
                                if( res.toJSON().password == request.body.password ) {
                                    // request.flash('success_message', 'Halo admin!')
                                    passport.authenticate('local', {
                                        successRedirect: '/admin/tambah-jurusan?attribute=all',
                                        failureRedirect: `/log/in/set?role=${request.query.role}&key=${request.query.key}`,
                                        failureFlash: true
                                    })(request, response, next)
                                } else {
                                    request.flash('error_message', 'Kesalahan parameter query!')
                                    return response.redirect(`/log/in/set?role=${request.query.role}&key=${request.query.key}`)
                                }
                            } else {
                                request.flash('error_message', 'Kesalahan parameter query')
                                return response.redirect(`/log/in/set?role=${request.query.role}&key=${request.query.key}`)
                            }
                        } else {
                            request.flash('error_message', 'Key tidak dikenali!')
                            return response.redirect(`/log/in/set?role=${request.query.role}&key=${request.query.key}`)

                            // if( typeof request.body.nis != 'undefined' || typeof request.body.nip != 'undefined' ) {
                            // } else {
                            //     request.flash('error_message', 'Kesalahan parameter query')
                            //     return response.redirect('/log/in/set?role=user&key=nis')
                            // }
                        }
                    }).catch(err => console.log(err))
                } else {
                    Admin.findOne({ where: { nama: request.body.id, password: request.body.password } }).then(res => {
                        if( res ) {
                            request.flash('error_message', 'NIS atau password salah!')
                            return response.redirect('/log/in/set?role=user&key=nis')
                        } else {
                            if( request.query.key == 'nis' ) {
                                Siswa.findOne({ where: { nis: request.body.id } }).then(res => {
                                    if( res ) {
                                        if( res.toJSON().password == '' ) {
                                            if( res.toJSON().nis == request.body.password ) {
                                                // request.flash('warning_message', 'Pastikan kartu ujian anda telah dicetak!')
                                                passport.authenticate('local', {
                                                    successRedirect: '/siswa/home', 
                                                    failureRedirect: `/log/in/set?role=${request.query.role}&key=${request.query.key}`,
                                                    failureFlash: true
                                                })(request, response, next)
                                            } else {
                                                request.flash('error_message', 'Password salah!')
                                                return response.redirect('/log/in/set?role=user&key=nis') 
                                            }
                                        } else {
                                            if( res.toJSON().password == request.body.password ) {
                                                // request.flash('warning_message', 'Pastikan kartu ujian anda telah dicetak!')
                                                passport.authenticate('local', {
                                                    successRedirect: '/siswa/home', 
                                                    failureRedirect: `/log/in/set?role=${request.query.role}&key=${request.query.key}`,
                                                    failureFlash: true
                                                })(request, response, next)
                                            } else {
                                                request.flash('error_message', 'Password salah!')
                                                return response.redirect('/log/in/set?role=user&key=nis') 
                                            }
                                        }
                                    } else {
                                        request.flash('error_message', 'Anda tidak terdaftar sebagai murid!')
                                        return response.redirect('/log/in/set?role=user&key=nis') 
                                    }
                                }).catch(err => console.log(err))
                            } else if( request.query.key == 'nip' ) {
                                Guru.findOne({ where: { nip: request.body.id } }).then(res => {
                                    if( res ) {
                                        if( request.body.password == res.toJSON().nip ) {
                                            // request.flash('success_message', 'Halo guru grafika!')
                                            passport.authenticate('local', {
                                                successRedirect: '/guru/home',
                                                failureRedirect: `/log/in/set?role=${request.query.role}&key=${request.query.key}`,
                                                failureFlash: true
                                            })(request, response, next)
                                        } else {
                                            request.flash('error_message', 'Password salah!')
                                            return response.redirect('/log/in/set?role=user&key=nip') 
                                        }
                                    } else {
                                        request.flash('error_message', 'Anda tidak terdaftar sebagai guru')
                                        return response.redirect('/log/in/set?role=user&key=nip')
                                    }
                                }).catch(err => console.log(err))
                            } else {
                                request.flash('error_message', 'Kesalahan parameter query')
                                return response.redirect('/log/in/set?role=user&key=nis')
                            }
                        }
                    }).catch(err => console.log(err))
                }
            }
        }
    }
}

export { Controller as Login }