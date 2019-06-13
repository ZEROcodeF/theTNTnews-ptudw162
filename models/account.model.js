var db = require('../utils/db');

module.exports = {
  accountSubscription: (accID) =>{
    return db.load(`select * from subscription where sub_accid = ${accID} and now() <= date_add(now(), interval 7 day)`);
  },

  accountInfoList: (limit, offset) =>{
    return db.load(`select acc_id, acc_email, acc_permission, acc_fullname, acc_pseudonym from account where acc_permission != 'admin' and acc_id != 0 limit ${limit} offset ${offset}`);
  },

  countAccountInfoList: () =>{
    return db.load(`select count(acc_id) as total from account where acc_permission != 'admin' and acc_id != 0`);
  },

  singleByEmail: (email) =>{
    return db.load(`select acc_id from account where acc_email = '${email}'`);
  },

  singleByPseudonym: (pseudonym) =>{
    return db.load(`select acc_id from account where acc_pseudonym = '${pseudonym}'`);
  },

  singleInfoByEmail: (email) => {
    return db.load(`select acc_id,acc_permission,acc_fullname, acc_hpw from account where acc_email = '${email}'`)
  },

  all: () => {
    return db.load(`select * from account`);
  },

  single:(accId) => {
    return db.load(`select * from account where acc_id = ${acc_id}`)
  },

  add: entity => {
    return db.add('account', entity);
  },

  update: entity => {
    return db.update('account', 'acc_id', entity);
  },

  delete: id => {
    return db.delete('category', 'CatID', id);
  }
};