-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jun 16, 2019 at 09:18 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tntnewsalphadb`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `acc_id` int(11) NOT NULL AUTO_INCREMENT,
  `acc_email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acc_permission` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acc_fullname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acc_pseudonym` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `acc_birthdate` datetime DEFAULT NULL,
  `acc_hpw` char(60) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`acc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`acc_id`, `acc_email`, `acc_permission`, `acc_fullname`, `acc_pseudonym`, `acc_birthdate`, `acc_hpw`) VALUES
(0, 'nap@nap.nap', 'none', 'Không tồn tại', 'Không tồn tại', '2019-06-08 01:04:13', NULL),
(1, 'admin@tntnews.com', 'admin', 'Admin', 'admin', '2019-06-02 15:12:00', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(2, 'nhateditor@tntnews.com', 'editor', 'Minh Nhật', 'nhateditor', '2019-05-26 16:15:01', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(3, 'toieditor@tntnews.com', 'editor', 'Hồng Tới', 'toieditor', '2019-05-27 06:05:51', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(4, 'trieditor@tntnews.com', 'editor', 'Thanh Trí', 'trieditor', '2019-05-31 14:59:08', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(5, 'demo@tntnews.com', 'writer', 'Đê Mô', 'demowriter', '2019-06-05 12:15:31', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(6, 'vanphong@tntnews.com', 'subscriber', 'Văn Phong', 'vanphong123', '2019-06-07 08:18:11', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(7, 'gsxoay@gmail.com', 'writer', 'Giáo Sư Xoay', 'giaosuxoay', '2019-08-05 12:15:31', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(8, 'hoangphongbkb@gmail.com', 'writer', 'Hoàng Phong', 'hoangphong', '2019-01-05 12:15:31', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(9, 'trungmm@gmail.com', 'writer', 'Minh Trung', 'minhtrung', '2019-06-05 12:23:38', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(10, 'thanhan1930@gmail.com', 'writer', 'Giáo Sư Xoay', 'thanhan', '2019-07-05 12:15:31', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(11, 'hoaittt@gmail.com', 'writer', 'Hoài Thương', 'thuonghoai', '2019-02-05 16:15:00', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(12, 'baka@gmail.com', 'writer', 'Khá Bảnh', 'bakha', '2019-10-05 11:11:11', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(13, 'bakavip@gmail.com', 'subscriber', 'Vip Quá', NULL, '2019-10-05 11:11:11', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(14, 'kenjikitano1b57e@gmail.com', 'subscriber', 'Kenji Kitano', '', '2019-06-27 00:00:00', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(15, 'avc@gmail.com', 'subscriber', 'hgwg', '', '2019-06-13 00:00:00', '$2a$10$J2ngD6m2sTLQoRs8j79GkOWqosp9wHZrdqyn9kV8KAJqwkRRKx416'),
(16, 'newsub@gmail.com', 'subscriber', 'Nhật', '', '2009-07-17 00:00:00', '[object Promise]'),
(17, 'newsub2@gmail.com', 'subscriber', 'Nhật', '', '2009-07-17 00:00:00', '[object Promise]'),
(18, 'newsub3@gmail.com', 'subscriber', 'nhat ', '', '2009-07-17 00:00:00', '$2b$10$nnH8S87jDZzviyvzoF.3UuIuxZWmW9W8nQa1ufKRiBfFQYdfWU1pu');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_class` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_parent` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `category_class`, `category_parent`) VALUES
(0, 'Không chuyên mục', 'cat_blue', 0),
(1, 'Thời sự', 'cat_red', 0),
(2, 'Pháp luật', 'cat_green', 0),
(3, 'Thế giới', 'cat_orange', 0),
(4, 'Kinh doanh', 'cat_pink', 0),
(5, 'Công nghệ', 'cat_blue', 0),
(6, 'Thể thao', 'cat_violet', 0),
(7, 'Chính trị', 'cat_red', 1),
(8, 'Giao thông', 'cat_red', 1),
(9, 'Pháp đình', 'cat_green', 2),
(10, 'Vụ án', 'cat_green', 2),
(11, 'Quân sự', 'cat_orange', 3),
(12, 'Tư liệu', 'cat_orange', 3),
(13, 'Bất động sản', 'cat_pink', 4),
(14, 'Hàng không', 'cat_pink', 4),
(15, 'Mobile', 'cat_blue', 5),
(16, 'Internet', 'cat_blue', 5),
(17, 'Việt Nam', 'cat_violet', 6),
(18, 'Ngoại Hạng Anh', 'cat_violet', 6);

-- --------------------------------------------------------

--
-- Table structure for table `categoryeditor`
--

DROP TABLE IF EXISTS `categoryeditor`;
CREATE TABLE IF NOT EXISTS `categoryeditor` (
  `categoryeditor_category` int(11) NOT NULL,
  `categoryeditor_editor` int(11) NOT NULL,
  PRIMARY KEY (`categoryeditor_category`,`categoryeditor_editor`),
  KEY `categoryeditor_editor` (`categoryeditor_editor`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categoryeditor`
