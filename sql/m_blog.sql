/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : moments

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2017-07-13 00:49:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for m_blog
-- ----------------------------
DROP TABLE IF EXISTS `m_blog`;
CREATE TABLE `m_blog` (
  `blog_id` varchar(36) NOT NULL DEFAULT '',
  `blog_title` varchar(100) NOT NULL,
  `blog_content` text,
  `blog_photo` varchar(255) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `publisher` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`blog_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of m_blog
-- ----------------------------
