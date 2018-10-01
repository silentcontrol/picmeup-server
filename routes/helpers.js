var multer = require('multer');

const extractWebAnnotations = (result) => {
  const entities = result[0].webDetection.webEntities;
  let allAnnotations = entities.filter(entity => entity.score >= 0.5 && entity.description);
  allAnnotations = allAnnotations.map(entity => {
    return {
      "description": entity.description,
      "score": entity.score
    }
  });
  return allAnnotations;
}

//https://medium.com/@Moonstrasse/how-to-make-a-basic-html-form-file-upload-using-multer-in-an-express-node-js-app-16dac2476610
const multerConfig = {

  storage: multer.memoryStorage({

    //Then give the file a unique name
    filename: function (req, file, next) {
      console.log(file);
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '-' + Date.now() + '.' + ext);
    }
  }),

  //A means of ensuring only images are uploaded.
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if (image) {
      console.log('photo uploaded');
      next(null, true);
    } else {
      console.log("file not supported");

      //TODO:  A better message response to user on failure.
      return next();
    }
  }
};

module.exports = {
  extractWebAnnotations,
  multerConfig
};