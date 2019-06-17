var db = require('../utils/db');

module.exports = {
    allCommentsByPostId: postId => {
        return db.load(`select cmt_content, cmt_time, acc_fullname as cmt_accountname from postcomment join account on cmt_account = acc_id where cmt_post = ${postId} order by cmt_time desc`);
    },

    all: () => {
        return db.load(`select * from postcomment`);
    },

    add: entity => {
        return db.add('postcomment', entity);
    },

    update: entity => {
        return db.update('postcomment', 'cmt_id', entity);
    },

    delete: id => {
        return db.delete('postcomment', 'cmt_id', id);
    },

    deleteByPostId: accid => {
        return db.delete('postcomment', 'cmt_account', accid);
    }
};