import { PROD_API_URL, DEV_API_URL } from 'react-native-dotenv'

console.log(__DEV__)

const config = {
  production: {
    API_URL: PROD_API_URL,
  },
  development: {
    API_URL: DEV_API_URL,
  },
}

export default { ...config[__DEV__ ? 'development' : 'production'] }
