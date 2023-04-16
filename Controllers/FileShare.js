const File=require('../Models/FileShare');

exports.uploadFile= async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    }
    
    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `http://localhost:${process.env.PORT}/file/${file._id}`});
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
}
exports.downloadFile=async (request, response) => {
    try {   
        const file = await File.findById(request.params._id);
        console.log(file);
        file.downloadCount++;

        await file.save();

        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}