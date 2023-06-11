import { Jurusan } from "./../models/Jurusan.js"
import { Mapel } from "./../models/Mapel.js"
import { Kelas } from "./../models/Kelas.js"
import { Admin } from "../models/Admin.js"
import { Nilai } from "../models/Nilai.js"
import { Jadwal } from "../models/Jadwal.js"
import { Siswa } from "../models/Siswa.js"

class Controller {
    constructor() {
        this.getPage = {
            tambahJurusan: (request, response) => {
                if( typeof request.query.del != 'undefined' ) {
                    Jurusan.destroy({ where: { kode: request.query.attribute.toUpperCase() } }).then(res => {
                        console.log(res)
                        request.flash('success_message', 'Terhapus')
                        return response.redirect('/admin/tambah-jurusan?attribute=all')
                    }).catch(err => console.log(err))
                } else {
                    let selected
                    let valJurusan = { nama: '', kode: '' }
                    if( request.query.attribute == 'all' ) {
                        selected = 'all'
                    }
                    if( request.query.attribute != 'all' ) {
                        selected = ''
                    }
                    Jurusan.findAll().then(res => {
                        res.forEach(x => {
                            if( request.query.attribute.toUpperCase() == x.toJSON().kode.toUpperCase() ) {
                                selected = `${request.query.attribute.toUpperCase()}`
                                valJurusan.kode = x.toJSON().kode
                                valJurusan.nama = x.toJSON().nama
                            } 
                        })
                        response.render('admin/tambah-jurusan', { data: res , selected, valJurusan })
                    }).catch(err => console.log(err))
                }
            },
            tambahMapel: (request, response) => {
                if( typeof request.query.del != 'undefined' ) {
                    Mapel.destroy({ where: { kode: request.query.attribute.toUpperCase() } }).then(res => {
                        console.log(res)
                        request.flash('success_message', 'Terhapus')
                        return response.redirect('/admin/tambah-mapel?attribute=all')
                    }).catch(err => console.log(err))
                } else {
                    let selected
                    let valJurusan = { nama: '', kode: '', jurusan: '' }
                    if( request.query.attribute == 'all' ) {
                        selected = 'all'
                    }
                    if( request.query.attribute != 'all' ) {
                        selected = ''
                    }
                    Jurusan.findAll().then(jurusan => {
                        Mapel.findAll().then(res => {
                            res.forEach(x => {
                                if( request.query.attribute.toUpperCase() == x.toJSON().kode.toUpperCase() ) {
                                    selected = `${request.query.attribute.toUpperCase()}`
                                    valJurusan.kode = x.toJSON().kode
                                    valJurusan.nama = x.toJSON().nama
                                    valJurusan.jurusan = x.toJSON().jurusan
                                } 
                            })
                            response.render('admin/tambah-mapel', { data: res , selected, valJurusan, jurusan })
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
            },
            tambahKelas: (request, response) => {
                if( typeof request.query.del != 'undefined' ) {
                    Kelas.destroy({ where: { id: parseInt(request.query.attribute) } }).then(res => {
                        console.log(res)
                        request.flash('success_message', 'Terhapus')
                        return response.redirect('/admin/tambah-kelas?attribute=all')
                    }).catch(err => console.log(err))
                } else {
                    let selected
                    let valJurusan = { kelas: '', tingkat: '', jurusan: '' }
                    if( request.query.attribute == 'all' ) {
                        selected = 'all'
                    }
                    if( request.query.attribute != 'all' ) {
                        selected = ''
                    }
                    Jurusan.findAll().then(jurusan => {
                        Kelas.findAll().then(res => {
                            res.forEach(x => {
                                if( request.query.attribute.toUpperCase() == x.toJSON().tingkat.toUpperCase() ) {
                                    // selected = `${request.query.attribute.toUpperCase()}`
                                    valJurusan.tingkat = x.toJSON().tingkat
                                    valJurusan.kelas = x.toJSON().kelas
                                } 
                            })
                            response.render('admin/tambah-kelas', { data: res , selected, valJurusan, jurusan })
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
            },
            editAdmin: (request, response) => {
                Admin.findOne({ where: { id: request.user.id } }).then(res => {
                    if( res ) {
                        if( request.query.role == 'name' ) {
                            Admin.update({ nama: request.query.value }, { where: { id: '1201081230' } }).then(res => {
                                if( res ) {
                                    response.redirect('/admin/tambah-jurusan?attribute=all')
                                } else {
                                    response.redirect('/log/out')
                                }
                            }).catch(err => console.log(err))
                        }
                        if( request.query.role == 'password' ) {
                            Admin.update({ password: request.query.value }, { where: { id: '1201081230' } }).then(res => {
                                if( res ) {
                                    response.redirect('/admin/tambah-jurusan?attribute=all')
                                } else {
                                    response.redirect('/log/out')
                                }
                            }).catch(err => console.log(err))
                        }
                        if( request.query.role == 'userkey' ) {
                            Admin.update({ userKey: request.query.value }, { where: { id: '1201081230' } }).then(res => {
                                if( res ) {
                                    response.redirect('/admin/tambah-jurusan?attribute=all')
                                } else {
                                    response.redirect('/log/out')
                                }
                            }).catch(err => console.log(err))
                        } else {
                            response.redirect('/error')
                        }
                    }
                }).catch(err => console.log(err))
            },
            nilai: (request, response) => {
                Siswa.findAll().then(res0 => {
                    Mapel.findAll().then(res1 => {
                        Jadwal.findAll().then(res2 => {
                            Nilai.findAll().then(res3 => {
                                response.render('admin/data-guru', { res1, res2, res3, res0 })
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }).catch(err => console.log(err))
            }
        }

        this.postPage = {
            tambahJurusan: (request, response) => {
                let id = 0
                let selected = request.query.attribute
                request.body.kode = request.body.kode.replace(/[^a-zA-Z0-9 ]/g, "-")
                request.body.kode = request.body.kode.replace(/\s/g, "-")
                request.body.nama = request.body.nama.replace(/[^a-zA-Z0-9 ]/g, "")
                if( typeof selected != 'undefined' )selected = request.query.attribute.toUpperCase()

                if( request.body.nama == '' || request.body.kode == '' ) {
                    request.flash('error_message', 'Isi data')
                    return response.redirect('/admin/tambah-jurusan?attribute=all')
                }
                if( request.query.attribute == 'all' ) {
                    return Jurusan.findAll().then(res => {
                        if( res.length > 0 ) id = res[res.length - 1].toJSON().id + 1
                        Jurusan.findOne({ where: { nama: request.body.nama } }).then(res => {
                            if( res ) request.flash('warning_message', 'Nama jurusan telah digunakan')
                            Jurusan.findOne({ where: { kode: request.body.kode } }).then(res => {
                                if( res ) {
                                    request.flash('warning_message', '')
                                    request.flash('error_message', 'Kode jurusan telah digunakan')
                                    return response.redirect('/admin/tambah-jurusan?attribute=all')
                                } else {
                                    Jurusan.create({ id, nama: request.body.nama, kode: request.body.kode }).then(res => {
                                        request.flash('success_message', 'Tersimpan')
                                        return response.redirect('/admin/tambah-jurusan?attribute=all')
                                    }).catch(err => console.log(err))
                                }
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                Jurusan.update({ nama: request.body.nama, kode: request.body.kode }, { where: { kode: selected } }).then(res => {
                    if( res >= 1 ) {
                        request.flash('success_message', 'Terupdate')
                        return response.redirect('/admin/tambah-jurusan?attribute=all')
                    } else {
                        request.flash('error_message', 'Kesalahan pada parameter')
                        return response.redirect('/admin/tambah-jurusan?attribute=all')
                    }
                }).catch(err => console.log(err))
            },
            tambahMapel: (request, response) => {
                let id = 0
                let selected = request.query.attribute
                request.body.kode = request.body.kode.replace(/[^a-zA-Z0-9 ]/g, "-")
                request.body.kode = request.body.kode.replace(/\s/g, "-")
                request.body.nama = request.body.nama.replace(/[^a-zA-Z0-9 ]/g, "")
                if( typeof selected != 'undefined' ) selected = request.query.attribute.toUpperCase()

                if( request.body.nama == '' || request.body.kode == '' || request.body.kelas == "" ) {
                    request.flash('error_message', 'Isi data')
                    return response.redirect('/admin/tambah-mapel?attribute=all')
                }
                if( request.query.attribute == 'all' ) {
                    return Mapel.findAll().then(res => {
                        if( res.length > 0 ) id = res[res.length - 1].toJSON().id + 1
                        Mapel.findOne({ where: { nama: request.body.nama } }).then(res => {
                            if( res ) request.flash('warning_message', 'Nama mapel telah digunakan')
                            Mapel.findOne({ where: { kode: request.body.kode } }).then(res => {
                                if( res ) {
                                    request.flash('warning_message', '')
                                    request.flash('error_message', 'Kode mapel telah digunakan')
                                    return response.redirect('/admin/tambah-mapel?attribute=all')
                                } else {
                                    Mapel.create({ id, nama: request.body.nama, kode: request.body.kode, jurusan: request.body.jurusan }).then(res => {
                                        request.flash('success_message', 'Tersimpan')
                                        return response.redirect('/admin/tambah-mapel?attribute=all')
                                    }).catch(err => console.log(err))
                                }
                            }).catch(err => console.log(err))
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                Mapel.update({ nama: request.body.nama, kode: request.body.kode, jurusan: request.body.jurusan }, { where: { kode: selected } }).then(res => {
                    if( res >= 1 ) {
                        request.flash('success_message', 'Terupdate')
                        return response.redirect('/admin/tambah-mapel?attribute=all')
                    } else {
                        request.flash('error_message', 'Kesalahan pada parameter')
                        return response.redirect('/admin/tambah-mapel?attribute=all')
                    }
                }).catch(err => console.log(err))
            },
            tambahKelas: (request, response) => {
                let id = 0
                let selected = request.query.attribute
                request.body.kelas = request.body.kelas.replace(/[^a-zA-Z0-9 ]/g, "")
                request.body.tingkat = request.body.tingkat.replace(/[^a-zA-Z0-9 ]/g, "")
                request.body.jurusan = request.body.jurusan.replace(/[^a-zA-Z0-9 ]/g, "")
                if( typeof selected != 'undefined' ) selected = request.query.attribute.toUpperCase()

                if( request.query.attribute == 'all' ) {
                    if( request.body.kelas == '' || request.body.tingkat == '' || request.body.jurusan == "" ) {
                        request.flash('error_message', 'Isi data')
                        return response.redirect('/admin/tambah-kelas?attribute=all')
                    }
                    return Kelas.findAll().then(res => {
                        if( res.length > 0 ) id = res[res.length - 1].toJSON().id + 1
                        Kelas.findOne({ where: { tingkat: request.body.tingkat, jurusan: request.body.jurusan, kelas: request.body.kelas } }).then(res => {
                            if( res ) {
                                request.flash('error_message', 'Kelas sudah ada')
                                return response.redirect('/admin/tambah-kelas?attribute=all')
                            } else {
                                Kelas.create({ id, kelas: request.body.kelas, tingkat: request.body.tingkat, jurusan: request.body.jurusan }).then(res => {
                                    request.flash('success_message', 'Tersimpan')
                                    return response.redirect('/admin/tambah-kelas?attribute=all')
                                }).catch(err => console.log(err))
                            }
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                // Kelas.update({ kelas: request.body.kelas, tingkat: request.body.tingkat, jurusan: request.body.jurusan }, { where: { id: parseInt(selected) } }).then(res => {
                //     if( res >= 1 ) {
                //         request.flash('success_message', 'Terupdate')
                //         return response.redirect('/admin/tambah-kelas?attribute=all')
                //     } else {
                //         request.flash('error_message', 'Kesalahan pada parameter')
                //         return response.redirect('/admin/tambah-kelas?attribute=all')
                //     }
                // }).catch(err => console.log(err))
            }
        }
    }
}

export { Controller as admin }