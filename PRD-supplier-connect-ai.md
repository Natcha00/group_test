# PRD: AI Conversational + Proactive Layer สำหรับ Supplier Connect

> เอกสารกำหนดความต้องการผลิตภัณฑ์ (PRD) สำหรับ live demo
> บริบท: pitch สมัครงาน/ฝึกงานที่ RIS · ทำคนเดียว · AI เขียนโค้ดให้ทั้งหมด · เวลาจำกัด (ไม่กี่วัน) · กรรมการมีทั้งสาย business และ technical

---

## Problem Statement

ในมุมของผู้ใช้ — **ผู้จัดการแบรนด์ (supplier/partner) ที่ฝากขายสินค้าในห้างเครือ Central**:

ระบบ **Supplier Connect** เดิมมีจุดแข็งชัดเจน: หารายงานได้ง่าย กรองข้อมูลได้ยืดหยุ่น เชื่อมต่อทุกสาขาในที่เดียว อัปเดตรายวัน และส่งออกรายงานได้หลากหลายรูปแบบ

แต่แม้จะมีข้อมูลครบ ระบบยังมีข้อจำกัดสำคัญ:

- **ต้องรู้ว่าจะถามอะไรก่อนถึงจะหาเจอ** — ผู้ใช้ต้องรู้ปัญหาก่อนถึงจะกรองหาได้ ระบบไม่บอกว่ามีปัญหาอยู่ที่ไหน
- **ตัวเลขเยอะแต่ไม่บอกว่า "ต้องทำอะไร"** — เห็น on_hand = 18 แต่ไม่รู้ว่าวิกฤตหรือปกติ ต้องตีความเอง
- **เปรียบเทียบข้ามสาขา × SKU พร้อมกันไม่ได้** — 8 สาขา × 6 SKU = 48 combinations ต้อง filter ทีละมิติ ไม่มีทางเห็น mismatch ทั้งหมดในคลิกเดียว
- **ไม่เตือนล่วงหน้า** — กว่าจะรู้ว่าสต็อกกำลังหมดก็เสียยอดขายไปแล้ว
- **ไม่มี AI เลยสักนิด** — ต่างจาก LUKE ที่มี forecast/anomaly อยู่แล้ว เป็น gap ที่สะอาด ไม่ทับของเดิม

---

## Solution

เพิ่ม **ชั้น AI (overlay)** ทับ Supplier Connect เดิม โดยแสดงเป็น webapp หน้าเดียวแบ่งสองฝั่ง **40:60**:

- **ฝั่งซ้าย (40%)** = Supplier Connect เดิมที่ใช้งานได้จริง มี filter และ table ครบ — เพื่อแสดงว่าเราเข้าใจและเคารพระบบเดิม ไม่ได้ทำให้ของเดิมดูด้อย
- **ฝั่งขวา (60%)** = AI overlay ที่ "พูดได้ เตือนได้ ลงมือได้" — พระเอกของ demo

**สาระสำคัญของ contrast:** ระบบเดิม *ต้องรู้ปัญหาก่อนถึงจะหาเจอ* — AI Layer *เจอปัญหาให้คุณก่อนที่คุณจะรู้ว่ามันมี*

จุดต่างจาก "ChatGPT ต่อ database" ทั่วไป:

1. **Proactive** — AI เด้งเตือนเองว่าสต็อกสาขาไหนเสี่ยงหมด/ค้าง โดยไม่ต้องถาม
2. **Grounded** — ทุกตัวเลขมาจาก query ฐานข้อมูลจริง (NL → tool call → DB → เรียบเรียง) ไม่เดา ถ้าไม่มีข้อมูลจะบอกว่าไม่มี
3. **Action** — ปิดวงจรด้วยการร่าง "ใบขอย้ายสต็อก" เป็น structured card ที่นำไปใช้ต่อได้ทันที

**Scenario หลักของ demo:** สต็อกไม่บาลานซ์ข้ามสาขา (cross-store stock imbalance) — RUN-A ที่ Central Siam เหลือ 18 คู่ (หมดใน ~1.5 วัน) ขณะที่ CentralWorld ค้าง 210 คู่

---

## User Stories

### กลุ่ม Layout และ Before/After Framing

