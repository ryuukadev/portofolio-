import fs from 'fs';
const p = 'public/IMORTALS38.jpg';
const b64 = fs.readFileSync(p).toString('base64');
const uri = `data:image/jpeg;base64,${b64}`;
let html = fs.readFileSync('imortals38-certificate.html','utf8');
html = html.replace('src="public/IMORTALS38.jpg"', `src="${uri}"`);
// also ensure placeholder hidden and img visible
html = html.replace('id="photoPlaceholder" style="display:none"', 'id="photoPlaceholder" style="display:none"');
fs.writeFileSync('imortals38-certificate.html', html);
console.log('embedded', b64.length);
