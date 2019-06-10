
module.exports.admin = (req, res, next) => {
    console.log('---Admin required for ');
    //console.log(res);
    next();
}

module.exports.editor = (req, res, next) => {
    console.log('---EDITOR required for ');
    //console.log(res);
    next();
}

module.exports.writer = (req, res, next) => {
    console.log('---WRITER required for ');
    //console.log(res);
    next();
}

module.exports.subscriber = (req, res, next) => {
    console.log('---SUBSCRIBER required for ');
    //console.log(res);
    next();
}

module.exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        res.locals.isAuthenticated = true;
        res.locals.authUser = req.user;
        console.log('isauth');
    }
    next();
}