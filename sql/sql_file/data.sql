/*
Navicat MySQL Data Transfer

Source Server         : home
Source Server Version : 50643
Source Host           : localhost:3306
Source Database       : project_progress

Target Server Type    : MYSQL
Target Server Version : 50643
File Encoding         : 65001

Date: 2019-04-04 17:35:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for error_logs
-- ----------------------------
DROP TABLE IF EXISTS `error_logs`;
CREATE TABLE `error_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `e_id` varchar(20) NOT NULL COMMENT '当前错误日志id',
  `e_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '错误上报时间',
  `ip` varchar(10) DEFAULT NULL COMMENT '访问用户IP地址',
  `p_type_id` varchar(20) NOT NULL COMMENT '平台类型id',
  `browser` varchar(20) DEFAULT NULL COMMENT '使用浏览器',
  `resolution` varchar(10) DEFAULT NULL COMMENT '当前浏览器分辨率',
  `ln` varchar(10) DEFAULT NULL COMMENT '浏览器使用语言',
  `b_version` varchar(10) DEFAULT NULL COMMENT '宿主浏览器版本',
  `e_info` varchar(255) DEFAULT NULL COMMENT '错误信息',
  `e_type` varchar(10) DEFAULT NULL COMMENT '错误类型',
  `e_url` varchar(20) DEFAULT NULL COMMENT '请求地址（只有在error type是http时间生效）',
  `e_url_type` enum('GET','POST') DEFAULT NULL COMMENT '请求类型',
  `e_para` varchar(255) DEFAULT NULL COMMENT '请求参数',
  `cookie` varchar(255) DEFAULT NULL COMMENT '当前请求cookie',
  `e_url_res` varchar(255) DEFAULT NULL COMMENT 'http错误请求返回的信息',
  `app_version` varchar(5) DEFAULT NULL COMMENT '使用平台版本的版本',
  `is_delete` enum('0','1') DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`e_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ultron  ==> 错误信息记录表,';

-- ----------------------------
-- Table structure for perf_logs
-- ----------------------------
DROP TABLE IF EXISTS `perf_logs`;
CREATE TABLE `perf_logs` (
  `dns_time` tinyint(255) DEFAULT NULL COMMENT 'DNS查询时间长度ms',
  `c_time` int(255) DEFAULT NULL COMMENT 'HTTP（TCP）连接耗时',
  `p_id` varchar(255) NOT NULL COMMENT '当前logID',
  `p_type_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '所属平台类型， 建议从平台表中出',
  `s_time` int(255) DEFAULT NULL COMMENT 'DOM解析之后资源加载时间',
  `l_time` int(255) DEFAULT NULL COMMENT 'load事件执行时长',
  `h_time` int(255) DEFAULT NULL COMMENT 'HTTP 响应全部接收完成的时长（获取到最后一个字节），包括从本地读取缓存',
  `d_time` int(255) DEFAULT NULL COMMENT '/ DOM 解析时长， Document.readyState 变为 interactive，并将抛出 readystatechange 相关事件 。只是 DOM 树解析完成，这时候并没有开始加载网页内的资源',
  `u_memory` int(255) DEFAULT NULL COMMENT 'JS 对象（包括V8引擎内部对象）占用的内存，一定小于 totalJSHeapSize',
  `t_memory` int(255) NOT NULL COMMENT '浏览器内存总量',
  `log_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '当前日志记录时间',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '递增id',
  `log_id` varchar(255) NOT NULL COMMENT '当前条记录唯一id',
  `is_delete` enum('1','0') DEFAULT '0',
  PRIMARY KEY (`id`,`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ultron  ==> 性能分析表, 性能记录';

-- ----------------------------
-- Table structure for platforms
-- ----------------------------
DROP TABLE IF EXISTS `platforms`;
CREATE TABLE `platforms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `platform_id` varchar(20) NOT NULL COMMENT '平台id',
  `platform_name` varchar(20) DEFAULT NULL COMMENT '平台名称',
  `platform_key` varchar(20) DEFAULT NULL COMMENT '平台代号',
  `platform_alias` varchar(10) DEFAULT NULL COMMENT '平台别名',
  `create_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_delete` enum('1','0') DEFAULT '0' COMMENT '是否删除 0： 未删除 1：删除',
  PRIMARY KEY (`id`,`platform_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ultron  ==> 平台维护表, 用于维护接入SDK的各个平台';

-- ----------------------------
-- Table structure for resource_logs
-- ----------------------------
DROP TABLE IF EXISTS `resource_logs`;
CREATE TABLE `resource_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资源记录id',
  `url` varchar(20) NOT NULL COMMENT '资源地址',
  `type` varchar(10) DEFAULT NULL COMMENT '资源类型',
  `size` double(10,2) DEFAULT NULL COMMENT '资源大小（KB）',
  `zip_size` double(10,2) DEFAULT NULL COMMENT '压缩后资源大小',
  `req_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '请求时间',
  `res_time` timestamp NULL DEFAULT NULL COMMENT '响应',
  `protocol` varchar(5) DEFAULT NULL COMMENT '协议类型',
  `is_delete` enum('0','1') DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ultron  ==> 资源维护表, 资源查询记录';

-- ----------------------------
-- Table structure for team_areas
-- ----------------------------
DROP TABLE IF EXISTS `team_areas`;
CREATE TABLE `team_areas` (
  `code` bigint(12) unsigned NOT NULL COMMENT '区划代码',
  `name` varchar(128) NOT NULL DEFAULT '' COMMENT '名称',
  `level` tinyint(1) NOT NULL COMMENT '级别1-5,省市县镇村',
  `pcode` bigint(12) DEFAULT NULL COMMENT '父级区划代码',
  PRIMARY KEY (`code`),
  KEY `name` (`name`),
  KEY `level` (`level`),
  KEY `pcode` (`pcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for team_users
-- ----------------------------
DROP TABLE IF EXISTS `team_users`;
CREATE TABLE `team_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) NOT NULL,
  `username` varchar(32) DEFAULT NULL,
  `nick_name` varchar(32) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `reg_date` bigint(10) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `ip` varchar(32) DEFAULT NULL,
  `address` varchar(32) DEFAULT NULL,
  `gender` enum('0','1') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `department_id` varchar(255) DEFAULT NULL COMMENT '所属部门',
  `is_delete` enum('0','1') DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='teamç¨æ·è¡¨';

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
