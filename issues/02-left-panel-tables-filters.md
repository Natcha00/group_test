# [02] ฝั่งซ้าย: ตาราง Stock / Sales / Goods Receive + filter

## สิ่งที่ต้องสร้าง

สร้างฝั่งซ้าย (40%) ทั้งหมด ประกอบด้วย 3 tab — **Stock** (เปิดเป็นค่าเริ่มต้น), **Sales**, **Goods Receive** — แต่ละ tab แสดงตารางจาก `lib/mockData.ts` มี dropdown 2 ตัวที่ด้านบน (สาขา + SKU ค่าเริ่มต้น "ทั้งหมด") ที่กรองทั้ง 3 tab พร้อมกัน Sales tab มีปุ่ม toggle เวลา (7 วัน / 30 วัน / 90 วัน) สำหรับรวมยอดขายตามช่วงเวลา

คอลัมน์ที่กำหนด:
- **Stock:** สาขา · SKU · Stock on Hand · Stock on Order
- **Sales:** สาขา · Units Sold · Gross Sales · Total Discount · Net Sales
- **Goods Receive:** วันที่รับ · Total PO · Total Qty (PO) · Total Qty (รับจริง) · %QTY Receive

## เกณฑ์การรับงาน

- [ ] Stock tab เปิดเป็นค่าเริ่มต้นตอนโหลดหน้า
- [ ] เปลี่ยน dropdown สาขา หรือ SKU กรองแถวใน tab ที่กำลังดูอยู่
- [ ] เลือก "ทั้งหมด" คืนมุมมองไม่กรอง
- [ ] ปุ่ม toggle บน Sales tab เปลี่ยนตัวเลขยอดขายตามช่วงเวลาที่เลือก (7 / 30 / 90 วัน)
- [ ] header คอลัมน์ตรงตามที่กำหนดทุก tab
- [ ] ข้อมูลทั้งหมดมาจาก `lib/mockData.ts` ไม่มีการเรียก API

## ขึ้นกับ

- #01 — ต้องมี scaffold + mock data ก่อน
