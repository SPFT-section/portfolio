# Portfolio — อภินันท์ พงษ์คำ

แฟ้มสะสมผลงานส่วนตัว จัดทำเป็นเว็บไซต์ single-page แบบ static HTML/CSS
พร้อมใช้งานผ่าน GitHub Pages ธีม glassmorphism พร้อม sidebar navigation

## โครงสร้างเว็บไซต์
- `index.html` — หน้าเดียวรวมทุกส่วน (หน้าแรก, ประวัติ, กิจกรรม, เกียรติบัตร, คลังความรู้, วิดีโอ, ติดต่อ) เชื่อมด้วย anchor link
- `styles.css` — ดีไซน์และธีมของเว็บไซต์ทั้งหมด
- `script.js` — สคริปต์ sidebar toggle และไฮไลต์เมนูตามส่วนที่กำลังดู
- `assets/` — โฟลเดอร์ใส่รูปภาพ (ดูรายละเอียดใน assets/README.md)

## การเผยแพร่ผ่าน GitHub Pages
1. Push โค้ดทั้งหมดขึ้น branch `main`
2. ไปที่ Settings → Pages → Source เลือก branch `main` และโฟลเดอร์ `/ (root)`
3. เว็บไซต์จะเผยแพร่ที่ `https://<username>.github.io/portfolio/`
