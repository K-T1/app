const config = {
  production: {
    API_URL: '',
  },
  development: {
    API_URL: 'http://192.168.1.33:3000',
  },
}

export default { ...config[process.env.NODE_ENV] }