--

INSERT INTO `categoryeditor` (`categoryeditor_category`, `categoryeditor_editor`) VALUES
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `post_type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_status` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_category` int(11) DEFAULT NULL,
  `post_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_time` datetime DEFAULT NULL,
  `post_writer` int(11) DEFAULT NULL,
  `post_editor` int(11) DEFAULT NULL,
  `post_thumbnail` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_bigthumbnail` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_summary` tinytext COLLATE utf8mb4_unicode_ci,
  `post_viewcount` int(11) DEFAULT NULL,
  `post_content` text COLLATE utf8mb4_unicode_ci,
  `post_denyreason` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `post_writer` (`post_writer`),
  KEY `post_editor` (`post_editor`),
  KEY `post_category` (`post_category`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `post_type`, `post_status`, `post_category`, `post_title`, `post_time`, `post_writer`, `post_editor`, `post_thumbnail`, `post_bigthumbnail`, `post_summary`, `post_viewcount`, `post_content`, `post_denyreason`) VALUES
(1, 'standard', 'wait', 7, 'Bà Nguyễn Thị Quyết Tâm ngạc nhiên trước ứng xử của ông Đoàn Ngọc Hải', '2019-06-16 15:29:06', 5, 0, 'img/thumbnail/small/1.jpg', 'img/thumbnail/large/1.jpg', 'Nguyên Chủ tịch HĐND TP.HCM Nguyễn Thị Quyết Tâm cho biết bà rất ngạc nhiên trước cách ứng xử của ông Đoàn Ngọc Hải khi vừa được bổ nhiệm đã từ chức.', 100, '', 'Bị từ chối bởi Admin'),
(2, 'standard', 'deny', 1, '21 người hoảng loạn khi mắc kẹt trong thang máy ở Sài Gòn', '2019-06-05 05:24:17', 7, 2, 'img/thumbnail/small/2.jpg', 'img/thumbnail/large/2.jpg', '21 người đi thang máy bị mắc kẹt bên trong hơn 20 phút ở một cao ốc trên đường Lê Duẩn, quận 1 (TP.HCM). Lực lượng cứu hộ phải phá cửa thang máy, đưa mọi người ra ngoài.', 50, NULL, 'Tiêu đề chưa hợp lý'),
(3, 'standard', 'publish', 8, 'Nữ tài xế xe máy bị ôtô tải kéo lê ở vòng xoay', '2019-06-03 14:29:30', 5, 3, 'img/thumbnail/small/3.jpg', 'img/thumbnail/large/3.jpg', NULL, NULL, NULL, NULL),
(4, 'premium', 'publish', 2, 'Cầm lái BMW có khả năng rất cao phạm luật giao thông?', '2019-06-02 10:19:23', 5, 3, 'img/thumbnail/small/4.jpg', 'img/thumbnail/large/4.jpg', 'Tỉ lệ tài xế BMW phạm luật tại Anh rất cao, thậm chí gấp nhiều lần người đi xe KIA.', 20, NULL, NULL),
(5, 'standard', 'publish', 3, 'Gặp nữ hoàng Anh, \'đệ nhất phu nhân\' sắc sảo nhất cũng lo lắng', '2019-06-21 07:19:23', 11, 3, 'img/thumbnail/small/5.jpg', 'img/thumbnail/large/5.jpg', 'Việc tiếp kiến Nữ hoàng Anh tạo ra rất nhiều áp lực cho Đệ nhất phu nhân Melania Trump và đội ngũ Nhà Trắng để đảm bảo tôn trọng truyền thống và văn hóa lâu đời của nước chủ nhà.', 85, NULL, NULL),
(6, 'premium', 'publish', 3, 'Mỹ dọa đánh thuế Mexico, nhưng hàng Trung Quốc \'trúng đòn\'', '2019-06-16 15:22:55', 12, 3, 'img/thumbnail/small/6.jpg', 'img/thumbnail/large/6.jpg', 'Chiến tranh thương mại khiến các nhà máy chuyển từ TQ sang Mexico tránh thuế. Tuy nhiên, việc Mỹ dọa đánh thuế Mexico vì vấn đề nhập cư có thể chặn \"đường vòng\" đó của TQ.', 85, '<p>ewpfjoiwej</p>\r\n<p>&egrave;wpwefoewpoijewoifjoewifjwe</p>\r\n<p>ewpofkewpofewpofkepokwpoekpoewkfwef</p>\r\n<p>ưefpoewjpewjpowefjpowefjpeowjfpoew</p>\r\n<p>&nbsp;</p>', 'Bị từ chối bởi Admin'),
(7, 'premium', 'publish', 4, 'Mỹ tự tin về nguồn cung đất hiếm sau khi Trung Quốc đe dọa', '2019-06-01 16:31:37', 12, 3, 'img/thumbnail/small/7.jpg', 'img/thumbnail/large/7.jpg', 'Bộ trưởng Thương mại Wilbur Ross cho biết Mỹ sẽ thực hiện các bước cần thiết để đảm bảo không bị cắt đứt nguồn cung đất hiếm, loại nguyên liệu được xem là \"vũ khí\" của Trung Quốc.', 135, NULL, NULL),
(8, 'standard', 'publish', 15, 'iOS 13 hay thật, nhưng đừng vội nâng cấp', '2019-06-04 10:23:22', 8, 3, 'img/thumbnail/small/8.jpg', 'img/thumbnail/large/8.jpg', 'Nhiều người dùng cho biết sau khi nâng cấp iOS 13 beta, iPhone của họ thường xuyên mất kết nối Wi-Fi, hiệu năng giảm và gặp hiện tượng sụt pin bất thường.', 222, NULL, NULL),
(9, 'standard', 'publish', 5, 'Đế màn hình giá nghìn USD của Apple thành trò cười trên mạng', '2019-06-10 13:31:28', 10, 3, 'img/thumbnail/small/9.jpg', 'img/thumbnail/large/9.jpg', 'Nhiều người hài hước cho rằng iOS 13 còn không được dân mạng quan tâm bằng chiếc chân đế có giá 1.000 USD cho màn hình Pro Display XDR.', 305, NULL, NULL),
(10, 'premium', 'publish', 3, 'Tiêm kích Nga bay cắt mặt máy bay do thám Mỹ trên Địa Trung Hải', '2019-06-10 13:31:28', 11, 3, 'img/thumbnail/small/10.jpg', 'img/thumbnail/large/10.jpg', 'Hải quân Mỹ tố tiêm kích Su-35 của Nga bay cắt mặt không an toàn, gây nguy hiểm cho máy bay P-8 của Mỹ trên không phận quốc tế ở Địa Trung Hải.', 90, NULL, NULL),
(11, 'standard', 'publish', 6, 'Thắng Ấn Độ 3-1, Curacao lọt vào chung kết King\'s Cup', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/11.jpg', 'img/thumbnail/large/11.jpg', 'Curacao tỏ ra quá mạnh so với ĐT Ấn Độ trong trận đấu diễn ra vào lúc 15h30 ngày 5/6. Đại diện của khu vực CONCACAF dễ dàng giành chiến thắng và lọt vào trận chung kết King\'s Cup.', 190, NULL, NULL),
(12, 'standard', 'publish', 8, 'Bộ trưởng Thể né trả lời, đường sắt Cát Linh chưa biết ngày vận hành', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/12.jpg', 'img/thumbnail/large/12.jpg', 'Đại biểu Quốc hội hơn một lần truy vấn về thời hạn vận hành thương mại đường sắt Cát Linh - Hà Đông nhưng Bộ trưởng Nguyễn Văn Thể không đưa ra được mốc thời gian cụ thể nào.', 190, NULL, NULL),
(13, 'standard', 'publish', 1, 'Cả trăm người tìm thanh niên ngáo đá nhảy xuống vực ở Đà Nẵng', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/13.jpg', 'img/thumbnail/large/13.jpg', 'Nam thanh niên ngáo đá bỏ xe máy nhảy xuống vực trước chùa Linh Ứng (Đà Nẵng) khiến cả trăm người thuộc nhiều lực lượng vất vả tìm kiếm.', 190, NULL, NULL),
(14, 'standard', 'publish', 14, 'Bộ trưởng Bộ GTVT: \'Vietnam Airlines bị hãng khác lôi kéo nhân lực\'', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/14.jpg', 'img/thumbnail/large/14.jpg', '\"Hiện nay có tình trạng những hãng hàng không mới bỏ kinh phí ra để lôi kéo nhân lực của các hãng khác, trong đó có Hãng hàng không Quốc gia Việt Nam\", Bộ trưởng GTVT khẳng định.', 290, NULL, NULL),
(15, 'standard', 'publish', 13, 'Người giàu nhất hành tinh mua 3 căn hộ giá 80 triệu USD', '2019-06-07 05:12:24', 7, 3, 'img/thumbnail/small/15.jpg', 'img/thumbnail/large/15.jpg', 'Tỷ phú Jeff Bezos - người sáng lập tập đoàn Amazon - đang thỏa thuận để mua tổ hợp 3 căn hộ trong một tòa nhà ở Manhattan, thành phố New York (Mỹ) với giá 80 triệu USD.', 90, NULL, NULL),
(16, 'standard', 'publish', 4, '\'Việt Nam có nên xây công trình tâm linh rộng hàng trăm ha hay không?\'', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/16.jpg', 'img/thumbnail/large/16.jpg', 'Nhiều đại biểu Quốc hội chất vấn Bộ trưởng Xây dựng Phạm Hồng Hà về việc có nên quy hoạch xây dựng các công trình tâm linh rộng hàng trăm ha hay không.', 123, NULL, NULL),
(17, 'standard', 'publish', 2, 'Hai cán bộ ngân hàng lập hồ sơ khống chiếm đoạt hơn 50 tỷ', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/17.jpg', 'img/thumbnail/large/17.jpg', 'Lợi dụng là cán bộ ngân hàng BIDV, Huy và Cường làm giả hàng chục hồ sơ khống để thế chấp và rút hơn 50 tỷ của nhà băng.', 123, NULL, NULL),
(18, 'standard', 'publish', 2, 'Vụ gian lận thi cử ở Hà Giang: Có thí sinh được nâng 29,95 điểm', '2019-06-16 15:53:06', 7, 3, 'img/thumbnail/small/18.jpg', 'img/thumbnail/large/18.jpg', 'Công an xác định kỳ thi THPT 2018 có thí sinh ở Hà Giang được nâng 29,95 điểm. Con của một lãnh đạo Sở GD&ĐT tỉnh này được nâng 13,3 điểm.', 322, '', 'Bị từ chối bởi Admin'),
(19, 'standard', 'wait', 2, 'Vì sao Bộ Công an điều tra vụ nâng điểm thi ở Hòa Bình?', '2019-06-05 13:31:28', 6, 3, 'img/thumbnail/small/19.jpg', 'img/thumbnail/large/19.jpg', 'Bộ trưởng Tô Lâm giải thích hành vi nâng điểm thi THPT là thủ đoạn mới, trước đề nghị của tỉnh Hòa Bình, Cơ quan an ninh điều tra của Bộ Công an đã thụ lý vụ án này.', 133, NULL, NULL),
(20, 'standard', 'publish', 2, 'Vụ nâng điểm ở Sơn La: Cảnh cáo Phó chủ tịch tỉnh Phạm Văn Thủy', '2019-06-10 13:31:28', 7, 3, 'img/thumbnail/small/20.jpg', 'img/thumbnail/large/20.jpg', 'Trước những vi phạm tại kỳ thi THPT 2018 ở Sơn La, Ủy ban Kiểm tra Trung ương quyết định thi hành kỷ luật bằng hình thức cảnh cáo Phó chủ tịch UBND tỉnh Phạm Văn Thủy.', 183, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `postcomment`
--

DROP TABLE IF EXISTS `postcomment`;
CREATE TABLE IF NOT EXISTS `postcomment` (
  `cmt_id` int(11) NOT NULL AUTO_INCREMENT,
  `cmt_post` int(11) DEFAULT NULL,
  `cmt_account` int(11) DEFAULT NULL,
  `cmt_content` tinytext COLLATE utf8mb4_unicode_ci,
  `cmt_time` datetime NOT NULL,
  PRIMARY KEY (`cmt_id`),
  KEY `cmt_account` (`cmt_account`),
  KEY `cmt_post` (`cmt_post`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `postcomment`
--

INSERT INTO `postcomment` (`cmt_id`, `cmt_post`, `cmt_account`, `cmt_content`, `cmt_time`) VALUES
(2, 16, 6, 'Việt Nam không nên xây dựng \"Chùa Ba Vàng\"', '2019-06-16 08:23:18'),
(3, 16, 10, 'Việt Nam không nên xây dựng \"Chùa Ba Vàng\"', '2019-06-16 04:23:18'),
(4, 16, 4, 'Việt Nam không nên xây dựng \"Chùa Ba Vàng\"', '2019-06-16 04:23:18'),
(5, 16, 6, 'safoifjqwoi foijfoiwejf', '2019-06-16 11:41:24'),
(6, 16, 6, 'Viet nam nen xây dựng chừ \"oogjwegogij\"', '2019-06-16 11:41:39');

-- --------------------------------------------------------

--
-- Table structure for table `posttag`
--

DROP TABLE IF EXISTS `posttag`;
CREATE TABLE IF NOT EXISTS `posttag` (
  `posttag_post` int(11) NOT NULL,
  `posttag_tag` int(11) NOT NULL,
  PRIMARY KEY (`posttag_post`,`posttag_tag`),
  KEY `posttag_tag` (`posttag_tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posttag`
--

INSERT INTO `posttag` (`posttag_post`, `posttag_tag`) VALUES
(1, 1),
(5, 20),
(17, 20),
(10, 27),
(3, 45),
(3, 55),
(3, 74),
(15, 74),
(6, 78),
(6, 79),
(6, 98);

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
CREATE TABLE IF NOT EXISTS `subscription` (
  `sub_accid` int(11) NOT NULL,
  `sub_time` datetime DEFAULT NULL,
  PRIMARY KEY (`sub_accid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`sub_accid`, `sub_time`) VALUES
