
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

//------------------------------------框架---------------------------------
import spring from './sidebar/spring';
import springboot from './sidebar/springboot';
import mybatis from './sidebar/mybatis';
import springcloud from './sidebar/springcloud';
import netty from './sidebar/netty';


//------------------------------------数据库---------------------------------

import mysql from './sidebar/mysql';
import redis from './sidebar/redis';
import clickhouse from './sidebar/clickhouse';


//------------------------------------中间件---------------------------------

import elasticsearch from './sidebar/elasticsearch';
import kafka from './sidebar/kafka';
import rocketmq from './sidebar/rocketmq';


//------------------------------------设计模式---------------------------------
//设计模式
import design from './sidebar/design';
//工具向
import util from './sidebar/util';



// 为以下路由添加左侧边栏
export default {
    // --------------java-------------------
    "/java/jvm/": jvm,
    "/java/concurrent/": concurrent,
    "/java/io/": io,
    "/java/cache/": cache,
    "/java/collection": collection,


    // --------------框架-------------------

    "/frame/spring/": spring,
    "/frame/springboot/": springboot,
    "/frame/mybatis/": mybatis,
    "/frame/springcloud/": springcloud,
    "/frame/netty/": netty,



    // --------------中间件-------------------

    "/middleware/es": elasticsearch,
    "/middleware/kafka": kafka,
    "/middleware/rocketmq": rocketmq,


    "/design/": design,
    "/util/": util,


    "/database/mysql": mysql,
    "/database/redis": redis,
    "/database/clickhouse": clickhouse,

}
