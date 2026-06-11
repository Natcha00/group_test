# [04] AI backend: API route + tool functions

## สิ่งที่ต้องสร้าง

สร้าง Next.js API route (`/api/chat`) รับ conversation history แล้วคืน streaming response จาก **DeepSeek V4 Flash** ผ่าน OpenAI-compatible SDK Route นี้รองรับ tool use — LLM เรียก tool ใดก็ได้จาก 5 ตัวด้านล่าง ซึ่ง query ข้อมูลจาก `lib/mockData.ts` แล้วส่งผลกลับให้ LLM เรียบเรียงเป็นภาษาไทย

Tool functions (ทำงาน server-side):

| Tool | คืนค่า |
|------|--------|
| `getStockRisk()` | คู่สาขาที่ days_remaining < 7 (เสี่ยงหมด) หรือ on_hand > 200 & daily_sales < 2 (ค้าง) |
| `getSalesSummary(sku?, store?, period)` | ยอดขายรวมตามเงื่อนไขและช่วงเวลา |
| `getUnderperformers(period)` | SKU ที่ยอดตก MoM เรียงตาม % ที่ตก |
| `getStockLevels(sku?, store?)` | on_hand + on_order ต่อแถวที่ตรงเงื่อนไข |
| `draftTransferRequest(sku, from, to, qty)` | object ใบขอย้ายสต็อก (ไม่แก้ข้อมูล) |

System prompt ต้อง:
- จำกัดขอบเขตการตอบเฉพาะข้อมูลขาย/สต็อกเท่านั้น
- ปฏิเสธคำถามนอกขอบเขตอย่างสุภาพแล้วดึงกลับเข้าเรื่อง
- ห้ามเดาตัวเลข — ถ้าไม่มีข้อมูลให้ตอบว่า "ไม่มีข้อมูล"

chunk สุดท้ายของ stream ต้องมีรายชื่อ tool ที่ถูกเรียก เพื่อให้ client render trust chip ได้

## เกณฑ์การรับงาน

- [ ] `POST /api/chat` รับ `{ messages: [...] }` แล้วคืน streaming response
- [ ] tool ทั้ง 5 ตัวเรียกได้และคืนค่าจาก `lib/mockData.ts` (ไม่ hardcode)
- [ ] `getStockRisk()` คืน RUN-A/Central Siam เป็น risk และ CentralWorld เป็น overstock
- [ ] `draftTransferRequest("RUN-A", "CentralWorld", "Central Siam", 80)` คืน object ครบ field
- [ ] คำถามนอกเรื่อง (เช่น "สภาพอากาศวันนี้") ได้รับคำปฏิเสธสุภาพ
- [ ] คำถามที่ไม่มีข้อมูลรองรับได้คำตอบ "ไม่มีข้อมูล" ไม่ใช่ตัวเลขแต่งขึ้น
- [ ] response stream ได้จริง (ทดสอบด้วย `curl -N`)
- [ ] chunk สุดท้ายมีรายชื่อ tool ที่ถูกเรียก

## ขึ้นกับ

- #01 — ต้องกำหนด shape ของ mock data ก่อน
