var db = require('../utils/db');

module.exports = {
  categoryInfoList: (limit, offset) =>{
    return db.load(`select c.category_id, c.category_name, c2.category_name as category_parentname from category c join category c2 on c.category_parent = c2.category_id where c.category_id !=0 limit ${limit} offset ${offset}`);
  },

  countCategoryInfoList: () =>{
    return db.load(`select count(c.category_id) as total from category c join category c2 on c.category_parent = c2.category_id where c.category_id !=0`);
  },

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