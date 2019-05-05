-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 03, 2019 lúc 05:20 PM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `webclb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `studentcode` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phonenumber` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `dateofbirth` date NOT NULL,
  `address` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `createdate` datetime NOT NULL,
  `is_block` tinyint(4) NOT NULL DEFAULT '0',
  `permision` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `admin`
--

INSERT INTO `admin` (`username`, `password`, `fullname`, `studentcode`, `class`, `email`, `phonenumber`, `dateofbirth`, `address`, `createdate`, `is_block`, `permision`) VALUES
('admin', '19981998', 'Nguyễn Đức Lộc', '16103100486', 'DHTIN10A5', 'hbeasy98@gmail.com', '0368006626', '1998-03-27', 'Quỳnh Long, Quỳnh Lưu, Nghệ An', '2019-04-19 12:10:20', 0, 1),
('leader01', '19981998', 'Trần Bình Minh', '16103100836', 'DHTIN10A8', 'tbminh1998@gmail.com', '0346464646', '1998-09-11', 'Quỳnh Lưu, Nghệ An', '2019-04-22 12:10:20', 0, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(10) NOT NULL,
  `title` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `creator` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_public` tinyint(4) DEFAULT '0',
  `createdate` datetime DEFAULT NULL,
  `updatedate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `creator`, `is_public`, `createdate`, `updatedate`) VALUES
(9, 'Thông báo đăng kí', 'Câu lạc bộ Tin học tuyển thành viên mới.\r\nNếu bạn muốn tham gia hãy liên hệ với ban quản trị hoặc tiến hành đăng ký. \r\n                ', 'admin', 1, '2019-04-21 22:57:56', '2019-04-21 22:57:56'),
(11, 'SESSION Trong PHP', 'Phương Pháp Cải Thiện Khả Năng Lập Trình\r\nPHƯƠNG PHÁP CẢI THIỆN KHẢ NĂNG LẬP TRÌNH\r\nRèn luyện lập trình cũng như học tập, rèn luyện bất kỳ môn học, lĩnh vực khác, ngoài nỗ lực của bản thân cũng cần có phương pháp khoa học cụ thể, có như vậy bạn mới dễ dàng tiến bộ.\r\nTrong PHP PHP STDIO Session trong PHP cho phép lưu trữ thông tin (tên người dùng, danh mục hàng hoá…) trong suốt quá trình làm việc của họ. Không giống như Cookie, thông tin của session chỉ tạm thời và thông tin nà sẽ bị xoá sau khi người dùng rời khỏi ứng dụng web. Vì vậy, nếu cần phải lưu trữ thông tin trong cơ sở dữ liệu.\r\nNội dung bài viết\r\nGiới thiệuTiền đề bài viếtĐối tượng hướng đếnSession là gì?Thiết lập sessionHuỷ bỏ sessionTổng kết\r\nGiới thiệu\r\nĐối với các lập trình viên đam mê với lập trình web và bước đầu tiếp cận với PHP, chắc hẳn sẽ được nghe nói nhiều về session. Với mong muốn chia sẻ kiến thức, qua bài viết này tôi muốn chia sẻ về chức năng, cách cài đặt và sử dụng session.\r\n\r\nTiền đề bài viết\r\nBài viết nằm trong loạt bài viết tự học PHP của STDIO.\r\n\r\nĐối tượng hướng đến\r\nBài viết này tôi muốn hướng tới các bạn đọc mới bắt đầu đầu tìm hiểu ngôn ngữ PHP.\r\n\r\nSession là gì?\r\nSession trong PHP cho phép lưu trữ thông tin (tên người dùng, danh mục hàng hoá trong giỏ hàng…) trong suốt quá trình làm việc của họ. Không giống như cookie, thông tin của session chỉ tạm thời và session chỉ thực sự kết thúc khi người dùng mất trình duyệt hoặc máy chủ sẽ chấm dứt. Vì vậy, đôi lúc bạn cần phải lưu trữ thông tin về session trong cơ sở dữ liệu.\r\n\r\nSession làm việc bằng cách:\r\n\r\n-Mỗi session sẽ được cấp một định danh (ID) khác nhau là chuỗi 32 kí tự.\r\n-Cookie gọi là PHPSESSID sẽ được tự động gửi đến máy tính người dùng để lưu trữ chuỗi.\r\n-Một tệp tin được tự động tạo ra và nội dung đươc lưu trong thư mục thiết lập trong file php.ini.', 'admin', 1, '2019-04-21 23:34:24', '2019-04-21 23:34:24'),
(13, 'Test bài đăng 1', 'Đây là nội dung', 'admin', 0, '2019-04-22 19:29:11', '2019-04-22 19:29:11'),
(15, 'Thử kq bài đăng', 'đây là nội dung của file', 'admin', 0, '2019-04-23 15:32:01', '2019-04-23 15:32:01'),
(17, 'Nghệ An', 'Nghệ An là tỉnh có diện tích lớn nhất Việt Nam thuộc vùng Bắc Trung Bộ. Trung tâm hành chính của tỉnh là thành phố Vinh, nằm cách thủ đô Hà Nội 291 km về phía nam. Trước đây, Nghệ An cùng với Hà Tĩnh có cùng một tên chung là Hoan Châu (trước đời Nhà Lý), Nghệ An châu (đời Nhà Lý, Trần), xứ Nghệ (năm 1490, đời vua Lê Thánh Tông), rồi trấn Nghệ An. Năm 1831, vua Minh Mạng chia trấn Nghệ An thành 2 tỉnh: Nghệ An (bắc sông Lam) và Hà Tĩnh (nam sông Lam). Năm 1976 đến 1991, Nghệ An và Hà Tĩnh sáp nhập thành một tỉnh- Nghệ Tĩnh. Từ năm 1991, lại tách ra thành 2 tỉnh là Nghệ An và Hà Tĩnh.', 'admin', 0, '2019-04-23 16:42:30', '2019-04-23 16:42:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `register`
--

CREATE TABLE `register` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `studentcode` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phonenumber` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `dateofbirth` datetime NOT NULL,
  `address` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `studygroup` int(10) NOT NULL DEFAULT '0',
  `is_block` tinyint(4) NOT NULL DEFAULT '0',
  `createdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(70) COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `studentcode` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `class` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phonenumber` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `dateofbirth` date NOT NULL,
  `address` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `studygroup` int(10) NOT NULL DEFAULT '0',
  `is_block` tinyint(4) NOT NULL DEFAULT '0',
  `createdate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `studentcode`, `class`, `email`, `phonenumber`, `dateofbirth`, `address`, `studygroup`, `is_block`, `createdate`) VALUES
