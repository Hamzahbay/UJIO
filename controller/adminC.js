import { Mapel } from "../models/Mapel.js"
import { Jadwal } from "../models/Jadwal.js"
import { Ujian } from "../models/Ujian.js"

class Controller {
    constructor() {
        this.getPage = {
            jadwal: (request, response) => {
                let selected
                let val = { mapel: '', tanggal: '', jam: '', kelas: '', paket: [] }
                if( typeof request.query.del != 'undefined' ) {
                    return Jadwal.destroy({ where: { id: request.query.attribute } }).then(res => {
                        if( res ) {
                            Ujian.destroy({ where: { kodeJadwal: request.query.attribute } }).then(res => {
                                if( res ) {
                                    request.flash('success_message', 'Terhapus!')
                                    return response.redirect('/admin/ujian/jadwal?attribute=all')
                                } else {
                                    request.flash('error_message', 'Kesalahan parameter!')
                                    return response.redirect('/admin/ujian/jadwal?attribute=all')
                                }
                            }).catch(err => console.log(err))
                        } else {
                            request.flash('error_message', 'Kesalahan parameter!')
                            return response.redirect('/admin/ujian/jadwal?attribute=all')
                        }
                    }).catch(err => console.log(err))
                }

                if( request.query.attribute == 'all' ) {
                    selected = 'all'
                }
                if( request.query.attribute != 'all' ) {
                    selected = ''
                }
                Mapel.findAll().then(res => {
                    Jadwal.findAll().then(res1 => {
                        Ujian.findAll().then(res2 => {
                            res1.forEach(x => {
                                if( request.query.attribute == x.toJSON().id ) {
                                    selected = request.query.attribute
                                    val.mapel = x.toJSON().kodeMapel
                                    val.tanggal = x.toJSON().tanggal
                                    val.jam = x.toJSON().jam
                                    val.kelas = x.toJSON().kelas
                                    val.paket = x.toJSON().paket
                                }
                            })

                            response.render('admin/tambah-jadwal', { data: {res, res1, res2}, selected, val })
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            tambah: (request, response) => {
                response.render('admin/tambah-ujian', { kodeJadwal: request.query.jadwal })
            },
            edit: (request, response) => {
                Ujian.findOne({ where: { kodeJadwal: request.query.jadwal } }).then(res => {
                    let alp = []
                    res.ujian.forEach(x => {
                        for( let i = 4; i < Object.keys(x).length; i++ ) {
                            alp.push(Object.keys(x)[i])
                        }
                    })
                    alp = alp.filter((it, ind, ia) => ia.indexOf(it) == ind)

                    response.render('admin/edit-ujian', { res, alp, query: request.query })
                }).catch(err => console.log(err))
            }
        }

        this.postPage = {
            jadwal: (request, response) => {
                let paket = request.body.paket.split(',')
                let alp = []
                const timeFilter = async (start, end) => {
                    if( parseInt(start.split(':')[0]) < parseInt(end.split(':')[0]) ) {
                        return true
                    } else if( parseInt(start.split(':')[0]) == parseInt(end.split(':')[0]) ){
                        if( parseInt(start.split(':')[1]) < parseInt(end.split(':')[1]) ) {
                            return true
                        } else return false
                    } else return false
                }

                if( request.body.paket.includes(' ') == true ) {
                    request.flash('error_message', 'Paket soal tidak boleh ada spasi!')
                    return response.redirect('/admin/ujian/jadwal?attribute=all')
                }
                if( paket[paket.length - 1] == '' ) {
                    request.flash('error_message', 'Paket soal tidak valid!')
                    return response.redirect('/admin/ujian/jadwal?attribute=all')
                }
                for( let i = 0; i < Object.keys(request.body).length; i++ ) {
                    if( request.body[Object.keys(request.body)[i]] == '' ) {
                        request.flash('error_message', 'Isi semua data!')
                        return response.redirect('/admin/ujian/jadwal?attribute=all')
                    }
                }

                paket.forEach(x => {
                    alp.push(x.replace(/[^a-zA-Z0-9 ]/g, ""))
                })
                
                timeFilter(request.body.waktuMulai, request.body.waktuSelesai).then(bool => {
                    if( bool ) {
                        let id = 0
                        if( request.query.attribute != 'all' ) {
                            return Jadwal.update({ kodeMapel: request.body.mapel,
                                tanggal: request.body.tanggal,
                                jam: `${request.body.waktuMulai} - ${request.body.waktuSelesai}`,
                                kelas: request.body.kelas,
                                paket: request.body.paket.split(',') }, { where: { id: request.query.attribute } }).then(res => {
                                    if( res ) {
                                        request.flash('success_message', 'Update tersimpan!')
                                        return response.redirect('/admin/ujian/jadwal?attribute=all')
                                    } else {
                                        request.flash('error_message', 'Kesalahan parameter!')
                                        return response.redirect('/admin/ujian/jadwal?attribute=all')
                                    }
                                }).catch(err => console.log(err))
                        }
                        Jadwal.findAll().then(res => {
                            if( res.length > 0 ) id = res[res.length - 1].toJSON().id + 1
                            Jadwal.create({
                                id, nilai: 'jangan tampilkan',
                                kodeMapel: request.body.mapel,
                                tanggal: request.body.tanggal,
                                jam: `${request.body.waktuMulai} - ${request.body.waktuSelesai}`,
                                kelas: request.body.kelas,
                                paket: request.body.paket.split(',')
                            }).then(res => {
                                if( res ) {
                                    request.flash('success_message', 'Tersimpan!')
                                    return response.redirect('/admin/ujian/jadwal?attribute=all')
                                } else {
                                    request.flash('error_message', 'Terjadi kesalahan!')
                                    return response.redirect('/admin/ujian/jadwal?attribute=all')
                                }
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    } else {
                        request.flash('error_message', 'Jam tidak valid!')
                        return response.redirect('/admin/ujian/jadwal?attribute=all')
                    }
                }).catch(err => console.log(err))
            },
            tambah: (request, response) => {
                let soal = []
                let id = 0
                let ujian = new Object()
                
                if( request.body.excel == '' ) {
                    request.flash('error_message', 'Isi semua data!')
                    return response.redirect('/admin/ujian/tambah?attribute=all&jadwal=' + request.query.jadwal)
                }

                if( typeof request.body.nilai != 'undefined' ) {
                    for( let i = 2; i < Object.keys(request.body).length; i++ ) {
                        ujian[Object.keys(request.body)[i]] = request.body[i]
                    }
                }
                if( typeof request.body.nilai == 'undefined' ) {
                    for( let i = 1; i < Object.keys(request.body).length; i++ ) {
                        ujian[Object.keys(request.body)[i]] = request.body[i]
                    }
                }

                if( typeof request.body.no == 'string' ) {
                    soal.push(ujian)
                }
                if( typeof request.body.no != 'string' ) {
                    for( let i = 0; i < request.body.no.length; i++ ) {
                        soal.push({
                            no: request.body.no[i],
                            kodeSoal: request.body.kodeSoal[i],
                            soal: request.body.soal[i],
                            jawab: request.body.jawab[i],
                            a: request.body.a[i],
                            b: request.body.b[i],
                            c: request.body.c[i],
                            d: request.body.d[i]
                        })
                    }
                }

                Ujian.findAll().then(res => {
                    if( res.length > 0 ) id = res[res.length - 1].toJSON().id + 1
                    Jadwal.findOne({ where: { id: request.query.jadwal } }).then(res1 => {
                        Ujian.create({ id, 
                            kodeJadwal: request.query.jadwal, 
                            kodeSoal: res1.toJSON().paket, 
                            ujian: soal, 
                            no: request.body.no.length }).then(res => {
                            if( res ) {
                                if( typeof request.body.nilai != 'undefined' ) {
                                    // if( request.nilai == 'on' ) {
                                    // }
                                    Jadwal.update({ nilai: 'tampilkan' }, { where: { id: request.query.jadwal } }).then(res => {
                                        if( res ) {
                                            request.flash('success_message', 'Ujian tersimpan!')
                                            return response.redirect('/admin/ujian/jadwal?attribute=' + request.query.jadwal)
                                        } else {
                                            request.flash('error_message', 'Kesalahan parameter!')
                                            return response.redirect('/admin/ujian/tambah?attribute=all&jadwal=' + request.query.jadwal)
                                        }
                                    }).catch(err => console.log(err))
                                } else {
                                    request.flash('success_message', 'Ujian tersimpan!')
                                    return response.redirect('/admin/ujian/jadwal?attribute=' + request.query.jadwal)
                                }
                            } else {
                                request.flash('error_message', 'Kesalahan parameter!')
                                return response.redirect('/admin/ujian/tambah?attribute=all&jadwal=' + request.query.jadwal)
                            }
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            },
            edit: (request, response) => {
                let soal = []
                let ujian = new Object()

                for( let i = 0; i < Object.keys(request.body).length; i++ ) {
                    ujian[Object.keys(request.body)[i]] = request.body[i]
                }

                if( typeof request.body.no == 'string' ) {
                    soal.push(ujian)
                }
                if( typeof request.body.no != 'string' ) {
                    for( let i = 0; i < request.body.no.length; i++ ) {
                        soal.push({
                            no: request.body.no[i],
                            kodeSoal: request.body.kodeSoal[i],
                            soal: request.body.soal[i],
                            jawab: request.body.jawab[i],
                            a: request.body.a[i],
                            b: request.body.b[i],
                            c: request.body.c[i],
                            d: request.body.d[i]
                        })
                    }
                }

                Ujian.update({ ujian: soal }, { where: { kodeJadwal: request.query.jadwal } }).then(res => {
                    if( res ) {
                        request.flash('success_message', 'Berhasil diedit!')
                        response.redirect('/admin/ujian/jadwal?attribute=' + request.query.jadwal)
                    } else {
                        request.flash('error_message', 'Kesalahan parameter!')
                        response.redirect('/admin/ujian/jadwal?attribute=' + request.query.jadwal)
                    }
                }).catch(err => console.log(err))
            }
        }
    }
}

export { Controller as adminC }