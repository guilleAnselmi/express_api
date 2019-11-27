import path from 'path'

const settings = {
  token: {
    secret: 'ts$s38*jsjmjnT1',
    expires: '1d', // expires in 24 hours
    noexpires: '100y' // expires in 100 years
  },
  baseUrl: process.env.BASE_URL || 'http://localhost',
  uploadDir: process.env.UPLOAD_DIR || '../api/files',
  imagesDir: process.env.IMAGES_DIR || '../api/images/',
  url: function () {
    return this.baseUrl + ':' + this.port
  },
  path: path.normalize(path.join(__dirname, '..')),
  port: process.env.PORT || 3000,
  database: {
    logging: 'console.log',
    timezone: '-03:00',
    host: process.env.MONGODB || 'localhost',
    name: process.env.MONGODB_NAME || 'express_basic_api'
  },
  pagging: {
    itemsPerPage: 10
  }
}

export default settings
