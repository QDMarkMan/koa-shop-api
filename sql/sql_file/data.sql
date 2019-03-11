/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : project_progress

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-11-02 10:50:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for team_users
-- ----------------------------
DROP TABLE IF EXISTS `team_users`;
CREATE TABLE `team_users` (
  `id` varchar(32) NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `nick_name` varchar(32) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `reg_date` datetime DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `ip` varchar(32) DEFAULT NULL,
  `address` varchar(32) DEFAULT NULL,
  `gender` enum('0','1') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='team用户表';