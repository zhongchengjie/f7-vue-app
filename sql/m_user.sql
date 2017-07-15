/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : moments

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2017-07-15 15:48:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `m_user`
-- ----------------------------
DROP TABLE IF EXISTS `m_user`;
CREATE TABLE `m_user` (
  `user_id` varchar(36) NOT NULL COMMENT '用户id',
  `user_name` varchar(36) NOT NULL COMMENT '用户姓名',
  `user_pwd` varchar(10) NOT NULL DEFAULT '123456' COMMENT '用户密码',
  `user_mobile` varchar(11) NOT NULL COMMENT '手机号码',
  `user_signature` varchar(250) DEFAULT NULL,
  `user_photo` varchar(100) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of m_user
-- ----------------------------
INSERT INTO `m_user` VALUES ('001', 'w33vha', '11', '13560472084', null, '');
INSERT INTO `m_user` VALUES ('002', 'www', '111111', '13560472011', null, null);
INSERT INTO `m_user` VALUES ('1499916117807', 'yyy', '111111', '1123132131', null, null);
INSERT INTO `m_user` VALUES ('1499916590773', 'ttt', '1322131', '1231321321', null, null);
INSERT INTO `m_user` VALUES ('1499942710873', 'w33hahaha', '11', '11', null, null);
