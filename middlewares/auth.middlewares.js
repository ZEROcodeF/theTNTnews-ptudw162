module.exports.admin = (req,res,next) =>{
    console.log('---Admin required for ');
    console.log(req.user);
    next();
}

module.exports.editor = (req,res,next) =>{
    console.log('---EDITOR required for ');
    //console.log(res);
    next();
}

module.exports.writer = (req,res,next) =>{
    console.log('---WRITER required for ');
    //console.log(res);
    next();
}