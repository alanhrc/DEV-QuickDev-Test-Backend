import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

function removeAccents(word: string) {
  const withAccent =
    'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';

  const withoutAccent =
    'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  let newWord = '';
  for (let i = 0; i < word.length; i++) {
    let troca = false;
    for (let a = 0; a < withAccent.length; a++) {
      if (word.substr(i, 1) == withAccent.substr(a, 1)) {
        newWord += withoutAccent.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      newWord += word.substr(i, 1);
    }
  }
  return newWord;
}

export default {
  tmpFolder: resolve(__dirname, '..', '..', 'tmp', 'uploadedFiles'),
  upload() {
    return {
      storage: multer.diskStorage({
        destination: this.tmpFolder,
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex');
          const nameLower = file.originalname.toLowerCase().trim();
          const primaryNameImage = nameLower.split(' ');
          const nameCleaned = removeAccents(primaryNameImage[0]);
          const fileName = `${fileHash}_${nameCleaned}`;

          return callback(null, fileName);
        },
      })
    }
  }
}
