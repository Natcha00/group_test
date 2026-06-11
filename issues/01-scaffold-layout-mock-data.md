# [01] ตั้งโปรเจกต์ + layout หลัก + mock data

## สิ่งที่ต้องสร้าง

ติดตั้ง Next.js + Tailwind แล้ว render layout แบ่งซ้าย 40% ขวา 60% พร้อม header chip ซ้าย **"Supplier Connect (เดิม)"** และขวา **"+ AI Layer"** แสดง chip บอกแบรนด์ที่กำลังใช้งานอยู่ (Stride) ในส่วน header และสร้าง `lib/mockData.ts` ที่มีข้อมูลครบ 3 เรื่องราวที่วางไว้:

- **เรื่องหลัก (Hero):** RUN-A — Central Siam on_hand=18, avg_daily_sales≈12 → เหลือประมาณ 1.5 วัน / CentralWorld on_hand=210, avg_daily_sales≈1
- **เรื่องที่ 2:** TRL-Y — ยอดขายตก ~34% เทียบเดือนก่อน กระจุกที่ 3 สาขาภาคเหนือ
- **เรื่องที่ 3 (สุขภาพดี):** LIF-1, KID-1 — ยอดขายสม่ำเสมอ สต็อกสมดุล

slice นี้ยังไม่มี logic UI — มีเพื่อให้ทุก slice อื่นแยก branch ทำงานได้พร้อมกัน

## เกณฑ์การรับงาน

- [x] `npm run dev` รันได้ไม่มี error
- [x] layout แบ่ง 40:60 เห็นชัดเจน พร้อม header chip ถูกต้องทั้งสองฝั่ง
- [x] chip แสดงชื่อแบรนด์ "Stride" ใน header
- [x] `lib/mockData.ts` export ข้อมูล stock, sales, goods-receive ครอบคลุม 8 สาขา × 6 SKU พร้อม type
- [x] RUN-A/Central Siam มี on_hand=18, avg_daily_sales=12 / CentralWorld มี on_hand=210, avg_daily_sales=1
- [x] TRL-Y มีข้อมูลยอดขายสะท้อนการตก ~34% ใน 3 สาขาภาคเหนือ
- [x] LIF-1, KID-1 มียอดขายและสต็อกสมดุล

## ขึ้นกับ

ไม่มี — เริ่มได้เลย
