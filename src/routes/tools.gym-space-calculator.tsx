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

const tool = tools.find((t) => t.path === "/tools/gym-space-calculator")!;
const title = "Home Gym Space Calculator – Will My Equipment Fit?";
const description =
  "Free gym space calculator: enter your room size and ceiling height, choose your equipment, and see whether it fits with the safety clearance each machine needs.";

const faqs = [
  {
    q: "How much space do I need for a home gym?",
    a: "A rack-and-barbell setup with a bench needs roughly 8 × 10 ft once you allow for the bar length and room to load plates. Each cardio machine adds about 40–80 sq ft with its safety clearance, so a well-rounded home gym usually needs 150–250 sq ft.",
  },
  {
    q: "How much clearance does a treadmill need?",
    a: "A common safety guideline is about 2 m (79 in) of clear space behind a treadmill and roughly 0.5 m (20 in) on each side, so a fall or stumble doesn't throw you into a wall or another machine. This calculator includes that clearance in the treadmill's space.",
  },
  {
    q: "What ceiling height do I need for overhead pressing?",
    a: "As a rule of thumb, allow your own height plus about 2 ft for standing overhead presses, and add the height of any platform. Pull-ups need enough room above the bar for your head — usually a bar mounted at least a foot below the ceiling.",
  },
  {
    q: "Does the calculator account for room layout?",
    a: "It compares total floor area, including each item's clearance, against your room — a quick check of whether everything can fit. Doors, windows, columns and awkward room shapes can still make a layout tight, so sketch the final placement before you buy.",
  },
];

export const Route = createFileRoute("/tools/gym-space-calculator")({
  head: () => toolHead(tool, title, description, faqs),
  component: SpaceCalculator,
});

// Footprint (L × W, inches) plus the clearance commonly recommended around each
// piece in use. `space` = (L + clearance) × (W + clearance), converted to sq ft.
const ITEMS: { id: string; name: string; footprint: string; clearance: string; space: number }[] = [
  {
    id: "rack",
    name: "Power rack + Olympic barbell",
    footprint: "48 × 86 in (bar length)",
    clearance: "36 in in front, 12 in each side",
    space: 64,
  },
  {
    id: "bench",
    name: "Free-standing bench",
    footprint: "54 × 24 in",
    clearance: "24 in all round",
    space: 51,
  },
  {
    id: "treadmill",
    name: "Treadmill",
    footprint: "80 × 35 in",
    clearance: "79 in behind, 20 in each side",
    space: 83,
  },
  {
    id: "bike",
    name: "Exercise bike",
    footprint: "48 × 24 in",
    clearance: "20 in all round",
    space: 39,
  },
  {
    id: "rower",
    name: "Rowing machine",
    footprint: "96 × 24 in",
    clearance: "20 in all round",
    space: 60,
  },
  {
    id: "elliptical",
    name: "Elliptical",
    footprint: "80 × 30 in",
    clearance: "20 in all round",
    space: 58,
  },
  {
    id: "cable",
    name: "Functional trainer / cable machine",
    footprint: "64 × 52 in",
    clearance: "48 in in front, 20 in each side",
    space: 72,
  },
  {
    id: "dumbbells",
    name: "Dumbbell rack",
    footprint: "50 × 20 in",
    clearance: "36 in in front",
    space: 20,
  },
  {
    id: "open",
    name: "Open floor area",
    footprint: "Stretching, kettlebells, mat work",
    clearance: "6 × 6 ft",
    space: 36,
  },
];

const DEFAULT_SELECTED = ["rack", "dumbbells", "open"];

