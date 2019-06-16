var db = require('../utils/db');

module.exports = {

  deleteAttachedTagById: id =>{
    return db.delete('posttag','posttag_tag', id);
  },

  findTagByName: name =>{
    return db.load(`select * from tag where tag_name = '${name}'`);
  },

  tagInfoList: (limit, offset) => {
    return db.load(`select tag_id, tag_name , count(posttag_post) as tag_count from tag left join posttag on tag_id = posttag_tag group by tag_id limit ${limit} offset ${offset}`)
  },

  countTagInfoList: () => {
    return db.load(`select count(tag_id) as total from tag`);
  },

  tagListByPostId: (postID) =>{
    return db.load(`select posttag_tag, tag_name from posttag join tag on tag_id = posttag_tag where posttag_post = ${postID}`);
  },

  all: () => {
    return db.load(`select * from tag`);
  },

  add: entity => {
    return db.add('tag', entity);
  },

  addIgnore: entity => {
    return db.addIgnore('tag', entity);
  },

  update: entity => {
    return db.update('tag', 'tag_id', entity);
  },

  delete: id => {
    return db.delete('tag', 'tag_id', id);
  }
};