// Turns a filled-in copy of scripts/data/product-weights-TEMPLATE.csv into a
// ready-to-run SQL file. Run with:
//   bun run scripts/apply-product-weights.ts scripts/data/product-weights.csv
//
// This doesn't write to the database itself — updating existing rows needs
// an authenticated/service-role connection, which isn't something this repo
// has credentials for (only the public anon key, which can only read
// products; see supabase/migrations for the RLS policies). Instead it
// produces scripts/data/apply-product-weights.sql for you to paste into
// Supabase's SQL Editor (Project > SQL Editor) and run once.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

interface Row {
  id: string;
  slug: string;
  weight_lbs: string;
}

function parseCsv(text: string): Row[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = lines[0]!.split(",");
  const idCol = header.indexOf("id");
  const slugCol = header.indexOf("slug");
  const weightCol = header.indexOf("weight_lbs");
  if (idCol === -1 || weightCol === -1) {
    throw new Error("CSV must have id and weight_lbs columns (see the TEMPLATE file's header).");
  }

  return lines.slice(1).map((line) => {
    // Minimal CSV split that respects quoted fields (brand/model/title
    // contain commas and quotes) — good enough for this fixed-shape file.
    const cells: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i]!;
      if (inQuotes) {
        if (ch === '"' && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cur += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        cells.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    cells.push(cur);
    return { id: cells[idCol]!, slug: cells[slugCol] ?? "", weight_lbs: cells[weightCol]! };
  });
}

function main() {
  const inputArg = process.argv[2];
  if (!inputArg) {
    console.error("Usage: bun run scripts/apply-product-weights.ts <path-to-filled-csv>");
    process.exit(1);
  }
  const inputPath = resolve(process.cwd(), inputArg);
  const rows = parseCsv(readFileSync(inputPath, "utf8"));

  const updates: string[] = [];
  const skipped: string[] = [];
  const invalid: string[] = [];

  for (const row of rows) {
    const raw = row.weight_lbs.trim();
    if (raw === "") {
      skipped.push(row.slug);
      continue;
    }
    const weight = Number(raw);
    if (!Number.isFinite(weight) || weight <= 0) {
      invalid.push(`${row.slug} (got "${raw}")`);
      continue;
    }
    updates.push(
      `update public.products set weight_lbs = ${weight} where id = '${row.id}'; -- ${row.slug}`,
    );
  }

  if (invalid.length > 0) {
    console.error(`Refusing to run: ${invalid.length} row(s) have a non-numeric weight:`);
    for (const line of invalid) console.error(`  ${line}`);
    process.exit(1);
  }

  const outPath = resolve(import.meta.dirname, "data", "apply-product-weights.sql");
  writeFileSync(outPath, updates.join("\n") + "\n");

  console.log(`Wrote ${updates.length} update statement(s) to ${outPath}`);
  if (skipped.length > 0) {
    console.log(
      `${skipped.length} product(s) still have no weight and were left out (still blank in the source CSV):`,
    );
    for (const slug of skipped) console.log(`  ${slug}`);
  }
  console.log(
    "\nNext: open the Supabase dashboard's SQL Editor, paste the file's contents, and run it.",
  );
}

main();
