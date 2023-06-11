let auth = {
    ensureAuthenticated: (request, response, next) => {
        if( request.isAuthenticated() ) return next()
        request.flash('error_message', 'Masuk Akun Untuk Melihat')
        response.redirect('/log/in/set?role=user&key=nis')
    }
}
auth = auth.ensureAuthenticated

export { auth as authentication }