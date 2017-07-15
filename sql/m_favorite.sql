/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : moments

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2017-07-15 15:47:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `m_favorite`
-- ----------------------------
DROP TABLE IF EXISTS `m_favorite`;
CREATE TABLE `m_favorite` (
  `favorite_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `share_id` varchar(36) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`favorite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of m_favorite
-- ----------------------------
