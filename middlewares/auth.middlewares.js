module.exports.admin = (res,req,next) =>{
    console.log('---Admin required for ');
    //console.log(res);
    next();
}

module.exports.editor = (res,req,next) =>{
    console.log('---EDITOR required for ');
    //console.log(res);
    next();
}

module.exports.writer = (res,req,next) =>{
    console.log('---WRITER required for ');
    //console.log(res);
    next();
}