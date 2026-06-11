# [06] ฝั่งขวา: Conversational chat + streaming + trust chips

## สิ่งที่ต้องสร้าง

เชื่อม chat input กับ `/api/chat` ประวัติการสนทนา (เริ่มจาก proactive card) ต่อเนื่องเมื่อผู้ใช้ส่งข้อความ AI response แสดงทีละ token แบบ streaming ใต้ทุก AI response ที่มีการเรียก tool อย่างน้อย 1 ครั้ง ให้แสดง **trust chip** — pill สีฟ้าอ่อนข้อความ `🔧 toolName()` — เพื่อให้ผู้ใช้มั่นใจว่าตัวเลขมาจาก query จริง

suggested chips จาก #05 ต้องส่งเป็น user message ได้จริงใน slice นี้

response แบบ guardrail (ปฏิเสธนอกขอบเขต, "ไม่มีข้อมูล") แสดงเป็น assistant message ปกติ ไม่ต้องสไตล์พิเศษ

## เกณฑ์การรับงาน

- [ ] พิมพ์ข้อความแล้วกด Enter หรือปุ่ม Send เพิ่มข้อความใน chat และเรียก `/api/chat`
- [ ] AI response แสดงทีละส่วน ไม่รอจนครบแล้วโชว์ทีเดียว
- [ ] กด suggested chip จาก proactive card ส่งข้อความนั้นเป็น user message ได้จริง
- [ ] trust chip `🔧 toolName()` ปรากฏใต้ทุก response ที่เรียก tool
- [ ] ถ้า response เรียกหลาย tool แสดง chip ทุกตัว
- [ ] คำถามนอกเรื่องได้รับคำปฏิเสธสุภาพ ไม่มี trust chip
- [ ] response "ไม่มีข้อมูล" แสดงถูกต้อง ไม่มีตัวเลขแต่งขึ้น

## ขึ้นกับ

- #05 — proactive card + shape ของ chat history ต้องมีก่อน
