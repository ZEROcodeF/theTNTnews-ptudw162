var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load(`select * from category`);
  },

  add: entity => {
    return db.add('category', entity);
  },

  update: entity => {
    return db.update('category', 'CatID', entity);
  },

  delete: id => {
    return db.delete('category', 'CatID', id);
  }
};