var db = require('../utils/db');

module.exports = {
  accountSubscription: (accID) =>{
    return db.load(`select * from subscription where sub_accid = ${accID} and now() <= date_add(now(), interval 7 day)`);
  },

  accountByAccID: (accID) => {
    return db.load(`select * from account where acc_id=${accID}`);
  },

  accountInfoList: (limit, offset) =>{
    return db.load(`select acc_id, acc_email, acc_permission, acc_fullname, acc_pseudonym from account where acc_permission != 'admin' and acc_id != 0 limit ${limit} offset ${offset}`);
  },
  countAccountInfoList: () =>{
    return db.load(`select count(acc_id) as total from account where acc_permission != 'admin' and acc_id != 0`);
  },

  accountTypeList: (filterString,limit,offset) => {
    return db.load(`select acc_id, acc_email, acc_permission,acc_fullname, acc_pseudonym, sub_time from account left join subscription on acc_id = sub_accid where acc_id != 0 and acc_permission != 'admin' and (acc_permission = ${filterString}) limit ${limit} offset ${offset}`);
  },
  countAccountTypeList: (filterString) => {
    return db.load(`select count(*) as total from account where acc_id != 0 and (acc_permission = ${filterString})`);
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

  singleInfoById: (id) =>{
    return db.load(`select * from account where acc_id = ${id} and acc_permission != 'admin'`);
  },

  all: () => {
    return db.load(`select * from account`);
  },

  single:(accId) => {
    return db.load(`select * from account where acc_id = ${accId}`)
  },

  add: entity => {
    return db.add('account', entity);
  },

  update: entity => {
    return db.update('account', 'acc_id', entity);
  },

  updateEditorToNonPerson: editorId =>{
    return db.updateSelf('post','post_editor',editorId, 0);
  },

  updateWriterToNonPerson: writerId =>{
    return db.updateSelf('post','post_writer', writerId, 0);
  },

  delete: id => {
    return db.delete('account', 'acc_id', id);
  },

  addSubscription: (subid, subtime) => {
    return db.load(`insert into subscription set sub_accid=${subid}, sub_time='${subtime}' on duplicate key update sub_time = '${subtime}'`)
  },

  deleteSubscriptionById: uId => {
    return db.delete('subscription','sub_accid',uId);
  },

  delelteCommentById: uId => {
    return db.delete('postcomment','cmt_account',uId);
  },

  delelteCategoryEditorById: uId => {
    return db.delete('categoryeditor','categoryeditor_editor',uId);
  }

};