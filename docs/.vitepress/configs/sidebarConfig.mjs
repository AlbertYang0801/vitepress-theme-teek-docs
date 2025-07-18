//------------------------------------Java---------------------------------
//高并发
import concurrent from './sidebar/java/concurrent';
//io
import io from './sidebar/java/io';
//jvm
import jvm from './sidebar/java/jvm';
//io
import cache from './sidebar/java/cache';
//Java容器
import collection from './sidebar/java/collection';
//分布式
import distributed from './sidebar/java/distributed.js';


//------------------------------------框架---------------------------------
import spring from './sidebar/frame/spring.js';
import springboot from './sidebar/frame/springboot.js';
import mybatis from './sidebar/frame/mybatis.js';
import springcloud from './sidebar/frame/springcloud.js';
import netty from './sidebar/frame/netty.js';


//------------------------------------数据库---------------------------------

import mysql from './sidebar/database/mysql.js';
import redis from './sidebar/database/redis.js';
import clickhouse from './sidebar/database/clickhouse.js';


//------------------------------------中间件---------------------------------

import elasticsearch from './sidebar/middleware/elasticsearch.js';
import kafka from './sidebar/middleware/kafka.js';
import rocketmq from './sidebar/middleware/rocketmq.js';


//------------------------------------云原生---------------------------------

import docker from './sidebar/cloudnative/docker.js';
import k8s from './sidebar/cloudnative/k8s.js';
import prometheus from './sidebar/cloudnative/prometheus.js';

//------------------------------------其它---------------------------------
import observability from './sidebar/other/observability.js';

import network from './sidebar/other/network.js';
import design from './sidebar/other/design.js';
import datastructure from './sidebar/other/design.js';
import algorithm from './sidebar/other/algorithm.js';



// 为以下路由添加左侧边栏
export default {
    // --------------java-------------------
    "/java/jvm/": jvm,
    "/java/concurrent/": concurrent,
    "/java/io/": io,
    "/java/cache/": cache,
    "/java/collection/": collection,
    "/java/distributed/": distributed,


    // --------------框架-------------------

    "/frame/spring/": spring,
    "/frame/springboot/": springboot,
    "/frame/mybatis/": mybatis,
    "/frame/springcloud/": springcloud,
    "/frame/netty/": netty,

    // --------------数据库-------------------

    "/database/mysql/": mysql,
    "/database/redis/": redis,
    "/database/clickhouse/": clickhouse,

    // --------------中间件-------------------

    "/middleware/es/": elasticsearch,
    "/middleware/kafka/": kafka,
    "/middleware/rocketmq/": rocketmq,

    // --------------云原生-------------------
    "/cloudnative/docker/": docker,
    "/cloudnative/k8s/": k8s,
    "/cloudnative/prometheus/": prometheus,

    // --------------其它-------------------

    "/other/observability/": observability,

    "/other/design/": design,
    "/other/network/": network,
    "/other/datastructure/": datastructure,
    "/other/algorithm/": algorithm,



}
