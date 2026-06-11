export type Branch = {
  branch_id: string;
  branch_name: string;
  region: "BKK" | "North" | "East" | "South";
};

export type SKU = {
  sku_id: string;
  sku_name: string;
  category: string;
};

export type StockRecord = {
  branch_id: string;
  sku_id: string;
  on_hand: number;
  avg_daily_sales: number; // units/day
  days_of_stock: number;
};

export type SalesRecord = {
  branch_id: string;
  sku_id: string;
  month: string; // "YYYY-MM"
  units_sold: number;
};

export type GoodsReceiveRecord = {
  branch_id: string;
  sku_id: string;
  date: string; // "YYYY-MM-DD"
  units_received: number;
};

// ────────────────────────────────────────────────
// Reference data
// ────────────────────────────────────────────────

export const BRANCHES: Branch[] = [
  { branch_id: "CSM", branch_name: "Central Siam", region: "BKK" },
  { branch_id: "CWD", branch_name: "CentralWorld", region: "BKK" },
  { branch_id: "CPN", branch_name: "CentralPlaza Chiang Mai", region: "North" },
  { branch_id: "CMB", branch_name: "Maya Chiang Mai", region: "North" },
  { branch_id: "LPG", branch_name: "Central Lampang", region: "North" },
  { branch_id: "PTY", branch_name: "Central Pattaya", region: "East" },
  { branch_id: "PKT", branch_name: "Central Phuket", region: "South" },
  { branch_id: "HYI", branch_name: "Central Hat Yai", region: "South" },
];

export const SKUS: SKU[] = [
  { sku_id: "RUN-A", sku_name: "Running Shoe Alpha", category: "Footwear" },
  { sku_id: "TRL-Y", sku_name: "Trail Shoe Yellow", category: "Footwear" },
  { sku_id: "LIF-1", sku_name: "Lifestyle Sneaker 1", category: "Footwear" },
  { sku_id: "KID-1", sku_name: "Kids Runner 1", category: "Footwear" },
  { sku_id: "SOC-B", sku_name: "Performance Sock Black", category: "Accessories" },
  { sku_id: "BAG-M", sku_name: "Running Bag Medium", category: "Accessories" },
];

// ────────────────────────────────────────────────
// Stock snapshot (current)
// Story 1: RUN-A — CSM critically low, CWD overstocked
// Story 2: TRL-Y — normal stock across branches (demand slump = future overstock risk)
// Story 3: LIF-1, KID-1 — balanced
// ────────────────────────────────────────────────

