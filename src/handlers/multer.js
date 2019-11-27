import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + `.${file.mimetype.split('/')[1]}`
    )
  }
})
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    cb(new Error('File type is not supported', false))
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage,
  fileFilter
})

export default upload
