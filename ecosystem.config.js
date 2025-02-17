module.exports = {
    apps: [
        {
            name: "obs",
            script: "index.js",
            instances: 1,    // 设置为 1，表示只有一个实例
            autorestart: true,
            cwd: "./observer",
            watch: false,     // 如果需要热重载可以设置为 true
        },
        {
            name: "server",
            script: "index.js",
            instances: 1,
            cwd: "./server",
            autorestart: true,
            watch: false,
        },
        {
            name: "web",
            script: "server.js",
            instances: 1,
            cwd: "./web",
            autorestart: true,
            watch: false,
        },
    ],
};
