import fs from 'fs';

const file = ('./log.txt');

export const issuesFromTextFile = async () => {
  const lines = fs.readFileSync(file, 'utf16le').toString().split('\n').map(e => e.trim());
  const headers = lines[0].split(';');
  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = { };
    const currLine = lines[i].split(';');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currLine[j];
    }
    result.push(obj);
  }
  return result;
};