function SpaceCalculator() {
  const [unit, setUnit] = useState<"ft" | "m">("ft");
  const [length, setLength] = useState(16);
  const [width, setWidth] = useState(12);
  const [ceiling, setCeiling] = useState(8);
  const [height, setHeight] = useState(5.9);
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const switchUnit = (u: "ft" | "m") => {
    if (u === unit) return;
    const f = u === "m" ? 0.3048 : 1 / 0.3048;
    const r = (n: number) => Math.round(n * f * 10) / 10;
    setLength(r(length));
    setWidth(r(width));
    setCeiling(r(ceiling));
    setHeight(r(height));
    setUnit(u);
  };

  const toFt = (n: number) => (unit === "m" ? n / 0.3048 : n);
  const sqUnit = unit === "m" ? "m²" : "sq ft";
  const fromSqFt = (n: number) => (unit === "m" ? n * 0.092903 : n);
  const fmtArea = (sqft: number) => `${Math.round(fromSqFt(sqft))} ${sqUnit}`;

  const valid = [length, width, ceiling, height].every((n) => Number.isFinite(n) && n > 0);
  const room = valid ? toFt(length) * toFt(width) : 0;
  const chosen = ITEMS.filter((i) => selected.includes(i.id));
  const needed = chosen.reduce((s, i) => s + i.space, 0);
  const pct = room ? Math.round((needed / room) * 100) : 0;

  const ceilingFt = toFt(ceiling);
  const heightFt = toFt(height);
  const warnings: string[] = [];
  if (valid && selected.includes("rack") && ceilingFt < heightFt + 2) {
    warnings.push(
      "Ceiling may be too low for standing overhead presses — allow about your height + 2 ft.",
    );
  }
  if (valid && selected.includes("treadmill") && ceilingFt < heightFt + 1.5) {
    warnings.push(
      "Ceiling is tight for a treadmill — the deck raises you 8–10 in and you rise with each stride.",
    );
  }
  if (valid && selected.includes("rack") && Math.max(toFt(length), toFt(width)) < 8) {
    warnings.push(
      "An Olympic barbell is about 7 ft 2 in long — the room needs at least 8 ft in one direction to load it.",
    );
  }

  const verdict = !valid
    ? { label: "—", note: "Enter your room dimensions." }
    : pct <= 70
      ? {
          label: "Fits comfortably",
          note: `Uses about ${pct}% of the floor, leaving room to move and add more.`,
        }
      : pct <= 100
        ? {
            label: "Tight fit",
            note: `Uses about ${pct}% of the floor — workable, but plan the layout carefully.`,
          }
        : {
            label: "Won't fit",
            note: `Needs about ${pct}% of the available floor. Remove an item or find a larger space.`,
          };

  return (
    <ToolShell
      tool={tool}
      intro="Enter your room size, pick your equipment, and check whether it all fits — including the safety clearance each machine needs in use."
      faqs={faqs}
      aside={
        <>
          <h2>Planning a home gym layout</h2>
          <p>
            Put the rack where you have the most length, since the barbell overhangs it on both
            sides. Keep treadmills away from walls behind them, and group machines you use together.
            Once you know what fits, estimate the budget with the{" "}
            <Link
              to={"/tools/home-gym-cost-calculator" as never}
              className="font-semibold text-primary hover:underline"
            >
              home gym cost calculator
            </Link>{" "}
            or browse{" "}
            <Link
              to={"/home-gym-equipment" as never}
              className="font-semibold text-primary hover:underline"
            >
              home gym equipment
            </Link>
            .
          </p>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <Segmented
            label="Units"
            value={unit}
            onChange={switchUnit}
            options={[
              { value: "ft", label: "Feet" },
              { value: "m", label: "Metres" },
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              id="room-length"
              label="Room length"
              value={length}
              onChange={setLength}
              suffix={unit}
              step={0.5}
            />
            <NumberField
              id="room-width"
              label="Room width"
              value={width}
              onChange={setWidth}
              suffix={unit}
              step={0.5}
            />
            <NumberField
              id="room-ceiling"
              label="Ceiling height"
              value={ceiling}
              onChange={setCeiling}
              suffix={unit}
              step={0.1}
            />
            <NumberField
              id="user-height"
              label="Your height"
              value={height}
              onChange={setHeight}
              suffix={unit}
              step={0.1}
            />
          </div>
          <fieldset>
            <legend className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              Equipment
            </legend>
            <ul className="mt-2 divide-y divide-border border border-border">
              {ITEMS.map((i) => {
                const on = selected.includes(i.id);
                return (
                  <li key={i.id}>
                    <label className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-secondary">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setSelected((s) => (on ? s.filter((x) => x !== i.id) : [...s, i.id]))
                        }
                        className="size-4 accent-primary"
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-foreground">
                          {i.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {i.footprint} · clearance: {i.clearance}
                        </span>
                      </span>
                      <span className="text-sm whitespace-nowrap text-muted-foreground tabular-nums">
                        {fmtArea(i.space)}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ResultCard label="Result" value={verdict.label} note={verdict.note} />
          {valid && (
            <div className="border border-border p-4 text-sm">
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Room floor area</dt>
                  <dd className="font-semibold tabular-nums text-foreground">{fmtArea(room)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Space needed</dt>
                  <dd className="font-semibold tabular-nums text-foreground">{fmtArea(needed)}</dd>
                </div>
              </dl>
              <div className="mt-3 h-2 w-full bg-secondary" aria-hidden="true">
                <div
                  className={`h-2 ${pct > 100 ? "bg-destructive" : "bg-primary"}`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>
            </div>
          )}
          {warnings.map((w) => (
            <p
              key={w}
              className="border-l-4 border-destructive bg-secondary p-3 text-sm text-foreground"
            >
              {w}
            </p>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}
