import { Siswa } from "../models/Siswa.js"
import { Kelas } from "./../models/Kelas.js"

class Controller {
    constructor() {
        this.getPage = {
            dataSiswa: (request, response) => {
                Siswa.findAll().then(res => {
                    response.render('admin/data-siswa', { data: res })
                }).catch(err => console.log(err))
            },
            tambahSiswa: (request, response) => {
                Kelas.findAll().then(res => {
                    response.render('admin/form-data-siswa', { data: res, query: request.query })
                }).catch(err => console.log(err))
            }
        }

        this.postPage = {
            dataSiswa: (request, response) => {
                if( request.body.nama == '' || request.body.nis == '' ) {
                    request.flash('error_message', 'Isi semua data!')
                    return response.redirect('/admin/siswa/data?attribute=all')
                }

                Siswa.update({ nama: request.body.nama, nis: request.body.nis }, { where: { nis: request.query.nis } }).then(res => {
                    if( res ) {
                        request.flash('success_message', 'Tersimpan!')
                        return response.redirect('/admin/siswa/data?attribute=all')
                    } else{
                        request.flash('error_message', 'Kesalahan pada parameter!')
                        return response.redirect('/admin/siswa/data?attribute=all')
                    }
                }).catch(err => console.log(err))
            },
            tambahSiswa: (request, response) => {
                let [id, rb] = [0, request.body]
                let newSiswa, kelas
                console.log(request.query)

                if( request.query.manual == 'true' ) {
                    console.log(request.body)
                    if( rb.nama == '' || rb.nis == '' || rb.kelas == '' ) {
                        request.flash('error_message', 'Isi semua data!')
                        return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                    }
                    if( isNaN(rb.nis) == true ) {
                        request.flash('error_message', 'NIS harus berupa angka!')
                        return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                    }
                    kelas = rb.kelas.split('/')
                    Siswa.findAll().then(res => {
                        if( res.length > 0 ) id = res[res.length - 1].toJSON().id + 1
                        Siswa.findOne({ where: { nis: rb.nis } }).then(res => {
                            if( res ) {
                                request.flash('error_message', 'NIS telah digunakan!')
                                return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                            } else {
                                newSiswa = new Object({
                                    id, nama: rb.nama, nis: rb.nis, kelas: kelas[0], jurusan: kelas[1], kodeKelas: kelas[2], password: ''
                                })
                                Siswa.create(newSiswa).then(res => {
                                    console.log(res)
                                    request.flash('success_message', 'Tersimpan!')
                                    return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                                }).catch(err => console.log(err))
                            }
                        }).catch(err => console.log(err))
                    }).catch(err => console.log(err))
                }
                if( request.query.imp == 'true' ) {
                    if( rb.excel == '' ) {
                        request.flash('error_message', 'Isi semua data!')
                        return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                    }

                    rb.nama.forEach(x => {
                        if( x == '' ) {
                            request.flash('error_message', 'Isi semua data!')
                            return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                        }
                    })
                    rb.nis.forEach(x => {
                        if( x == '' ) {
                            request.flash('error_message', 'Isi semua data!')
                            return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                        }
                    })
                    rb.kelas.forEach(x => {
                        if( x == '' ) {
                            request.flash('error_message', 'Isi semua data!')
                            return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                        }
                    })

                    Siswa.findAll().then(res => {
                        if( res.length > 0 ) id = res[res.length - 1].toJSON().id
                        for( let i = 0; i < rb.nama.length; i++ ) {
                            kelas = rb.kelas[i].split(' ')
                            newSiswa = new Object({
                                id: id += 1, nama: rb.nama[i], nis: rb.nis[i], kelas: kelas[0], jurusan: kelas[1], kodeKelas: kelas[2], password: ''
                            })
                            console.log(newSiswa)
                            Siswa.create(newSiswa).then(res => {
                            }).catch(err => console.log(err))
                        }
                        request.flash('success_message', 'Tersimpan!')
                        return response.redirect('/admin/siswa/tambah?manual=true&imp=true')
                    }).catch(err => console.log(err))
                }
            }
        }
    }
}

export { Controller as adminA }