# สรุป Issues — Supplier Connect AI Layer

## แผนผัง dependency

```
#01 ตั้งโปรเจกต์ + layout + mock data
 ├── #02 ฝั่งซ้าย: ตาราง + filter
 │    └── #07 cross-panel highlight ──────┐
 ├── #03 ฝั่งซ้าย: 3D View                │
 │    └── #09 3D→chat click ──────────────┤
 └── #04 AI backend + tool functions       │
      └── #05 proactive card ─────────────┘
           └── #06 chat + streaming + trust chips
                ├── #08 ร่างใบขอย้ายสต็อก
                └── #09 3D→chat click
```

## การแบ่งงาน 4 คน

| Slice | เจ้าของ | ช่วงเวลา |
|-------|---------|----------|
| #01 ตั้งโปรเจกต์ | ทุกคน (pair) | วันที่ 1 เช้า |
| #02 ตาราง + filter | P1 | วันที่ 1–2 |
| #03 3D View | P2 | วันที่ 1–2 |
| #04 AI backend | P3 | วันที่ 1–2 |
| #05 proactive card | P3 | วันที่ 2 (หลัง #04) |
| #06 chat + streaming | P4 | วันที่ 2–3 (หลัง #05) |
| #07 cross-panel highlight | P1 | วันที่ 2–3 (หลัง #02+#05) |
| #08 ร่างใบขอย้ายสต็อก | P3 | วันที่ 3 (หลัง #06) |
| #09 3D→chat click | P2 | วันที่ 3 (หลัง #03+#06) |

> P3 ทำ #04 → #05 → #08 ตามลำดับ (sequential)
> P4 รอ #05 เสร็จแล้วทำ #06

## รายการไฟล์

| # | ไฟล์ | สถานะ |
|---|------|-------|
| 01 | [01-scaffold-layout-mock-data.md](./01-scaffold-layout-mock-data.md) | เปิด |
| 02 | [02-left-panel-tables-filters.md](./02-left-panel-tables-filters.md) | เปิด |
| 03 | [03-left-panel-3d-view.md](./03-left-panel-3d-view.md) | เปิด |
| 04 | [04-ai-backend-api-tools.md](./04-ai-backend-api-tools.md) | เปิด |
| 05 | [05-proactive-card.md](./05-proactive-card.md) | เปิด |
| 06 | [06-chat-streaming-trust-chips.md](./06-chat-streaming-trust-chips.md) | เปิด |
| 07 | [07-cross-panel-highlight.md](./07-cross-panel-highlight.md) | เปิด |
| 08 | [08-action-draft-transfer-card.md](./08-action-draft-transfer-card.md) | เปิด |
| 09 | [09-3d-bar-click-to-chat.md](./09-3d-bar-click-to-chat.md) | เปิด |
