export default [
    {
        text: "MySQL基础",
        collapsed: false,
        items: [
            {text: "MySQL基础架构", link: "/database/mysql/MySQL基础架构.md"},
            {text: "InnoDB存储引擎", link: "/database/mysql/InnoDB存储引擎.md"},
            {text: "MySQL日志系统", link: "/database/mysql/MySQL日志系统.md"},
            {text: "一条更新SQL的执行过程", link: "/database/mysql/一条更新SQL的执行过程.md"},
            {text: "事务隔离", link: "/database/mysql/事务隔离.md"},
            {text: "B树和B+树", link: "/database/mysql/B树和B+树.md"},
            {text: "索引", link: "/database/mysql/索引.md"},
            {text: "锁", link: "/database/mysql/锁.md"},
            {text: "行锁", link: "/database/mysql/行锁.md"}
        ]
    },
    {
        text: "MySQL总结",
        collapsed: false,
        items: [
            {text: "SQL语句的抖动问题", link: "/database/mysql/SQL语句的抖动问题.md"},
            {text: "索引失效的场景", link: "/database/mysql/索引失效的场景.md"},
            {text: "explain使用总结", link: "/database/mysql/explain使用总结.md"},
            {text: "慢查询日志", link: "/database/mysql/慢查询日志.md"}
        ]
    },
    {
        text: "问题总结",
        collapsed: false,
        items: [
            {text: "OrderBy和limit混用的bug", link: "/database/mysql/OrderBy和limit混用的bug.md"},
            {text: "MySQL的binlog日志过期删除", link: "/database/mysql/MySQL的binlog日志过期删除.md"},
            {text: "MySQL根据idb文件恢复数据", link: "/database/mysql/MySQL根据idb文件恢复数据.md"}
        ]
    }
]