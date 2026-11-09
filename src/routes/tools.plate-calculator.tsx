import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  NumberField,
  ResultCard,
  Segmented,
  ToolShell,
  toolHead,
  tools,
} from "@/components/site/ToolKit";

const tool = tools.find((t) => t.path === "/tools/plate-calculator")!;
const title = "Barbell Plate Calculator – What Plates to Load (lb & kg)";
const description =
  "Free barbell plate calculator: enter your target weight and bar, choose the plates you own, and see exactly which plates go on each side. Works in pounds and kilograms.";

const faqs = [
  {
    q: "How much does an Olympic barbell weigh?",
    a: "A standard men's Olympic barbell weighs 20 kg (44 lb), commonly rounded to 45 lb in US gyms. A women's Olympic bar weighs 15 kg (33 lb, often called 35 lb). Technique bars and many home-gym bars weigh less, so check yours.",
  },
  {
    q: "Should I count the collars?",
    a: "Spring clips weigh almost nothing, but competition collars weigh 2.5 kg each (5 kg per pair). If you use heavy collars, turn on the collar option so the calculator subtracts their weight.",
  },
  {
    q: "Why can't the calculator hit my exact target?",
    a: "You can only load in steps of twice your smallest plate (one on each side). If the target can't be reached exactly with the plates you've selected, the calculator loads the closest weight below it and tells you the difference.",
  },
  {
    q: "What plates should a home gym have?",
    a: "A practical starter set in pounds is 2×45, 2×25, 2×10, 2×5 and 2×2.5, with extra 45s as you get stronger. Fractional plates (1.25 lb or 0.5 kg) help with small jumps on presses.",
  },
];

export const Route = createFileRoute("/tools/plate-calculator")({
  head: () => toolHead(tool, title, description, faqs),
  component: PlateCalculator,
});

type Unit = "lb" | "kg";

const PLATES: Record<Unit, number[]> = {
  lb: [55, 45, 35, 25, 10, 5, 2.5, 1.25],
  kg: [25, 20, 15, 10, 5, 2.5, 1.25, 0.5],
};
const DEFAULT_ON: Record<Unit, number[]> = {
  lb: [45, 35, 25, 10, 5, 2.5],
  kg: [25, 20, 15, 10, 5, 2.5, 1.25],
};
const BARS: Record<Unit, { value: string; label: string }[]> = {
  lb: [
    { value: "45", label: "45 lb" },
    { value: "35", label: "35 lb" },
    { value: "25", label: "25 lb" },
    { value: "15", label: "15 lb" },
  ],
  kg: [
    { value: "20", label: "20 kg" },
    { value: "15", label: "15 kg" },
    { value: "10", label: "10 kg" },
  ],
};
// Bumper-plate style colours (IWF scheme) so the bar diagram reads at a glance.
const PLATE_STYLE: Record<number, { h: string; c: string }> = {
  55: { h: "h-28", c: "bg-red-600 text-white" },
  25: { h: "h-28", c: "bg-red-600 text-white" },
  45: { h: "h-28", c: "bg-blue-600 text-white" },
  20: { h: "h-28", c: "bg-blue-600 text-white" },
  35: { h: "h-24", c: "bg-yellow-400 text-zinc-900" },
  15: { h: "h-24", c: "bg-yellow-400 text-zinc-900" },
  10: { h: "h-20", c: "bg-green-600 text-white" },
  5: { h: "h-16", c: "bg-zinc-200 border border-zinc-400 text-zinc-900" },
  2.5: { h: "h-12", c: "bg-zinc-800 text-white" },
  1.25: { h: "h-10", c: "bg-zinc-400 text-zinc-900" },
  0.5: { h: "h-8", c: "bg-zinc-300 text-zinc-900" },
};

function loadPlates(perSide: number, available: number[]) {
  const result: number[] = [];
  let remaining = Math.round(perSide * 100) / 100;
  for (const p of [...available].sort((a, b) => b - a)) {
    while (remaining + 1e-9 >= p) {
      result.push(p);
      remaining = Math.round((remaining - p) * 100) / 100;
    }
  }
  return { result, leftover: remaining };
}

