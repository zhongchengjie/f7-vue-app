/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50536
Source Host           : localhost:3306
Source Database       : moments

Target Server Type    : MYSQL
Target Server Version : 50536
File Encoding         : 65001

Date: 2017-07-13 00:49:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for m_user
-- ----------------------------
DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user` (
  `user_id` varchar(36) NOT NULL COMMENT '用户id',
  `user_name` varchar(36) NOT NULL COMMENT '用户姓名',
  `user_pwd` varchar(10) NOT NULL DEFAULT '123456' COMMENT '用户密码',
  `user_mobile` varchar(11) NOT NULL COMMENT '手机号码',
  `user_photo` varchar(100) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of m_user
-- ----------------------------
INSERT INTO `m_user` VALUES ('001', 'w33vha', '123456', '13560472084', '');
