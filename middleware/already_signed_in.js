module.exports = () => {
    return function (req, res, next) {
        if (req.cookies.user_sid && req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
};