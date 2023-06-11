import { Jadwal } from "../models/Jadwal.js"
import { Mapel } from "../models/Mapel.js"
import { Siswa } from "../models/Siswa.js"
import { Ujian } from "../models/Ujian.js"
import { Nilai } from "../models/Nilai.js"

class Controller {
    constructor() {
        this.getPage = {
            jadwal: (request, response) => {
                Mapel.findAll().then(res1 => {
                    Jadwal.findAll().then(res => {
                        let week = []
                        let w1 = (new Date().getDate() - (new Date().getDay() - 1))
                        let w2 = w1 + 6
                        let day = 'Senin,Selasa,Rabu,Kamis,Jum\'at,Sabtu,Minggu'
    
                        res.forEach(x => {
                            if( w1 < x.toJSON().tanggal.split('-')[2] && w2 > x.toJSON().tanggal.split('-')[2] ) {
                                week.push({ hari: day.split(',')[new Date(x.toJSON().tanggal).getDay()], data: x.toJSON() })
                            }
                        })
    
                        response.render('murid/jadwal', { data: { res, res1, week }, req: request.user })
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            kartu: (request, response) => {
                response.render('murid/kartu-ujian', { req: request.user })
            },
            bfr: (request, response) => {
                Nilai.findAll({ where: { kodeJadwal: request.params.id } }).then(res3 => {
                    Mapel.findAll().then(res2 => {
                        Jadwal.findOne({ where: { id: request.params.id } }).then(res1 => {
                            Ujian.findOne({ where: { kodeJadwal: request.params.id } }).then(res => {
                                response.render('murid/penjelasan', { req: request.user, query: request.query, params: request.params, res, res1, res2, res3 })
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            start: (request, response) => {
                Jadwal.findOne({ where: { id: request.params.id } }).then(res => {
                    if( res ) {
                        let date = new Date()
                        let month = new Date().getMonth() + 1
                        let dt = new Date().getDate()
                        let hours = new Date().getHours()
                        let mnt = new Date().getMinutes()
                        if( month.toString().length == 1 ) {
                            month = '0' + month
                        }
                        if( dt.toString().length == 1 ) {
                            dt = '0' + dt
                        }
                        if( hours.toString().length == 1 ) {
                            hours = '0' + hours
                        }
                        if( mnt.toString().length == 1 ) {
                            mnt = '0' + mnt
                        }
                        date = `${date.getFullYear()}-${month}-${dt}`
                        let time = `${hours}:${mnt}`

                        if( date == res.toJSON().tanggal ) {
                            let apl = `${res.toJSON().jam.split(' - ')[0].split(':')[0]}:${res.toJSON().jam.split(' - ')[0].split(':')[1]}`
                            let bvr = `${res.toJSON().jam.split(' - ')[1].split(':')[0]}:${res.toJSON().jam.split(' - ')[1].split(':')[1]}`

                            if( new Date(`${date} ${time}`).getTime() >= new Date(`${date} ${apl}`).getTime() &&
                            new Date(`${date} ${time}`).getTime() <= new Date(`${date} ${bvr}`).getTime() ) {
                                return Ujian.findOne({ where: { kodeJadwal: request.params.id } }).then(res1 => {
                                    let alp = []
                                    for( let i = 4; i < Object.keys(res1.ujian[0]).length; i++ ) {
                                      alp.push(Object.keys(res1.ujian[0])[i])
                                    }
                                    return response.render('murid/ujian', { req: request.user, res, res1, alp, params: request.params })
                                }).catch(err => console.log(err))
                            } else {
                                request.flash('error_message', 'Jam ujian tidak sesuai!')
                                return response.redirect('/siswa/ujian/' + request.params.id)
                            }
                        } else {
                            request.flash('error_message', 'Tanggal ujian tidak sesuai!')
                            return response.redirect('/siswa/ujian/' + request.params.id)
                        }
                    } else response.send('Error')
                }).catch(err => console.log(err))
            },
            json: (request, response) => {
                Ujian.findOne({ where: { kodeJadwal: request.params.id } }).then(res => {
                    response.json(res)
                }).catch(err => console.log(err))
            }
        }
        this.postPage = {
            kartu: (request, response) => {
                if( request.body.password == '' ) {
                    request.flash('error_message', 'Isi password!')
                    response.redirect('/siswa/kartu-ujian')
                }
                if( request.body.password.length < 6 ) {
                    request.flash('error_message', 'Password harus lebih dari 6 karakter!')
                    response.redirect('/siswa/kartu-ujian')
                }
                
                Siswa.update({ password: request.body.password }, { where: { nis: request.user.nis } }).then(res => {
                    if( res ) {
                        request.flash('success_message', 'Berhasil!')
                        response.redirect('/siswa/kartu-ujian')
                    } else {
                        request.flash('error_message', 'Kesalahan parameter!')
                        response.redirect('/siswa/kartu-ujian')
                    }
                }).catch(err => console.log(err))
            },
            selesai: (request, response) => {
                Ujian.findOne({ where: { kodeJadwal: request.params.id } }).then(res => {
                    if( res ) {
                        let alp = []
                        let rslt = []

                        for( let i = 0; i < Object.keys(request.body).length; i++ ) {
                            alp.push(Object.keys(request.body)[i])
                        }
                        res.ujian.forEach(y => {
                            alp.forEach(x => {
                                if( request.body[x].split('-')[1] == y.jawab.toUpperCase() ) {
                                    rslt.push(request.body[x])
                                }
                            })
                        })
                        let id = 0
                        Nilai.findAll().then(res0 => {
                            if( res0.length > 0 ) id = res.length + 1
                            Nilai.create({
                                id,
                                nis: request.user.nis,
                                kodeJadwal: request.params.id,
                                kodeUjian: res.toJSON().id,
                                kodeSoal: 'A',
                                jumlahSoal: res.toJSON().no,
                                jumlahBenar: rslt.length
                            }).then(res => {
                                if( res ) {
                                    request.flash('success_message', 'Ujian selesai!')
                                    response.redirect('/siswa/ujian/' + request.params.id + "?nilai=" + id)
                                } else response.send('error!')
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    } else response.send('Kesalahan!')
                }).catch(err => console.log(err))
            }
        }
    }
}

export { Controller as siswaA }