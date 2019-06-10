var db = require('../utils/db');

module.exports = {
  tagInfoList: (limit, offset) =>{
    return db.load(`select tag_id, tag_name , count(posttag_post) as tag_count from tag left join posttag on tag_id = posttag_tag group by tag_id limit ${limit} offset ${offset}`)
},

  countTagInfoList: () =>{
    return db.load(`select count(tag_id) as total from tag`);
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