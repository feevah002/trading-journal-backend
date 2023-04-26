const cloudinary = require("../config/cloudinary");

class cloudUrl {
   async createTradeImageUrl (filePath) {
    const cloudUrl = await cloudinary.uploader
      .upload(filePath)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    if (!cloudUrl.secure_url) {
      return false;
    } else {
      return cloudUrl.secure_url;
    }
  };
  // creating url for images
  async createAvatarUrl(filePath) {
    const cloudUrl = await cloudinary.uploader
      .upload(filePath)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
    if (!cloudUrl.secure_url) {
      return false;
    } else {
      return cloudUrl.secure_url;
    }
  }
}

module.exports = cloudUrl;
