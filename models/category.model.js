var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from CATEGORY');
  },

  single: id => {
    return db.load(`select * from CATEGORY where CatID = ${id}`);
  },

  add: entity => {
    return db.add('CATEGORY', entity);
  },

  update: entity => {
    return db.update('CATEGORY', 'CatID', entity);
  },

  delete: id => {
    return db.delete('CATEGORY', 'CatID', id);
  },
  getCatWithParentId: parentid => {
    return db.load(`select * from CATEGORY where category_parent = ${parentid}`);
  }
};