1. ในฐานะกรรมการ ฉันอยากเห็น header chip ที่ระบุชัดว่าฝั่งซ้ายคือ `Supplier Connect (เดิม)` และฝั่งขวาคือ `+ AI Layer` เพื่อเข้าใจโครงสร้างของ demo ตั้งแต่วินาทีแรกโดยไม่ต้องมีใครอธิบาย
2. ในฐานะกรรมการ ฉันอยากให้ฝั่งซ้ายกว้าง 40% และฝั่งขวากว้าง 60% เพื่อให้รู้สึกชัดเจนว่า AI side คือพระเอก โดยยังเหลือพื้นที่ให้อ่าน table เดิมได้สบาย
3. ในฐานะผู้ใช้ ฉันอยากเห็น context ว่ากำลังเข้าระบบในนามแบรนด์ใด เพื่อให้รู้ว่าข้อมูลทั้งหมดเป็นของแบรนด์ตัวเอง

### กลุ่ม ฝั่งซ้าย — Supplier Connect เดิม

4. ในฐานะกรรมการ ฉันอยากเห็น 3 tabs บนฝั่งซ้าย (Stock / Sales / Goods Receive) เพื่อรู้ว่าระบบเดิมมีรายงานครบหลายประเภท
5. ในฐานะกรรมการ ฉันอยากให้ Stock tab เปิดเป็น default เพราะ AI proactive card กำลังพูดถึงสต็อก ทำให้ cross-panel ดู coherent ทันที
6. ในฐานะผู้ใช้ ฉันอยากกรอง Stock table ด้วย dropdown สองตัว (เลือกสาขา + เลือก SKU) พร้อม option "ทั้งหมด" เป็น default เพื่อแสดงว่าระบบเดิมมี filter ที่ใช้งานได้จริง
7. ในฐานะผู้ใช้ ฉันอยากให้ filter Store และ SKU ทำงานเหมือนกันทั้งสามแท็บ เพื่อความสม่ำเสมอในการใช้งาน
8. ในฐานะผู้ใช้ ฉันอยากกด toggle 7 วัน / 30 วัน / 90 วัน บน Sales tab เพื่อดูยอดขายรวมในช่วงเวลาที่ต้องการ และเห็นว่า data มีความลึกจริง
9. ในฐานะกรรมการ ฉันอยากเห็น Stock table แสดงคอลัมน์ Store / SKU / Stock on Hand / Stock on Order เพื่อเห็นภาพสต็อกทุกสาขาชัดเจน
10. ในฐานะกรรมการ ฉันอยากเห็น Sales table แสดงคอลัมน์ Store / Units Sold / Gross Sales / Total Discount / Net Sales เพื่อเห็นประสิทธิภาพการขายต่อสาขา
11. ในฐานะกรรมการ ฉันอยากเห็น Goods Receive table แสดงคอลัมน์ Receive Date / Total PO / Total Qty (PO) / Total Qty (Receive) / %QTY Receive เพื่อตรวจสอบความถูกต้องของ supply chain

### กลุ่ม Cross-Panel Highlight

12. ในฐานะกรรมการ ฉันอยากให้แถว RUN-A / Central Siam บน Stock table ซ้ายถูก highlight โดยอัตโนมัติเมื่อ proactive card แสดงบนขวา เพื่อเห็น before/after ทันทีโดยไม่ต้องไล่หาเอง
13. ในฐานะกรรมการ ฉันอยากเห็น subtle label บนแถวที่ถูก highlight เช่น "← AI กำลังพูดถึงแถวนี้" เพื่อเชื่อมโยงสองฝั่งชัดเจน

### กลุ่ม Proactive Insight (เด้งเอง)

