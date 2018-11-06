module.exports = {
  apps: [{
    name: '{{name}}',
    script: './master.js',
    kill_timeout: 10000,
    watch: true,
    env: {
      'NODE_ENV': 'prod'
    }
  }]
}