('bongbong', '$2b$10$1zHBi2IpVx8YyAPURwJmqu64Dv8WooJDmz7QDpujgW5xGzRrfTrkq', 'LÊ THỊ HOA', '16102100486', 'TIN10A4', 'bongbong@gmail.com', '0356447546', '1999-01-27', 'Kim Sơn, Ninh Bình', 2, 0, '2019-05-02 20:22:11'),
('dococo', '$2b$10$glLiTtRqoD7y5qlnxiA8me7J56RCYzI3t.vhC8fkCrtwWocH98y4e', 'ĐỖ CÔ CÔ', '16103200300', 'TIN10A3', 'cocodo@gmail.com', '0318449653', '1998-02-28', 'Linh Nam, Hoang Mai', 1, 0, '2019-05-03 21:45:59'),
('duongqua', '$2b$10$0Q95aCXNsAiW9Nna9v9iW.dy.RBapUvrthLQUTLi.M4PbtD9lcTWG', 'DƯƠNG VĂN QUÁ`', '16103102147', 'TIN10A5', 'quanhi@gmail.com', '0394123145', '1997-05-31', 'Linh Nam, Hoang Mai', 1, 0, '2019-05-03 21:17:12'),
('kimchi', '$2b$10$Y7M56jLcPZ1cksFjvQLTTu3BzjkG1QWSRWuP7UIqo6grB8.BS2yHG', 'Đỗ Chi', '16104154636', 'DHTCNH10A3', 'kimchi@gmail.com', '0344174638', '1998-03-21', 'Linh Nam, Hoang Mai', 3, 0, '2019-05-02 20:01:13'),
('loc', '$2b$10$5wfgii9EBFm0rk636R4GXOY9.ZnL.PvhoNKrepGA9hNNLAfscv8ve', 'Nguyễn Đức Lộc', '16103100486', 'TIN10A5', 'loc98@gmail.com', '0383006626', '1998-03-27', 'Quỳnh Lưu Nghệ An', 2, 0, '2019-05-02 20:12:34'),
('loc98', '$2b$10$ZL9AguA8B9/2l6OHJ0zAFOkre1qNWPaaQXRbo13nqoGi/SbovJZ1S', 'Nguyễn Đức Lộc', '16103155456', 'TIN10A5', 'leader031@gmail.com', '0356488765', '1998-09-27', 'Quỳnh Lưu Nghệ An', 1, 0, '2019-05-02 20:14:21'),
('minh', '$2b$10$AYDgwfTCkZW6nu3IWln9.eM0OVkRiAQrqSSwK2bXvoE04p1Y5Kgwm', 'Trần Bình Minh', '16103100836', 'DHTIN10A8', 'tbminh98@gmail.com', '0358148585', '1998-09-11', 'Quỳnh Lưu Nghệ An', 3, 0, '2019-05-02 20:02:37');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `studentcode` (`studentcode`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `studentcode` (`studentcode`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `studentcode_2` (`studentcode`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `studentcode` (`studentcode`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
