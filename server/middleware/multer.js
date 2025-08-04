import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads")
    },
    filename: (req, file, callback) => {
        let filename = `liteSocial_${Date.now()}_${file?.originalname}`
        callback(null, filename)
    }
})


const upload = multer({ storage: storage })

export default upload;