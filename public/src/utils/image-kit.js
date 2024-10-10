const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.imageUpload = async(file) => {
    const uploadedFile = await imagekit.upload({
        file: file.data,
        fileName: file.name,
    });
    return uploadedFile?.url;
}