function PlateCalculator() {
  const [unit, setUnit] = useState<Unit>("lb");
  const [target, setTarget] = useState(225);
  const [bar, setBar] = useState("45");
  const [collars, setCollars] = useState(false);
  const [available, setAvailable] = useState<number[]>(DEFAULT_ON.lb);

  const switchUnit = (u: Unit) => {
    setUnit(u);
    setBar(u === "kg" ? "20" : "45");
    setAvailable(DEFAULT_ON[u]);
    setTarget(u === "kg" ? 100 : 225);
  };

  const barWeight = Number(bar);
  const collarWeight = collars ? (unit === "kg" ? 5 : 11) : 0;
  const base = barWeight + collarWeight;
  const valid = Number.isFinite(target) && target >= base;
  const { result, leftover } = valid
    ? loadPlates((target - base) / 2, available)
    : { result: [], leftover: 0 };
  const loaded = base + result.reduce((s, p) => s + p, 0) * 2;

  const counts = result.reduce<Record<string, number>>((acc, p) => {
    acc[p] = (acc[p] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <ToolShell
      tool={tool}
      intro="Enter the weight you want on the bar and the calculator shows exactly which plates to load on each side — no more mental arithmetic between sets."
      faqs={faqs}
      aside={
        <>
          <h2>Building out your plate set</h2>
          <p>
            Most lifters outgrow a starter set within a year. Used commercial plates are one of the
            best-value purchases in a home gym — they hold up for decades. Browse{" "}
            <Link
              to={"/free-weights" as never}
              className="font-semibold text-primary hover:underline"
            >
              weight plates and free weights
            </Link>{" "}
            or check typical prices in our{" "}
            <Link
              to={"/used-gym-equipment-prices" as never}
              className="font-semibold text-primary hover:underline"
            >
              used gym equipment price index
            </Link>
            .
          </p>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Segmented
            label="Units"
            value={unit}
            onChange={switchUnit}
            options={[
              { value: "lb", label: "Pounds (lb)" },
              { value: "kg", label: "Kilograms (kg)" },
            ]}
          />
          <NumberField
            id="plate-target"
            label="Target weight"
            value={target}
            onChange={setTarget}
            suffix={unit}
            step={unit === "kg" ? 0.5 : 2.5}
          />
          <Segmented label="Bar weight" value={bar} onChange={setBar} options={BARS[unit]} />
          <label className="flex items-center gap-3 text-sm text-foreground">
            <input
              type="checkbox"
              checked={collars}
              onChange={(e) => setCollars(e.target.checked)}
              className="size-4 accent-primary"
            />
            Using competition collars ({unit === "kg" ? "2.5 kg" : "5.5 lb"} each)
          </label>
          <fieldset>
            <legend className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              Plates you have
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {PLATES[unit].map((p) => {
                const on = available.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setAvailable((a) => (on ? a.filter((x) => x !== p) : [...a, p]))}
                    className={`min-w-14 border px-3 py-2 text-sm font-semibold ${
                      on
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="space-y-4">
          <ResultCard
            label="Load per side"
            value={
              !valid
                ? "—"
                : result.length
                  ? Object.entries(counts)
                      .sort((a, b) => Number(b[0]) - Number(a[0]))
                      .map(([p, n]) => (n > 1 ? `${n}×${p}` : p))
                      .join(" + ")
                  : "Empty bar"
            }
            note={
              !valid
                ? `Target must be at least the bar${collars ? " and collars" : ""} (${base} ${unit}).`
                : leftover > 0
                  ? `Closest possible: ${loaded} ${unit} (${(target - loaded).toFixed(2).replace(/\.?0+$/, "")} ${unit} short with these plates).`
                  : `Total on the bar: ${loaded} ${unit}.`
            }
          />
          {valid && (
            <div
              className="flex h-32 items-center overflow-x-auto border border-border bg-secondary px-4"
              aria-label="Diagram of one side of the barbell"
              role="img"
            >
              <span className="h-3 w-10 shrink-0 bg-zinc-500" />
              <span className="h-8 w-2 shrink-0 bg-zinc-600" />
              {result.map((p, i) => (
                <span
                  key={i}
                  className={`mx-px flex w-4 shrink-0 items-center justify-center rounded-sm text-[9px] font-bold [writing-mode:vertical-rl] ${PLATE_STYLE[p]?.h ?? "h-16"} ${PLATE_STYLE[p]?.c ?? "bg-zinc-700 text-white"}`}
                >
                  {p}
                </span>
              ))}
              <span className="h-3 min-w-10 flex-1 bg-zinc-500" />
            </div>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