14. ในฐานะผู้จัดการแบรนด์ ฉันอยากเห็น proactive card เด้งขึ้นมาเป็น first message ใน chat ทันทีที่เปิดหน้าจอ เพื่อรู้ปัญหาเร่งด่วนโดยไม่ต้องถาม
15. ในฐานะผู้จัดการแบรนด์ ฉันอยากให้ proactive card บอกว่า RUN-A ที่ Central Siam เหลือ 18 คู่ หมดใน ~1.5 วัน ขณะที่ CentralWorld ค้าง 210 คู่ เพื่อเห็นภาพ imbalance ทันที
16. ในฐานะผู้จัดการแบรนด์ ฉันอยากให้ proactive card มาพร้อม suggested chips 3 อัน (เช่น "ดูรายละเอียด RUN-A" / "เปรียบเทียบยอดข้ามเดือน" / "ช่วยร่างใบย้ายสต็อก") ติดกับ card เพื่อให้รู้ว่าจะ explore ต่ออย่างไร
17. ในฐานะผู้จัดการแบรนด์ ฉันอยากให้ระบบคำนวณ "อีกกี่วันของจะหมด" จากความเร็วการขายจริง เพื่อประเมินความเร่งด่วน
18. ในฐานะผู้จัดการแบรนด์ ฉันอยากให้คำเตือนมาพร้อมคำแนะนำที่ทำได้จริง (เช่น "ย้าย 80 คู่จาก CentralWorld ไป Central Siam") ไม่ใช่แค่บอกว่ามีปัญหา

### กลุ่ม Conversational Q&A (พิมพ์ถามเอง)

19. ในฐานะผู้จัดการแบรนด์ ฉันอยากพิมพ์ถามข้อมูลเป็นภาษาคนปกติ เพื่อไม่ต้องเรียนรู้วิธีใช้ dashboard ที่ซับซ้อน
20. ในฐานะผู้จัดการแบรนด์ ฉันอยากถามว่า "เดือนนี้สินค้าตัวไหนของฉันขายแย่ลง" เพื่อหาสินค้าที่มีปัญหา
21. ในฐานะผู้จัดการแบรนด์ ฉันอยากถามยอดขายของสาขาหรือสินค้าเจาะจง เพื่อดูรายละเอียด
22. ในฐานะผู้จัดการแบรนด์ ฉันอยากเปรียบเทียบยอดขายข้ามช่วงเวลา (เดือนนี้ vs เดือนก่อน) เพื่อดูแนวโน้ม
23. ในฐานะผู้จัดการแบรนด์ ฉันอยากถามว่าสินค้าตัวหนึ่งเหลือสต็อกเท่าไรในแต่ละสาขา เพื่อวางแผนการเติมของ
24. ในฐานะผู้จัดการแบรนด์ ฉันอยากเห็นคำตอบมาพร้อมตัวเลข/ตารางย่อ ไม่ใช่ข้อความเปล่าๆ เพื่อความน่าเชื่อถือ
25. ในฐานะผู้จัดการแบรนด์ ฉันอยากให้คำตอบทยอยแสดง (streaming) เพื่อให้รู้สึกลื่นและตอบสนองเร็ว

### กลุ่ม Action (ลงมือทำ)

26. ในฐานะผู้จัดการแบรนด์ ฉันอยากเห็นปุ่ม "ร่างใบขอย้ายสต็อก" ปรากฏขึ้นหลังจาก AI วิเคราะห์ stock imbalance ของ RUN-A เสร็จ เพื่อให้รู้สึกว่า AI ฉลาดพอที่จะรู้ว่าตอนนี้ฉันต้องการอะไร
27. ในฐานะผู้จัดการแบรนด์ เมื่อกดปุ่ม ฉันอยากเห็น structured card ใน chat ที่มี field แยกชัดเจน (SKU / จำนวน / สาขาต้นทาง / สาขาปลายทาง / วันที่ / เหตุผล) พร้อมปุ่ม Copy เพื่อนำไปใช้ต่อได้ทันที
28. ในฐานะผู้จัดการแบรนด์ ฉันอยากให้ตัวเลขในใบร่าง (เช่น ย้าย 80 คู่) มาจากการคำนวณจริงของ AI ไม่ใช่ค่าตายตัว

### กลุ่ม Trust / Transparency

29. ในฐานะกรรมการสาย technical ฉันอยากเห็น chip สีน้ำเงินอ่อน (เช่น `🔧 getStockRisk()`) ใต้ทุก AI response ที่มีการเรียก tool เพื่อมั่นใจว่าตัวเลขมาจาก query จริง ไม่ใช่ LLM เดา
30. ในฐานะผู้ใช้ ฉันอยากให้ AI ตอบว่า "ไม่มีข้อมูล" อย่างตรงไปตรงมาเมื่อข้อมูลไม่ครอบคลุม แทนที่จะเดาตัวเลขมั่ว
31. ในฐานะผู้ใช้ ฉันอยากให้ AI ปฏิเสธอย่างสุภาพและดึงกลับเข้าเรื่องเมื่อถูกถามนอกขอบเขต เพื่อให้ระบบน่าเชื่อถือ

