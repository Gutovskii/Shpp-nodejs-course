const notAuthorized = (req, res, next) => {
    if (!req.session.userId) {
        return redirect('/LoginToDo/login.html')
    }
    return next()
}

module.exports = notAuthorized