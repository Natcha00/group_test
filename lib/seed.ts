import sql from "./db";
import { BRANCHES, SKUS, STOCK, SALES, GOODS_RECEIVE } from "./mockData";

async function seed() {
  console.log("Seeding database...");

  await sql`
    CREATE TABLE IF NOT EXISTS branches (
      branch_id   TEXT PRIMARY KEY,
      branch_name TEXT NOT NULL,
      region      TEXT NOT NULL CHECK (region IN ('BKK', 'North', 'East', 'South'))
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS skus (
      sku_id    TEXT PRIMARY KEY,
      sku_name  TEXT NOT NULL,
      category  TEXT NOT NULL
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS stock (
      branch_id        TEXT NOT NULL REFERENCES branches(branch_id),
      sku_id           TEXT NOT NULL REFERENCES skus(sku_id),
      on_hand          NUMERIC NOT NULL,
      avg_daily_sales  NUMERIC NOT NULL,
      days_of_stock    NUMERIC NOT NULL,
      PRIMARY KEY (branch_id, sku_id)
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS sales (
      branch_id   TEXT    NOT NULL REFERENCES branches(branch_id),
      sku_id      TEXT    NOT NULL REFERENCES skus(sku_id),
      month       TEXT    NOT NULL,
      units_sold  NUMERIC NOT NULL,
      PRIMARY KEY (branch_id, sku_id, month)
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS goods_receive (
      id              SERIAL PRIMARY KEY,
      branch_id       TEXT    NOT NULL REFERENCES branches(branch_id),
      sku_id          TEXT    NOT NULL REFERENCES skus(sku_id),
      date            DATE    NOT NULL,
      units_received  NUMERIC NOT NULL
    )
  `;

  for (const b of BRANCHES) {
    await sql`
      INSERT INTO branches ${sql(b)}
      ON CONFLICT (branch_id) DO UPDATE SET
        branch_name = EXCLUDED.branch_name,
        region      = EXCLUDED.region
    `;
  }
  console.log(`  branches: ${BRANCHES.length} rows`);

  for (const s of SKUS) {
    await sql`
      INSERT INTO skus ${sql(s)}
      ON CONFLICT (sku_id) DO UPDATE SET
        sku_name = EXCLUDED.sku_name,
        category = EXCLUDED.category
    `;
  }
  console.log(`  skus: ${SKUS.length} rows`);

  for (const r of STOCK) {
    await sql`
      INSERT INTO stock ${sql(r)}
      ON CONFLICT (branch_id, sku_id) DO UPDATE SET
        on_hand         = EXCLUDED.on_hand,
        avg_daily_sales = EXCLUDED.avg_daily_sales,
        days_of_stock   = EXCLUDED.days_of_stock
    `;
  }
  console.log(`  stock: ${STOCK.length} rows`);

  for (const r of SALES) {
    await sql`
      INSERT INTO sales ${sql(r)}
      ON CONFLICT (branch_id, sku_id, month) DO UPDATE SET
        units_sold = EXCLUDED.units_sold
    `;
  }
  console.log(`  sales: ${SALES.length} rows`);

  await sql`TRUNCATE goods_receive RESTART IDENTITY`;
  for (const r of GOODS_RECEIVE) {
    await sql`INSERT INTO goods_receive ${sql(r)}`;
  }
  console.log(`  goods_receive: ${GOODS_RECEIVE.length} rows`);

  console.log("Done.");
  await sql.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