---

## Implementation Decisions

### สถาปัตยกรรมหลัก

- AI **ไม่ตอบตัวเลขจากตัวเอง** — แปลงคำถามภาษาคนเป็น tool/function call → query ข้อมูลจาก mock DB → ส่งผลกลับให้ LLM เรียบเรียงเป็นภาษาคน (NL → tool call → DB → narrate)
- ใช้ Claude API พร้อม tool use + system prompt จำกัดขอบเขตให้ตอบเฉพาะข้อมูลขาย/สต็อก

### Layout

- **Split 40:60** (ซ้าย:ขวา) — ฝั่งซ้าย `Supplier Connect (เดิม)`, ฝั่งขวา `+ AI Layer`
- Header มี chip label บนทั้งสองฝั่ง แสดงตั้งแต่วินาทีแรก
- ไม่ responsive — demo บนจอใหญ่

### ฝั่งซ้าย (Before Panel)

- **4 tabs:** Stock · Sales · Goods Receive · 3D View — Stock เป็น active default
- **Filter:** 2 dropdown (Store + SKU) พร้อม "ทั้งหมด" เป็น default — ใช้ร่วมกันทุก tab
- **Period toggle บน Sales tab:** 3 ปุ่ม (7 วัน / 30 วัน / 90 วัน) — aggregate ยอดขายตาม period
- **Cross-highlight:** เมื่อ proactive card แสดง ระบบ auto-highlight แถวที่ตรงกันในตารางซ้าย พร้อม label ขนาดเล็ก
- **3D View tab:** 3D Bar Chart แสดง 48 combinations (8 สาขา × 6 SKU) พร้อมกัน — แกน X=สาขา, แกน Y=SKU, ความสูง=stock on hand, สี=days remaining (🔴 <7 วัน / 🟡 7–14 วัน / 🟢 ≥15 วัน) — คลิก bar → ยิงคำถามไป AI chat เพื่อวิเคราะห์และ draft ใบโอนสต็อก

### ฝั่งขวา (AI Layer Panel)

- **Proactive card** แสดงเป็น first message ใน chat history ทันทีที่โหลดหน้า
- Suggested chips 3 อันติดกับ proactive card
- Chat area ต่อเนื่องจาก proactive card เป็น conversation เดียวกัน
- **Action button** `ร่างใบขอย้ายสต็อก →` ปรากฏใต้ AI response เมื่อ AI วิเคราะห์ stock imbalance ของ RUN-A เสร็จ
- **Structured card** (draft transfer) แสดงใน chat มี field (SKU / จำนวน / ต้นทาง / ปลายทาง / วันที่ / เหตุผล) + ปุ่ม Copy
- **Trust chip** `🔧 tool_name()` สีน้ำเงินอ่อน ปรากฏใต้ทุก AI response ที่มีการเรียก tool

### Stack

- Next.js + Tailwind CSS (frontend + API route ในแอปเดียว)
- DeepSeek V4 Flash (tool use via OpenAI-compatible API) สำหรับชั้น LLM
- React Three Fiber + @react-three/drei สำหรับ 3D visualization
- Mock data เป็นไฟล์ TypeScript เดียว (อยู่ใน lib/mockData.ts แล้ว)
- Deploy บน Vercel — URL เดียว ไม่ต้องรันบนเครื่องตอน demo

### Tool Functions

- `getStockRisk()` → คู่สาขาที่เสี่ยงหมด/ค้าง (ป้อนการ์ด proactive + cross-highlight)
- `getSalesSummary(sku?, store?, period)` → สรุปยอดขายตามเงื่อนไข
- `getUnderperformers(period)` → SKU ที่ยอดตก MoM
- `getStockLevels(sku?, store?)` → สต็อกคงเหลือ
- `draftTransferRequest(sku, from, to, qty)` → ร่าง structured card ใบขอย้ายสต็อก

### Mock Data (Planted Stories)

