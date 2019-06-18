var moment = require('moment');
module.exports = {
    //Account Constants:
    MAX_LENGTH_ACCOUNT_EMAIL: 99,
    MAX_LENGTH_ACCOUNT_FULLNAME: 49,
    MAX_LENGTH_ACCOUNT_RAW_PASSWORD: 71, //according to bcrypt max length string to hash
    MIN_LENGTH_ACCOUNT_RAW_PASSWORD: 8,

    //Methods:
    accountStringsValidate: (strEmail, strPermission, strFullname, strBirthDate, strRawPassword) => {
        //Checking Email string
        var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (strEmail.length > this.MAX_LENGTH_ACCOUNT_EMAIL) { 
            return false; 
        } else {
            if(!emailRegex.test(strEmail))
            return false;
        }

        //Checking Permission string
        var permissionStrs = ['subscriber','admin','writer','editor'];
        if(permissionStrs.indexOf(strPermission)<0){
            return false;
        }

        //Checking Fullname String
        if(strFullname > this.MAX_LENGTH_ACCOUNT_FULLNAME || strFullname < 1){
            return false;
        }

        if(!(moment(strBirthDate,'DD/MM/YYYY').isValid())){
            return false;
        }

        if(strRawPassword > this.MAX_LENGTH_ACCOUNT_RAW_PASSWORD || strRawPassword < this.MIN_LENGTH_ACCOUNT_RAW_PASSWORD){
            return false;
        }

        return true;
    }
}