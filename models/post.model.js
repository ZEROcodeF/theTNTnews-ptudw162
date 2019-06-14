var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load(`select * from post`);
  },

  //GENERAL Models:
  singleEditPostById: postId =>{
    return db.load(`select post_id, post_type, post_status, post_category, post_title, post_time, post_writer, post_editor, post_thumbnail, post_bigthumbnail, post_summary, post_viewcount, post_content, post_denyreason, category_name, a1.acc_pseudonym as writer_name, a2.acc_fullname as editor_name from post join category on post_category = category_id join account a1 on post_writer = a1.acc_id join account a2 on post_editor = a2.acc_id where post_id = ${postId}`);
  },
  //END GENERAL Models
  
  //BEGIN For Homepage:
  //Featured Posts:  FOUR posts which have most viewed last week (exact 7 days from 'now')
  featuredPosts: () =>{
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_bigthumbnail, category_name, category_class from (select * from post where post_time between date_sub(now(), interval 7 day) and now()) p join category on p.post_category=category_id where post_status ='publish' and now() >=  post_time order by post_viewcount desc limit 4`);
  },

  //latestPosts: TEN posts which have latest publish time
  latestPosts: () => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, category_name, category_class from post join category on post_category = category_id where post_status = 'publish' and now() >=  post_time order by post_time desc limit 10`);
  },

  //mostViewPost: TEN post which have most 'viewcount' all time
  mostViewPost: () => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, category_name, category_class from post join category on post_category = category_id where post_status = 'publish' and now() >=  post_time order by post_viewcount desc limit 10`);
  },

  //postOfTopCategory: TEN post which latest in each top TEN categories 
  postOfTopCategory: () =>{
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, category_name, category_class from (select * from post inner join (select max(post_id) as maxpid from (select post_id,post_category,max(post_time) from post where post_status='publish' and now() >=  post_time group by post_category, post_id)mpd group by post_category)mpi on post_id = maxpid)p join (select category_id, category_name, category_class, sum(post_viewcount)as category_viewcount from category join post on category_id = post_category group by post_category order by category_viewcount desc limit 10)c on post_category = category_id`);
  },

  //END For Homepage.

  //Get publish post info: PARENT CATID accepted!
  fullInfoPublishPostByCat: (catId, limit, offset) => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, post_summary, category_name, category_class from post join category on post_category = category_id where post_status = 'publish' and now() >= post_time and (post_category = ${catId} or category_parent = ${catId}) order by post_time desc limit ${limit} offset ${offset}`);
  },

  fullInfoPublishPremiumPriorPostByCat: (catId, limit, offset) => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, post_summary, category_name, category_class from post join category on post_category = category_id where post_status = 'publish' and now() >= post_time and (post_category = ${catId} or category_parent = ${catId}) order by field(post_type, "premium") desc, post_time desc limit ${limit} offset ${offset}`);
  },

  countFullInfoPublishPostByCat: (catId) => {
    return db.load(`select count(post_id) as total from post join category on post_category = category_id where post_status = 'publish' and now() >= post_time and (post_category = ${catId} or category_parent = ${catId})`);
  },

  fullInfoPublishPostByTag: (tagId, limit, offset) => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, post_summary, category_name, category_class, tag_name from post join category on post_category = category_id join posttag on post_id = posttag_post join tag on tag_id = posttag_tag where post_status = 'publish' and now() >= post_time and posttag_tag = ${tagId} order by post_time desc limit ${limit} offset ${offset}`);
  },

  fullInfoPublishPremiumPriorPostByTag: (tagId, limit, offset) => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, post_summary, category_name, category_class, tag_name from post join category on post_category = category_id join posttag on post_id = posttag_post join tag on tag_id = posttag_tag where post_status = 'publish' and now() >= post_time and posttag_tag = ${tagId} order by field(post_type, "premium") desc, post_time desc limit ${limit} offset ${offset}`);
  },

  countFullInfoPublishPostByTag: (tagId) => {
    return db.load(`select count(post_id) as total from  post join category on post_category = category_id join posttag on post_id = posttag_post where post_status = 'publish' and now() >= post_time and posttag_tag = ${tagId}`);
  },

  //BEGIN Single page
  fullSinglePublishPost: postId =>{
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_bigthumbnail, post_content, category_name, category_class, category_parent, acc_pseudonym from (post join account on post_writer = acc_id) join category on post_category = category_id where post_status = 'publish' and now() >= post_time and post_id = ${postId}`);
  },

  sameCategoryPublishPosts: postId => {
    return db.load(`select post_id, post_type, post_category, post_title, post_time, post_thumbnail, category_name, category_class from post join category on post_category = category_id where post_category = (select post_category from post where post_id=${postId}) and post_id != ${postId} and post_status = 'publish' order by post_time desc limit 5`);
  },
  //END: Single page

  //BEGIN Writer: 
  writerPostList: (filterType, writerId,limit,offset) =>{
    return db.load(`select post_id, post_type, post_status, post_category, post_title, post_time, post_editor, post_thumbnail, post_summary, post_denyreason, category_name, acc_fullname as editor_name from (select * from post join account on post_editor = acc_id) as pa join category on post_category = category_id where post_writer = ${writerId} and (post_status = ${filterType}) order by post_time desc limit ${limit} offset ${offset}`);
  },

  countWriterPostList: (filterType, writerId) =>{
    return db.load(`select count(post_id) as 'total' from (select * from post join account on post_editor = acc_id) as pa join category on post_category = category_id where post_writer = ${writerId} and (post_status = ${filterType})`);
  },
  //END Writer.

  //BEGIN Editor:
  editorPostList: (editorId,limit,offset) =>{
    return db.load(`select post_id, post_type, post_status, post_category, post_title, post_time, post_writer, post_thumbnail, post_summary, category_name, acc_pseudonym as writer_pseudonym from (select * from post join account on post_writer = acc_id) as pa join category on post_category = category_id where post_status='wait' and post_category = (select category_id from category join categoryeditor on category_id = categoryeditor_category where categoryeditor_editor = ${editorId}) order by post_time desc limit ${limit} offset ${offset}`);
  },

  countEditorPostList: editorId =>{
    return db.load(`select count(post_id) as total from (select * from post join account on post_writer = acc_id) as pa join category on post_category = category_id where post_status='wait' and post_category = (select category_id from category join categoryeditor on category_id = categoryeditor_category where categoryeditor_editor = ${editorId})`);
  },
  //END Editor.

  //BEGIN Admin:
  adminPostList: (limit, offset) => {
    return db.load(`select post_id, post_type, post_status, post_category, post_title, post_time, post_writer, post_thumbnail, post_summary, category_name, a1.acc_pseudonym as writer_pseudonym, a2.acc_fullname as editor_name from post join account a1 on post_writer = a1.acc_id join account a2 on post_editor = a2.acc_id join category on post_category = category_id order by post_time desc limit ${limit} offset ${offset}`);
  },

  countAdminPostList: () => {
    return db.load(`select count(post_id) as total from post join account a1 on post_writer = a1.acc_id join account a2 on post_editor = a2.acc_id join category on post_category = category_id`);
  },

  //END Admin


  single: id => {
    return db.load(`select * from post where post_category = ${id}`);
  },

  add: entity => {
    return db.add('post', entity);
  },

  update: entity => {
    return db.update('post', 'post_id', entity);
  },

  delete: id => {
    return db.delete('post', 'post_id', id);
  },
};
