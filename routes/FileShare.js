const express= require('express');
const { uploadFile,downloadFile } = require('../Controllers/FileShare');
const router=express.Router();
const upload=require('../Middleware/FileShare');

router.post('/upload', upload.single('file'), uploadFile);
router.get('/file/:fileId', downloadFile);

module.exports=router;