export function getMockFile(name?: string): Blob {
  name = name || 'mock.txt';
  const size = 1024;
  const mimeType ='plain/txt';
  
  function range(count: number) {
    let output = '';
    for (let i = 0; i < count; i++) {
      output += 'a';
    }
    return output;
  }
  
  const blob: any = new Blob([range(size)], { type: mimeType });
  blob.lastModifiedDate = new Date();
  blob.name = name;
  
  return blob;
}