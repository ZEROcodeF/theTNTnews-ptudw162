-- Select top 10 categories
select c2.category_id, sum(p2.post_viewcount) from `CATEGORY` c2 left join `POST` p2 on c2.category_id = p2.post_category group by category_id ORDER BY sum(p2.post_viewcount) DESC LIMIT 10

--Select latest post per category
select p.post_id from `POST` p where p.post_time = (select max(post_time) from `POST` p1 left join `CATEGORY` c on p1.post_category = c.category_id GROUP BY c.category_id) LIMIT 1
--Select top 10 categories with newest post
select p.post_id, p.post_title, c.category_class,max(post_time) from `POST` p left join (select c2.category_id, c2.category_class,sum(p2.post_viewcount) from `CATEGORY` c2 left join `POST` p2 on c2.category_id = p2.post_category group by category_id,category_class ORDER BY sum(p2.post_viewcount) DESC LIMIT 10) as c on p.post_category = c.category_id group by p.post_id, p.post_title,c.category_class