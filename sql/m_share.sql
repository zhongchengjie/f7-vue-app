/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : moments

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2017-07-15 15:48:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `m_share`
-- ----------------------------
DROP TABLE IF EXISTS `m_share`;
CREATE TABLE `m_share` (
  `share_id` varchar(36) NOT NULL DEFAULT '',
  `share_content` text,
  `share_photo` varchar(500) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `create_user` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `favor_num` int(11) NOT NULL DEFAULT '0',
  `like_num` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`share_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of m_share
-- ----------------------------
INSERT INTO `m_share` VALUES ('1499997967998', '哈哈哈哈哈', '', '2017-07-14 10:06:08', '001', '0', '0');
INSERT INTO `m_share` VALUES ('7daffb00-683f-11e7-8b23-902b349a0e31', 'Ай-ай-ай-ай-ай, что сейчас произошло!', '', '2017-07-14 10:52:36', '001', '0', '0');
INSERT INTO `m_share` VALUES ('bf6b8be6-68ff-11e7-a3a9-902b349a0e31', '发图', '../../static/assets/upload/images/0.06065358027943746.jpg,../../static/assets/upload/images/0.3427394644036603.jpg', '2017-07-15 09:48:49', '001', '0', '0');
INSERT INTO `m_share` VALUES ('e2ace920-6839-11e7-8b23-902b349a0e31', 'share a good vue2.0 project', '', '2017-07-14 10:12:28', '001', '0', '0');
INSERT INTO `m_share` VALUES ('e2ace920-6839-11e7-8b23-902b349a0e32', '大圣归来', null, '2017-07-14 10:22:50', '003', '0', '0');
