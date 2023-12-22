import multer from 'multer';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import Error from 'next/error';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log('이미지 입니다.');
//     const filePath = path.join(process.cwd(), 'public', 'images');
//     cb(null, filePath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// export async function POST(req: NextRequest) {
//   upload.single('file');
//   return NextResponse.json('');
// }

export async function POST(req: NextRequest) {
  const savePath = path.join(process.cwd(), 'public', 'images');
  const formData = await req.formData();

  const entries = formData.entries();
  const body = Object.fromEntries(entries);
  let message = 'ok';
  let url: string[] = [];

  const width = formData.get('width');
  const quality = formData.get('quality');

  try {
    // !fs.existsSync(savePath) && fs.mkdirSync(savePath);

    for (const key in body) {
      if (key === 'width' || key === 'quality') {
        console.log('width / quality: ', width, quality);
        continue;
      }
      console.log('entries : ', body[key]);
      const file = body[key] as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const filePath = path.join(savePath, filename);

      try {
        const str = `http://localhost:3000/${`images/${filename}`}?w=${width}&q=${
          quality || 75
        }`;

        await fs.writeFile(filePath, buffer);
        // url.push(`/images/${filename}`);
        url.push(str);

        // url.push(`http://localhost:3000/images/${filename}`);
      } catch {}
    }
  } catch (err) {
    console.log('catch', err);
    message = 'fail';
  }

  console.log('url : ', url);

  return NextResponse.json({ message, url });
}
