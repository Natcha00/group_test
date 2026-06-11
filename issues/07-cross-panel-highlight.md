# [07] Cross-panel highlight

## สิ่งที่ต้องสร้าง

เมื่อ proactive card โหลด (เปิดหน้า) ให้ highlight แถว **RUN-A / Central Siam** ในตาราง Stock ฝั่งซ้ายโดยอัตโนมัติ ด้วยสีพื้นหลังที่เห็นชัด (เช่น โทนเหลืองอำพัน) พร้อม label ขนาดเล็กบนแถวนั้นว่า **"← AI กำลังพูดถึงแถวนี้"**

สถานะ highlight ต้องขับเคลื่อนด้วย shared state (เช่น React context หรือ lifted state ที่ layout) เพื่อให้ฝั่งซ้ายและขวาไม่ต้อง import กัน

## เกณฑ์การรับงาน

- [ ] เปิดหน้าแล้วแถว RUN-A / Central Siam ใน Stock table มี highlight เห็นชัด
- [ ] label "← AI กำลังพูดถึงแถวนี้" ปรากฏบนแถวนั้น
- [ ] highlight เห็นได้แม้ filter ตั้งเป็น "ทั้งหมด" (แถวนั้นไม่ถูกกรองออก)
- [ ] ไม่มีแถวอื่นถูก highlight
- [ ] สลับไป tab Sales หรือ Goods Receive แล้วไม่มี highlight ผิดพลาด
- [ ] logic ใช้ shared state ไม่มี component ฝั่งซ้าย↔ขวา import กันตรงๆ

## ขึ้นกับ

- #02 — ตาราง Stock ต้องมีก่อน
- #05 — event โหลด proactive card เป็นตัวกระตุ้น highlight