- **Story 1 (Hero):** `RUN-A` ที่ Central Siam ขาย ~12 คู่/วัน เหลือ 18 → หมดใน ~1.5 วัน / CentralWorld ขาย ~1 คู่/วัน ค้าง 210 คู่ → ป้อน proactive card + cross-highlight + action
- **Story 2:** `TRL-Y` ยอดตก ~34% เทียบเดือนก่อน กระจุกที่ 3 สาขาภาคเหนือ → ป้อนฉาก period toggle (30 วัน vs 90 วัน) และคำถาม conversational
- **Story 3 (สุขภาพดี):** `LIF-1`, `KID-1` ขายสม่ำเสมอ สต็อกพอดี → พิสูจน์ว่า AI ไม่ตีตราทุกอย่างเป็นปัญหา

### Guardrails

- ถามนอกขอบเขต → ปฏิเสธสุภาพแล้วดึงกลับเข้าเรื่อง
- ข้อมูลไม่มี → ตอบ "ไม่มีข้อมูล" ไม่เดาตัวเลข

---

## Testing Decisions

**ลักษณะ test ที่ดี:** ทดสอบ "พฤติกรรมที่กรรมการจะเห็น" — input คำถาม → output คำตอบ + trust chip — ไม่ทดสอบรายละเอียดภายใน เตรียม rehearsal script ครอบทั้ง 3 ฉากก่อนวันจริง

**สิ่งที่ต้องทดสอบ (manual rehearsal):**

1. **Grounding correctness** — ยิงคำถามที่รู้คำตอบ เทียบตัวเลขจาก AI กับ mock data ว่าตรง และ trust chip แสดง tool name ที่ถูกต้อง
2. **Cross-highlight** — เปิดหน้าแล้ว proactive card เด้ง → แถว RUN-A/SY บนซ้ายต้องถูก highlight ทันทีทุกครั้ง
3. **"ไม่มีข้อมูล" path** — ถามสิ่งที่ data ไม่มี (เช่น ยอดปี 2019) ต้องได้ "ไม่มีข้อมูล" ไม่ใช่ตัวเลขมั่ว
4. **Off-scope path** — ถามนอกเรื่อง ต้องปฏิเสธสุภาพ
5. **Action flow** — หลัง AI วิเคราะห์ RUN-A เสร็จ → action button ปรากฏ → กดแล้ว structured card แสดงครบ field
6. **Period toggle** — สลับ 7/30/90 วัน บน Sales tab → ตัวเลขเปลี่ยนตาม period จริง
7. **Filter** — กรอง Store/SKU แล้ว table แสดงเฉพาะแถวที่เลือก

---

## Out of Scope

- ❌ ระบบ login จริง / authentication
- ❌ Role-aware หลาย persona — เหลือ persona เดียว (ผู้จัดการแบรนด์ Stride)
- ❌ การเชื่อมต่อระบบ Supplier Connect / WMS ของจริง (ใช้ mock ทั้งหมด)
- ❌ Cross-product copilot — เก็บไว้พูดเป็น "วิสัยทัศน์ปลายทาง" ตอน pitch เท่านั้น
- ❌ การ์ด action ที่ "ส่งคำสั่งจริง" — แค่ร่าง structured card พอ
- ❌ Mobile responsive — demo บนจอใหญ่
- ❌ Forecast/anomaly แบบ ML จริง — ใช้ rule-based query เหนือ mock data
- ❌ Expandable trust panel (ดู raw query result) — chip แสดง tool name เพียงพอสำหรับ demo
- ❌ Date range picker อิสระ — ใช้ 3-button toggle พอ

---

## Further Notes

- **Dependency ที่ต้องปิดก่อนวัน pitch:** ผู้ทำต้องท่องคำตอบรับมือกรรมการเทคนิค 4 ข้อให้ลื่น โดยเฉพาะ "ตัวเลขมาจากไหน" (NL → tool call → DB → narrate) และ "ใหม่ตรงไหน" (ระบบเดิมต้องรู้ปัญหาก่อนถึงจะหาเจอ / AI เจอให้ก่อน)
- **Hero demo flow (Flow C):** เปิดจอ → proactive card เด้ง + cross-highlight → กรรมการพิมพ์คำถามเอง → AI query + trust chip → action button ปรากฏ → กด → structured card ร่างใบย้ายสต็อก
- **ตรงกับ core value RIS:** Innovation + Customer Centricity + End-to-End Solutions และสอดคล้องกับ architecture "LLM Overlay"
- เอกสาร decision log เต็ม: [DECISION-LOG-grill-me.md](./DECISION-LOG-grill-me.md)
