import request from 'superagent';

const url = 'http://localhost:3000/api/v1';

export function uploadFile(fileName: string, file?: File) {
  const formData = new FormData();
  formData.append('upload-file', file as Blob, fileName);

  console.log(file);
  request.post(url + '/upload')
    .send(formData)
    .then((res: any) => {
      console.log('sent the file: ' + res);
    })
    .catch((err: any) => {
      console.log(err);
    });    
}