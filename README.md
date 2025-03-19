# มี 10,000 บาทจะทำอะไรดี? (What Would You Do with 10,000 Baht?)

เว็บแอปพลิเคชันสนุกๆ ที่ให้ผู้ใช้แชร์ไอเดียสร้างสรรค์เกี่ยวกับการใช้เงิน 10,000 บาท ผู้ใช้สามารถแชร์ไอเดียของตัวเอง กดไลค์ไอเดียของคนอื่น และดูอันดับไอเดียที่ได้รับความนิยมสูงสุด

A fun and casual web app that allows users to share creative ideas about how they would spend 10,000 Baht. Users can submit their ideas, like others' ideas, and see a leaderboard of the most popular ideas.

## กลุ่มเป้าหมาย (Target Audience)

แอปพลิเคชันนี้ออกแบบมาสำหรับกลุ่มวัยรุ่นและวัยเรียน อายุ 16-20 ปี ด้วยการใช้ภาษาที่เป็นกันเองและการออกแบบที่ทันสมัย

This application is designed for Thai teenagers and young adults aged 16-20, with casual language and modern design.

## คุณสมบัติ (Features)

- แชร์ไอเดียการใช้เงิน 10,000 บาทของคุณ
- เรียกดูไอเดียจากผู้ใช้คนอื่น
- กดไลค์ไอเดียที่คุณชอบ
- จัดเรียงไอเดียตาม "ล่าสุด" หรือ "ยอดนิยม"
- ดูไอเดียแบบสุ่มด้วยปุ่ม "สุ่มไอเดีย"
- ดู 10 ไอเดียยอดนิยมสูงสุดที่หน้า "ไอเดียฮิต"
- แชร์ไอเดียเป็นรูปภาพ
- รายงานเนื้อหาที่ไม่เหมาะสม

## เทคโนโลยีที่ใช้ (Tech Stack)

- **Frontend**: React with TypeScript
- **Backend**: Firebase (Firestore)
- **Routing**: React Router
- **Styling**: CSS
- **Image Generation**: html2canvas

## วิธีการติดตั้ง (Setup Instructions)

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up Firebase:

   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore in your project
   - Get your Firebase configuration (apiKey, authDomain, etc.)
   - Update the configuration in `src/firebase/config.ts`

4. Start the development server:
   ```
   npm start
   ```

## โครงสร้างโปรเจค (Project Structure)

- `/src/components`: React components
- `/src/pages`: Page components
- `/src/firebase`: Firebase configuration and services
- `/src/hooks`: Custom React hooks
- `/src/types`: TypeScript type definitions
- `/src/utils`: Utility functions
- `/src/styles`: CSS files

## การเผยแพร่ (Deployment)

This app can be deployed to platforms like Vercel, Netlify, or Firebase Hosting.

## License

MIT