export const STOCK: StockRecord[] = [
  // RUN-A ─ Hero story
  { branch_id: "CSM", sku_id: "RUN-A", on_hand: 18,  avg_daily_sales: 12,  days_of_stock: 1.5 },
  { branch_id: "CWD", sku_id: "RUN-A", on_hand: 210, avg_daily_sales: 1,   days_of_stock: 210 },
  { branch_id: "CPN", sku_id: "RUN-A", on_hand: 45,  avg_daily_sales: 3,   days_of_stock: 15 },
  { branch_id: "CMB", sku_id: "RUN-A", on_hand: 38,  avg_daily_sales: 2.5, days_of_stock: 15.2 },
  { branch_id: "LPG", sku_id: "RUN-A", on_hand: 22,  avg_daily_sales: 1.5, days_of_stock: 14.7 },
  { branch_id: "PTY", sku_id: "RUN-A", on_hand: 30,  avg_daily_sales: 2,   days_of_stock: 15 },
  { branch_id: "PKT", sku_id: "RUN-A", on_hand: 28,  avg_daily_sales: 2,   days_of_stock: 14 },
  { branch_id: "HYI", sku_id: "RUN-A", on_hand: 20,  avg_daily_sales: 1.5, days_of_stock: 13.3 },

  // TRL-Y ─ sales slump story (stock looks ok now, demand has dropped ~34%)
  { branch_id: "CSM", sku_id: "TRL-Y", on_hand: 60,  avg_daily_sales: 4,   days_of_stock: 15 },
  { branch_id: "CWD", sku_id: "TRL-Y", on_hand: 55,  avg_daily_sales: 3.5, days_of_stock: 15.7 },
  { branch_id: "CPN", sku_id: "TRL-Y", on_hand: 72,  avg_daily_sales: 2.2, days_of_stock: 32.7 },
  { branch_id: "CMB", sku_id: "TRL-Y", on_hand: 68,  avg_daily_sales: 2.0, days_of_stock: 34 },
  { branch_id: "LPG", sku_id: "TRL-Y", on_hand: 65,  avg_daily_sales: 1.8, days_of_stock: 36.1 },
  { branch_id: "PTY", sku_id: "TRL-Y", on_hand: 50,  avg_daily_sales: 3.2, days_of_stock: 15.6 },
  { branch_id: "PKT", sku_id: "TRL-Y", on_hand: 48,  avg_daily_sales: 3.0, days_of_stock: 16 },
  { branch_id: "HYI", sku_id: "TRL-Y", on_hand: 42,  avg_daily_sales: 2.8, days_of_stock: 15 },

  // LIF-1 ─ healthy story
  { branch_id: "CSM", sku_id: "LIF-1", on_hand: 80,  avg_daily_sales: 5,   days_of_stock: 16 },
  { branch_id: "CWD", sku_id: "LIF-1", on_hand: 75,  avg_daily_sales: 5,   days_of_stock: 15 },
  { branch_id: "CPN", sku_id: "LIF-1", on_hand: 50,  avg_daily_sales: 3,   days_of_stock: 16.7 },
  { branch_id: "CMB", sku_id: "LIF-1", on_hand: 48,  avg_daily_sales: 3,   days_of_stock: 16 },
  { branch_id: "LPG", sku_id: "LIF-1", on_hand: 35,  avg_daily_sales: 2.2, days_of_stock: 15.9 },
  { branch_id: "PTY", sku_id: "LIF-1", on_hand: 45,  avg_daily_sales: 2.8, days_of_stock: 16.1 },
  { branch_id: "PKT", sku_id: "LIF-1", on_hand: 50,  avg_daily_sales: 3.2, days_of_stock: 15.6 },
  { branch_id: "HYI", sku_id: "LIF-1", on_hand: 40,  avg_daily_sales: 2.5, days_of_stock: 16 },

  // KID-1 ─ healthy story
  { branch_id: "CSM", sku_id: "KID-1", on_hand: 60,  avg_daily_sales: 4,   days_of_stock: 15 },
  { branch_id: "CWD", sku_id: "KID-1", on_hand: 55,  avg_daily_sales: 3.5, days_of_stock: 15.7 },
  { branch_id: "CPN", sku_id: "KID-1", on_hand: 40,  avg_daily_sales: 2.5, days_of_stock: 16 },
  { branch_id: "CMB", sku_id: "KID-1", on_hand: 38,  avg_daily_sales: 2.4, days_of_stock: 15.8 },
  { branch_id: "LPG", sku_id: "KID-1", on_hand: 30,  avg_daily_sales: 2,   days_of_stock: 15 },
  { branch_id: "PTY", sku_id: "KID-1", on_hand: 35,  avg_daily_sales: 2.2, days_of_stock: 15.9 },
  { branch_id: "PKT", sku_id: "KID-1", on_hand: 38,  avg_daily_sales: 2.4, days_of_stock: 15.8 },
  { branch_id: "HYI", sku_id: "KID-1", on_hand: 33,  avg_daily_sales: 2.1, days_of_stock: 15.7 },

  // SOC-B
  { branch_id: "CSM", sku_id: "SOC-B", on_hand: 200, avg_daily_sales: 12, days_of_stock: 16.7 },
  { branch_id: "CWD", sku_id: "SOC-B", on_hand: 180, avg_daily_sales: 11, days_of_stock: 16.4 },
  { branch_id: "CPN", sku_id: "SOC-B", on_hand: 120, avg_daily_sales: 7.5, days_of_stock: 16 },
  { branch_id: "CMB", sku_id: "SOC-B", on_hand: 110, avg_daily_sales: 7,  days_of_stock: 15.7 },
  { branch_id: "LPG", sku_id: "SOC-B", on_hand: 90,  avg_daily_sales: 5.5, days_of_stock: 16.4 },
  { branch_id: "PTY", sku_id: "SOC-B", on_hand: 130, avg_daily_sales: 8,  days_of_stock: 16.3 },
  { branch_id: "PKT", sku_id: "SOC-B", on_hand: 140, avg_daily_sales: 8.5, days_of_stock: 16.5 },
  { branch_id: "HYI", sku_id: "SOC-B", on_hand: 100, avg_daily_sales: 6.2, days_of_stock: 16.1 },

  // BAG-M
  { branch_id: "CSM", sku_id: "BAG-M", on_hand: 30,  avg_daily_sales: 2,   days_of_stock: 15 },
  { branch_id: "CWD", sku_id: "BAG-M", on_hand: 28,  avg_daily_sales: 1.8, days_of_stock: 15.6 },
  { branch_id: "CPN", sku_id: "BAG-M", on_hand: 20,  avg_daily_sales: 1.3, days_of_stock: 15.4 },
  { branch_id: "CMB", sku_id: "BAG-M", on_hand: 18,  avg_daily_sales: 1.2, days_of_stock: 15 },
  { branch_id: "LPG", sku_id: "BAG-M", on_hand: 15,  avg_daily_sales: 1,   days_of_stock: 15 },
  { branch_id: "PTY", sku_id: "BAG-M", on_hand: 22,  avg_daily_sales: 1.4, days_of_stock: 15.7 },
  { branch_id: "PKT", sku_id: "BAG-M", on_hand: 25,  avg_daily_sales: 1.6, days_of_stock: 15.6 },
  { branch_id: "HYI", sku_id: "BAG-M", on_hand: 18,  avg_daily_sales: 1.2, days_of_stock: 15 },
];

