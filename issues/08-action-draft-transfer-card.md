# [08] Action flow: ร่างใบขอย้ายสต็อก

## สิ่งที่ต้องสร้าง

หลัง AI response ที่วิเคราะห์ stock imbalance ของ RUN-A ให้แสดง **action button** — `ร่างใบขอย้ายสต็อก →` — ใต้ข้อความนั้นโดยตรง เมื่อกด ระบบส่ง request ให้ AI เรียก `draftTransferRequest()` แล้ว render ผลเป็น **structured card** ใน chat

structured card ต้องมี 6 field ที่ label ชัดเจน:

| Field | ตัวอย่าง |
|-------|---------|
| SKU | RUN-A |
| จำนวน | 80 คู่ (มาจากการคำนวณของ tool) |
| สาขาต้นทาง | CentralWorld |
| สาขาปลายทาง | Central Siam |
| วันที่ | (วันที่วันนี้) |
| เหตุผล | สต็อก Central Siam คาดว่าจะหมดใน ~1.5 วัน |

มีปุ่ม **Copy** สำหรับ copy field ทั้งหมดเป็น formatted text ไปยัง clipboard

ตัวเลขจำนวน (80) ต้องมาจากค่าที่ `draftTransferRequest()` คืนมา ไม่ใช่ hardcode ใน UI

## เกณฑ์การรับงาน

- [ ] action button `ร่างใบขอย้ายสต็อก →` ปรากฏใต้ AI message ที่พูดถึง RUN-A imbalance
- [ ] กดปุ่มแล้ว AI เรียก `draftTransferRequest()` และ structured card แสดงใน chat
- [ ] card มีครบ 6 field ที่กรอกข้อมูลถูกต้อง
- [ ] ตัวเลขจำนวนตรงกับที่ `draftTransferRequest()` คืนมา (ไม่ hardcode)
- [ ] ปุ่ม Copy copy เนื้อหา card ไปยัง clipboard ได้
- [ ] card มีรูปแบบต่างจาก chat bubble ปกติ (เช่น มี border, label field ชัดเจน)

## ขึ้นกับ

- #06 — chat ต้องทำงานได้ก่อน (action button อยู่ใน chat message)
