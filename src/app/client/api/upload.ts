import request, {Response} from 'superagent';

const url = 'http://localhost:3000/api/v1';

export function uploadFile(fileName: string, file?: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('upload-file', file as Blob, fileName);

  return request.post(url + '/upload')
    .send(formData)
    .then((res: Response) => res.body);   
}

export type UploadResponse = {
  url: string
}