// ────────────────────────────────────────────────
// Monthly sales — last 2 months
// TRL-Y northern branches: April ~34% higher than May (reflecting ~34% drop)
// ────────────────────────────────────────────────

export const SALES: SalesRecord[] = [
  // RUN-A
  { branch_id: "CSM", sku_id: "RUN-A", month: "2026-05", units_sold: 360 },
  { branch_id: "CSM", sku_id: "RUN-A", month: "2026-04", units_sold: 350 },
  { branch_id: "CWD", sku_id: "RUN-A", month: "2026-05", units_sold: 30 },
  { branch_id: "CWD", sku_id: "RUN-A", month: "2026-04", units_sold: 32 },
  { branch_id: "CPN", sku_id: "RUN-A", month: "2026-05", units_sold: 90 },
  { branch_id: "CPN", sku_id: "RUN-A", month: "2026-04", units_sold: 88 },
  { branch_id: "CMB", sku_id: "RUN-A", month: "2026-05", units_sold: 75 },
  { branch_id: "CMB", sku_id: "RUN-A", month: "2026-04", units_sold: 72 },
  { branch_id: "LPG", sku_id: "RUN-A", month: "2026-05", units_sold: 45 },
  { branch_id: "LPG", sku_id: "RUN-A", month: "2026-04", units_sold: 44 },
  { branch_id: "PTY", sku_id: "RUN-A", month: "2026-05", units_sold: 60 },
  { branch_id: "PTY", sku_id: "RUN-A", month: "2026-04", units_sold: 58 },
  { branch_id: "PKT", sku_id: "RUN-A", month: "2026-05", units_sold: 60 },
  { branch_id: "PKT", sku_id: "RUN-A", month: "2026-04", units_sold: 58 },
  { branch_id: "HYI", sku_id: "RUN-A", month: "2026-05", units_sold: 45 },
  { branch_id: "HYI", sku_id: "RUN-A", month: "2026-04", units_sold: 43 },

  // TRL-Y — North branches drop ~34% (Apr→May)
  { branch_id: "CSM", sku_id: "TRL-Y", month: "2026-05", units_sold: 120 },
  { branch_id: "CSM", sku_id: "TRL-Y", month: "2026-04", units_sold: 118 },
  { branch_id: "CWD", sku_id: "TRL-Y", month: "2026-05", units_sold: 105 },
  { branch_id: "CWD", sku_id: "TRL-Y", month: "2026-04", units_sold: 102 },
  { branch_id: "CPN", sku_id: "TRL-Y", month: "2026-05", units_sold: 44 },  // was 67 → -34%
  { branch_id: "CPN", sku_id: "TRL-Y", month: "2026-04", units_sold: 67 },
  { branch_id: "CMB", sku_id: "TRL-Y", month: "2026-05", units_sold: 40 },  // was 61 → -34%
  { branch_id: "CMB", sku_id: "TRL-Y", month: "2026-04", units_sold: 61 },
  { branch_id: "LPG", sku_id: "TRL-Y", month: "2026-05", units_sold: 36 },  // was 55 → -34%
  { branch_id: "LPG", sku_id: "TRL-Y", month: "2026-04", units_sold: 55 },
  { branch_id: "PTY", sku_id: "TRL-Y", month: "2026-05", units_sold: 96 },
  { branch_id: "PTY", sku_id: "TRL-Y", month: "2026-04", units_sold: 94 },
  { branch_id: "PKT", sku_id: "TRL-Y", month: "2026-05", units_sold: 90 },
  { branch_id: "PKT", sku_id: "TRL-Y", month: "2026-04", units_sold: 88 },
  { branch_id: "HYI", sku_id: "TRL-Y", month: "2026-05", units_sold: 84 },
  { branch_id: "HYI", sku_id: "TRL-Y", month: "2026-04", units_sold: 82 },

  // LIF-1 — steady
  { branch_id: "CSM", sku_id: "LIF-1", month: "2026-05", units_sold: 150 },
  { branch_id: "CSM", sku_id: "LIF-1", month: "2026-04", units_sold: 148 },
  { branch_id: "CWD", sku_id: "LIF-1", month: "2026-05", units_sold: 150 },
  { branch_id: "CWD", sku_id: "LIF-1", month: "2026-04", units_sold: 147 },
  { branch_id: "CPN", sku_id: "LIF-1", month: "2026-05", units_sold: 90 },
  { branch_id: "CPN", sku_id: "LIF-1", month: "2026-04", units_sold: 88 },
  { branch_id: "CMB", sku_id: "LIF-1", month: "2026-05", units_sold: 90 },
  { branch_id: "CMB", sku_id: "LIF-1", month: "2026-04", units_sold: 89 },
  { branch_id: "LPG", sku_id: "LIF-1", month: "2026-05", units_sold: 66 },
  { branch_id: "LPG", sku_id: "LIF-1", month: "2026-04", units_sold: 65 },
  { branch_id: "PTY", sku_id: "LIF-1", month: "2026-05", units_sold: 84 },
  { branch_id: "PTY", sku_id: "LIF-1", month: "2026-04", units_sold: 83 },
  { branch_id: "PKT", sku_id: "LIF-1", month: "2026-05", units_sold: 96 },
  { branch_id: "PKT", sku_id: "LIF-1", month: "2026-04", units_sold: 95 },
  { branch_id: "HYI", sku_id: "LIF-1", month: "2026-05", units_sold: 75 },
  { branch_id: "HYI", sku_id: "LIF-1", month: "2026-04", units_sold: 74 },

  // KID-1 — steady
  { branch_id: "CSM", sku_id: "KID-1", month: "2026-05", units_sold: 120 },
  { branch_id: "CSM", sku_id: "KID-1", month: "2026-04", units_sold: 118 },
  { branch_id: "CWD", sku_id: "KID-1", month: "2026-05", units_sold: 105 },
  { branch_id: "CWD", sku_id: "KID-1", month: "2026-04", units_sold: 103 },
  { branch_id: "CPN", sku_id: "KID-1", month: "2026-05", units_sold: 75 },
  { branch_id: "CPN", sku_id: "KID-1", month: "2026-04", units_sold: 74 },
  { branch_id: "CMB", sku_id: "KID-1", month: "2026-05", units_sold: 72 },
  { branch_id: "CMB", sku_id: "KID-1", month: "2026-04", units_sold: 71 },
  { branch_id: "LPG", sku_id: "KID-1", month: "2026-05", units_sold: 60 },
  { branch_id: "LPG", sku_id: "KID-1", month: "2026-04", units_sold: 59 },
  { branch_id: "PTY", sku_id: "KID-1", month: "2026-05", units_sold: 66 },
  { branch_id: "PTY", sku_id: "KID-1", month: "2026-04", units_sold: 65 },
  { branch_id: "PKT", sku_id: "KID-1", month: "2026-05", units_sold: 72 },
  { branch_id: "PKT", sku_id: "KID-1", month: "2026-04", units_sold: 71 },
  { branch_id: "HYI", sku_id: "KID-1", month: "2026-05", units_sold: 63 },
  { branch_id: "HYI", sku_id: "KID-1", month: "2026-04", units_sold: 62 },

  // SOC-B
  { branch_id: "CSM", sku_id: "SOC-B", month: "2026-05", units_sold: 360 },
  { branch_id: "CSM", sku_id: "SOC-B", month: "2026-04", units_sold: 355 },
  { branch_id: "CWD", sku_id: "SOC-B", month: "2026-05", units_sold: 330 },
  { branch_id: "CWD", sku_id: "SOC-B", month: "2026-04", units_sold: 325 },
  { branch_id: "CPN", sku_id: "SOC-B", month: "2026-05", units_sold: 225 },
  { branch_id: "CPN", sku_id: "SOC-B", month: "2026-04", units_sold: 222 },
  { branch_id: "CMB", sku_id: "SOC-B", month: "2026-05", units_sold: 210 },
  { branch_id: "CMB", sku_id: "SOC-B", month: "2026-04", units_sold: 207 },
  { branch_id: "LPG", sku_id: "SOC-B", month: "2026-05", units_sold: 165 },
  { branch_id: "LPG", sku_id: "SOC-B", month: "2026-04", units_sold: 162 },
  { branch_id: "PTY", sku_id: "SOC-B", month: "2026-05", units_sold: 240 },
  { branch_id: "PTY", sku_id: "SOC-B", month: "2026-04", units_sold: 237 },
  { branch_id: "PKT", sku_id: "SOC-B", month: "2026-05", units_sold: 255 },
  { branch_id: "PKT", sku_id: "SOC-B", month: "2026-04", units_sold: 250 },
  { branch_id: "HYI", sku_id: "SOC-B", month: "2026-05", units_sold: 186 },
  { branch_id: "HYI", sku_id: "SOC-B", month: "2026-04", units_sold: 183 },

  // BAG-M
  { branch_id: "CSM", sku_id: "BAG-M", month: "2026-05", units_sold: 60 },
  { branch_id: "CSM", sku_id: "BAG-M", month: "2026-04", units_sold: 58 },
  { branch_id: "CWD", sku_id: "BAG-M", month: "2026-05", units_sold: 54 },
  { branch_id: "CWD", sku_id: "BAG-M", month: "2026-04", units_sold: 53 },
  { branch_id: "CPN", sku_id: "BAG-M", month: "2026-05", units_sold: 39 },
  { branch_id: "CPN", sku_id: "BAG-M", month: "2026-04", units_sold: 38 },
  { branch_id: "CMB", sku_id: "BAG-M", month: "2026-05", units_sold: 36 },
  { branch_id: "CMB", sku_id: "BAG-M", month: "2026-04", units_sold: 35 },
  { branch_id: "LPG", sku_id: "BAG-M", month: "2026-05", units_sold: 30 },
  { branch_id: "LPG", sku_id: "BAG-M", month: "2026-04", units_sold: 29 },
  { branch_id: "PTY", sku_id: "BAG-M", month: "2026-05", units_sold: 42 },
  { branch_id: "PTY", sku_id: "BAG-M", month: "2026-04", units_sold: 41 },
  { branch_id: "PKT", sku_id: "BAG-M", month: "2026-05", units_sold: 48 },
  { branch_id: "PKT", sku_id: "BAG-M", month: "2026-04", units_sold: 47 },
  { branch_id: "HYI", sku_id: "BAG-M", month: "2026-05", units_sold: 36 },
  { branch_id: "HYI", sku_id: "BAG-M", month: "2026-04", units_sold: 35 },
];

