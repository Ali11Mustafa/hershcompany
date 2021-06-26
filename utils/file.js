const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink('./' + filePath, (err) => {
        if (err) {
            throw err;
        }
        console.log('File deleted succesfully');
    });
}

exports.deleteFile = deleteFile;

/* fs.unlink('./' + product.image, function (err) {
    if (err) {
        console.error(err);
        return
    }
    console.log('File has been Deleted');
}); */