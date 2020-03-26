const config = {
  production: {
    API_URL: '',
  },
  development: {
    API_URL: 'http://172.19.0.1:3000',
  },
}

export default { ...config[process.env.NODE_ENV] }
