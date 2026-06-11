CREATE TABLE IF NOT EXISTS branches (
  branch_id   TEXT PRIMARY KEY,
  branch_name TEXT NOT NULL,
  region      TEXT NOT NULL CHECK (region IN ('BKK', 'North', 'East', 'South'))
);

CREATE TABLE IF NOT EXISTS skus (
  sku_id    TEXT PRIMARY KEY,
  sku_name  TEXT NOT NULL,
  category  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stock (
  branch_id        TEXT NOT NULL REFERENCES branches(branch_id),
  sku_id           TEXT NOT NULL REFERENCES skus(sku_id),
  on_hand          NUMERIC NOT NULL,
  avg_daily_sales  NUMERIC NOT NULL,
  days_of_stock    NUMERIC NOT NULL,
  PRIMARY KEY (branch_id, sku_id)
);

CREATE TABLE IF NOT EXISTS sales (
  branch_id   TEXT    NOT NULL REFERENCES branches(branch_id),
  sku_id      TEXT    NOT NULL REFERENCES skus(sku_id),
  month       TEXT    NOT NULL, -- YYYY-MM
  units_sold  NUMERIC NOT NULL,
  PRIMARY KEY (branch_id, sku_id, month)
);

CREATE TABLE IF NOT EXISTS goods_receive (
  id              SERIAL PRIMARY KEY,
  branch_id       TEXT    NOT NULL REFERENCES branches(branch_id),
  sku_id          TEXT    NOT NULL REFERENCES skus(sku_id),
  date            DATE    NOT NULL,
  units_received  NUMERIC NOT NULL
);
