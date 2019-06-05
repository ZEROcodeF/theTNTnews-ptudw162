var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from post');
  },

  allByCat: catId => {
    return db.load(`select * from post where post_category = ${catId}`);
  },

  pageByCat: (catId, limit, offset) => {
    return db.load(`select * from post where post_category = ${catId} limit ${limit} offset ${offset}`);
  },

  countByCat: catId => {
    return db.load(`select count(*) as total from post where post_category = ${catId}`);
  },

  single: id => {
    return db.load(`select * from post where post_category = ${id}`);
  },

  add: entity => {
    return db.add('post', entity);
  },

  update: entity => {
    return db.update('post', 'ProID', entity);
  },

  delete: id => {
    return db.delete('post', 'ProID', id);
  },
};
