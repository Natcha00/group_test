# [05] ฝั่งขวา: Proactive card + suggested chips

## สิ่งที่ต้องสร้าง

เมื่อโหลดหน้า ฝั่งขวาเรียก `getStockRisk()` server-side แล้วแทรกผลลัพธ์เป็น **ข้อความแรก** ใน chat history ทันที ไม่ต้องรอการกระทำของผู้ใช้ การ์ดต้องสื่อสารเรื่อง RUN-A imbalance: Central Siam เหลือประมาณ 1.5 วัน ขณะที่ CentralWorld ค้าง 210 คู่ ใต้การ์ดมี suggested chip 3 อัน:

1. "ดูรายละเอียด RUN-A"
2. "เปรียบเทียบยอดข้ามเดือน"
3. "ช่วยร่างใบย้ายสต็อก"

กด chip ส่งข้อความนั้นเข้า chat (ต้องรอ #06 เชื่อมจริง — ถ้ายังไม่ merge ให้ log console ก่อน)

## เกณฑ์การรับงาน

- [ ] proactive card ปรากฏเป็นข้อความแรกในฝั่งขวาทันทีที่โหลดหน้า ไม่ต้องพิมพ์อะไร
- [ ] ข้อความในการ์ดพูดถึง RUN-A, Central Siam, ~1.5 วัน และ CentralWorld 210 คู่
- [ ] ตัวเลข days remaining คำนวณจาก mock data จริง ไม่ใช่ข้อความ hardcode
- [ ] suggested chip 3 อัน render อยู่ใต้การ์ด
- [ ] chip มีรูปแบบต่างจากข้อความ chat ปกติ
- [ ] กด chip แล้ว log ข้อความนั้น console (เชื่อมส่งจริงใน #06)

## ขึ้นกับ

- #04 — API route + tool `getStockRisk()` ต้องพร้อมก่อน
