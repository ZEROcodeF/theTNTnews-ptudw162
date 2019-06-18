var db = require('../utils/db');

module.exports = {
  categoryByName: name =>{
    return db.load(`select * from category where category_name = ${name}`);
  },
  categoryInfoList: (limit, offset) =>{
    return db.load(`select c.category_id, c.category_name, c.category_parent, c2.category_name as category_parentname from category c join category c2 on c.category_parent = c2.category_id where c.category_id !=0 limit ${limit} offset ${offset}`);
  },

  categoryByParentId: parentId =>{
    return db.load(`select * from category where category_parent = ${parentId}`);
  },

  parentCategoryInfoList: () =>{
    return db.load(`select * from category where category_parent = 0`);
  },

  countCategoryInfoList: () =>{
    return db.load(`select count(c.category_id) as total from category c join category c2 on c.category_parent = c2.category_id where c.category_id !=0`);
  },

  getCatWithEditor: (catId,edtId)=>{
    return db.load(`select * from categoryeditor where categoryeditor_category = ${catId} and categoryeditor_editor = ${edtId}`);
  },

  getCateInChargeMapWithEditor: (edtId) =>{
    return db.load(`select * from category left join (select * from categoryeditor where categoryeditor_editor = ${edtId})ed on category_id = categoryeditor_category`);
  },

  deleteCateInChargeWithEditor: (edtId) =>{
    return db.delete('categoryeditor','categoryeditor_editor',edtId);
  },

  addCateInChargeWithEditor: (entity) =>{
    return db.add('categoryeditor',entity);
  },

  all: () => {
    return db.load(`select * from category`);
  },

  add: entity => {
    return db.add('category', entity);
  },

  add: entity => {
    return db.addIgnore('category', entity);
  },

  update: entity => {
    return db.update('category', 'category_id', entity);
  },

  delete: id => {
    return db.delete('category', 'category_id', id);
  }
};