// ────────────────────────────────────────────────
// Goods Receive — last 30 days sample
// ────────────────────────────────────────────────

export const GOODS_RECEIVE: GoodsReceiveRecord[] = [
  // RUN-A replenishments
  { branch_id: "CSM", sku_id: "RUN-A", date: "2026-05-15", units_received: 120 },
  { branch_id: "CWD", sku_id: "RUN-A", date: "2026-05-10", units_received: 60 },
  { branch_id: "CPN", sku_id: "RUN-A", date: "2026-05-18", units_received: 60 },
  { branch_id: "CMB", sku_id: "RUN-A", date: "2026-05-18", units_received: 50 },
  { branch_id: "LPG", sku_id: "RUN-A", date: "2026-05-20", units_received: 36 },
  { branch_id: "PTY", sku_id: "RUN-A", date: "2026-05-17", units_received: 45 },
  { branch_id: "PKT", sku_id: "RUN-A", date: "2026-05-17", units_received: 42 },
  { branch_id: "HYI", sku_id: "RUN-A", date: "2026-05-19", units_received: 36 },

  // TRL-Y — North branches received normal quantities despite slowing sales
  { branch_id: "CSM", sku_id: "TRL-Y", date: "2026-05-12", units_received: 120 },
  { branch_id: "CWD", sku_id: "TRL-Y", date: "2026-05-12", units_received: 110 },
  { branch_id: "CPN", sku_id: "TRL-Y", date: "2026-05-14", units_received: 90 },
  { branch_id: "CMB", sku_id: "TRL-Y", date: "2026-05-14", units_received: 85 },
  { branch_id: "LPG", sku_id: "TRL-Y", date: "2026-05-15", units_received: 80 },
  { branch_id: "PTY", sku_id: "TRL-Y", date: "2026-05-13", units_received: 100 },
  { branch_id: "PKT", sku_id: "TRL-Y", date: "2026-05-13", units_received: 95 },
  { branch_id: "HYI", sku_id: "TRL-Y", date: "2026-05-16", units_received: 88 },

  // LIF-1
  { branch_id: "CSM", sku_id: "LIF-1", date: "2026-05-20", units_received: 100 },
  { branch_id: "CWD", sku_id: "LIF-1", date: "2026-05-20", units_received: 100 },
  { branch_id: "CPN", sku_id: "LIF-1", date: "2026-05-21", units_received: 60 },
  { branch_id: "CMB", sku_id: "LIF-1", date: "2026-05-21", units_received: 60 },
  { branch_id: "LPG", sku_id: "LIF-1", date: "2026-05-22", units_received: 44 },
  { branch_id: "PTY", sku_id: "LIF-1", date: "2026-05-21", units_received: 55 },
  { branch_id: "PKT", sku_id: "LIF-1", date: "2026-05-21", units_received: 64 },
  { branch_id: "HYI", sku_id: "LIF-1", date: "2026-05-22", units_received: 50 },

  // KID-1
  { branch_id: "CSM", sku_id: "KID-1", date: "2026-05-20", units_received: 75 },
  { branch_id: "CWD", sku_id: "KID-1", date: "2026-05-20", units_received: 70 },
  { branch_id: "CPN", sku_id: "KID-1", date: "2026-05-21", units_received: 50 },
  { branch_id: "CMB", sku_id: "KID-1", date: "2026-05-21", units_received: 48 },
  { branch_id: "LPG", sku_id: "KID-1", date: "2026-05-22", units_received: 38 },
  { branch_id: "PTY", sku_id: "KID-1", date: "2026-05-21", units_received: 44 },
  { branch_id: "PKT", sku_id: "KID-1", date: "2026-05-21", units_received: 48 },
  { branch_id: "HYI", sku_id: "KID-1", date: "2026-05-22", units_received: 42 },
];