(13, '2019-06-11 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
  `tag_id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `tag_name` (`tag_name`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=COMPACT;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`tag_id`, `tag_name`) VALUES
(109, '1243432423'),
(80, '737 MAX'),
(35, 'Amazon'),
(83, 'Apple'),
(75, 'Avengers'),
(76, 'Avengers Project'),
(89, 'Ba bà cháu bị sát hại'),
(48, 'bài hát bị chê dở của justin bieber lập kỷ lục'),
(29, 'bầu cử năm 2016'),
(74, 'Bộ trưởng Quốc phòng Mỹ'),
(79, 'Boeing'),
(78, 'Boeing 737 MAX'),
(8, 'Cát Linh-Hà Đông'),
(13, 'cầu lông'),
(61, 'chế độ làm việc'),
(55, 'Chế Lan Viên'),
(22, 'chiến tranh công nghệ'),
(20, 'Chiến tranh công nghệ sẽ kết liễu nhiều công ty TQ'),
(23, 'chiến tranh thương mại'),
(6, 'chính phủ'),
(42, 'chống độc quyền'),
(45, 'Chris Hemsworth'),
(44, 'Chris Hemsworth điển trai'),
(64, 'cổ phần hoá'),
(24, 'cựu tổng thống Barack Obama'),
(26, 'cựu tổng thống Mỹ'),
(25, 'Donald Trump'),
(27, 'Donald Trump đắc cử'),
(71, 'Đài Loan'),
(3, 'điện gió'),
(2, 'điện mặt trời'),
(46, 'điển trai'),
(34, 'điều tra chống độc quyền'),
(53, 'đỉnh cao thả thính'),
(85, 'Đường lên đỉnh Olympia'),
(87, 'Đường lên đỉnh Olympia 2/6'),
(7, 'đường sắt Cát Linh-Hà Đông'),
(9, 'đường sắt đô thị'),
(50, 'Ed Sheeran'),
(36, 'Facebook'),
(16, 'Game of Thrones'),
(11, 'giải cầu lông vô địch châu Á'),
(33, 'gian lận điểm thi'),
(90, 'giết người'),
(37, 'Google'),
(58, 'Google đối xử với nhân viên tệ'),
(56, 'Hàn Mặc Tử'),
(28, 'Hillary Clinton'),
(31, 'Hoà Bình'),
(21, 'Huawei'),
(84, 'ios 13'),
(38, 'Jeff Bezos'),
(49, 'Justin Bieber'),
(92, 'Lâm Đồng'),
(40, 'Larry Page'),
(81, 'lỗi 737 MAX'),
(39, 'Mark Zuckerberg'),
(77, 'Marvel'),
(57, 'Môi trường làm việc của Google tệ'),
(69, 'Mỹ'),
(15, 'Mỹ nhân Game of Thrones'),
(30, 'Nâng điểm thi ở Hoà Bình'),
(32, 'nâng điểm thi THPT'),
(4, 'năng lượng tái tạo'),
(91, 'Nghiêm Thị Nhi'),
(12, 'Nguyễn Tiến Minh'),
(86, 'Nguyễn Trọng Khải'),
(51, 'Nhà thơ thả thính'),
(60, 'nhân viên'),
(1, 'Ninh Thuận'),
(63, 'Quốc Hội'),
(19, 'quyến rũ'),
(41, 'Sergey Brin'),
(73, 'Singapore'),
(67, 'Son Heung-min'),
(65, 'Son Heung-min làm rạng danh châu Á'),
(17, 'Sophie Turner'),
(43, 'tài sản'),
(52, 'thả thính'),
(47, 'Thor'),
(88, 'THPT chuyên Nguyễn Huệ Hà Nội'),
(10, 'Tiến Minh lần đầu vào bán kết châu Á'),
(14, 'Tiến Minh vs Chen Long'),
(82, 'tính năng ios 13'),
(66, 'Tottenham'),
(5, 'trang trại năng lượng'),
(70, 'Triều Tiên'),
(72, 'Trung Quốc'),
(68, 'trung quốc gây bất ổn châu Á'),
(62, 'Vinalines'),
(98, 'wheihfw eowiejoiejff'),
(18, 'xinh đẹp'),
(54, 'Xuân Diệu'),
(59, 'Youtube');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post` ADD FULLTEXT KEY `post_title` (`post_title`,`post_summary`,`post_content`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `POST_ibfk_1` FOREIGN KEY (`post_writer`) REFERENCES `account` (`acc_id`),
  ADD CONSTRAINT `POST_ibfk_2` FOREIGN KEY (`post_editor`) REFERENCES `account` (`acc_id`),
  ADD CONSTRAINT `POST_ibfk_3` FOREIGN KEY (`post_category`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `postcomment`
--
ALTER TABLE `postcomment`
  ADD CONSTRAINT `POSTCOMMENT_ibfk_1` FOREIGN KEY (`cmt_account`) REFERENCES `account` (`acc_id`),
  ADD CONSTRAINT `POSTCOMMENT_ibfk_2` FOREIGN KEY (`cmt_post`) REFERENCES `post` (`post_id`);

--
-- Constraints for table `posttag`
--
ALTER TABLE `posttag`
  ADD CONSTRAINT `POSTTAG_ibfk_1` FOREIGN KEY (`posttag_post`) REFERENCES `post` (`post_id`),
  ADD CONSTRAINT `POSTTAG_ibfk_2` FOREIGN KEY (`posttag_tag`) REFERENCES `tag` (`tag_id`);

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `SUBSCRIPTION_ibfk_1` FOREIGN KEY (`sub_accid`) REFERENCES `account` (`acc_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
