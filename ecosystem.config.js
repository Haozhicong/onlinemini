module.exports = {
  // APP是一个数组，可以有多个
  // 参数参考：https://pm2.io/doc/en/runtime/reference/ecosystem-file/
  apps: [
    {
      name: 'app',
      script: './bin/www',
      args: 'null',
      instances: 4,
      exec_mode: "cluster", // 集群模式，如不指定，默认为fork
      autorestart: false,
      min_uptime: "60s",
      watch: false,
      //error_file: "./logs/app-err.log",
      //out_file: "./logs/app-out.log",
      log: "./logs/app.log",
      //log_date_format: "YYYY-MM-DD HH:mm Z", // pm2 log添加日期
      max_memory_restart: '1G',
      //listen_timeout: 3000,
      kill_timeout: 3000,
      // wait_ready: true,
      env:
      {
        NODE_ENV: 'development'
      },
      env_production:
      {
        NODE_ENV: 'production'
      }
    }
  ],

  // 部署，暂未使用，不用理
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
