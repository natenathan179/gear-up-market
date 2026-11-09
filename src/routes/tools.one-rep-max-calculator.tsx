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

const tool = tools.find((t) => t.path === "/tools/one-rep-max-calculator")!;
const title = "One-Rep Max Calculator (1RM) – Free Strength Calculator";
const description =
  "Free one-rep max calculator: enter the weight and reps from any set to estimate your 1RM with the Epley, Brzycki and Lombardi formulas, plus a full training-percentage chart.";

const faqs = [
  {
    q: "How accurate is a one-rep max calculator?",
    a: "Estimates are most accurate from sets of 2–6 reps taken close to failure, typically landing within about 5% of a tested max. Accuracy drops above 10 reps because endurance starts to matter more than maximal strength.",
  },
  {
    q: "Which 1RM formula is best?",
    a: "No single formula wins for every lifter or lift. Epley tends to read slightly high at higher reps and Brzycki slightly low, so this calculator shows each one and uses their average as the headline estimate.",
  },
  {
    q: "Is it safe to test a true one-rep max?",
    a: "Testing a true max carries more injury risk than an estimate, especially without a spotter or safety arms. For most training purposes an estimated 1RM is enough to set working weights. If you do test, warm up thoroughly and lift inside a rack with safeties set.",
  },
  {
    q: "How do I use the percentage chart?",
    a: "Most programs prescribe working sets as a percentage of 1RM — for example 3×5 at 80%. Find the percentage in the chart to get the weight, then round to the nearest load your plates allow.",
  },
];

export const Route = createFileRoute("/tools/one-rep-max-calculator")({
  head: () => toolHead(tool, title, description, faqs),
  component: OneRepMax,
});

const formulas = [
  { name: "Epley", fn: (w: number, r: number) => w * (1 + r / 30) },
  { name: "Brzycki", fn: (w: number, r: number) => (w * 36) / (37 - r) },
  { name: "Lombardi", fn: (w: number, r: number) => w * Math.pow(r, 0.1) },
];

const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
// Approximate reps achievable at each %1RM (inverse Epley), for orientation.
const repsAt = (pct: number) => (pct >= 100 ? 1 : Math.max(1, Math.round(30 * (100 / pct - 1))));

function OneRepMax() {
  const [unit, setUnit] = useState<"lb" | "kg">("lb");
  const [weight, setWeight] = useState(185);
  const [reps, setReps] = useState(5);

  const valid =
    Number.isFinite(weight) && weight > 0 && Number.isFinite(reps) && reps >= 1 && reps <= 15;
  const estimates = valid
    ? formulas.map((f) => ({ name: f.name, value: reps === 1 ? weight : f.fn(weight, reps) }))
    : [];
  const oneRm = estimates.length
    ? estimates.reduce((s, e) => s + e.value, 0) / estimates.length
    : 0;
  const round = (n: number) => (unit === "kg" ? Math.round(n * 2) / 2 : Math.round(n));

  return (
    <ToolShell
      tool={tool}
      intro="Enter the weight and reps from a hard set to estimate the most you could lift for a single rep — then use the chart to set your training weights."
      faqs={faqs}
      aside={
        <>
          <h2>How the estimate works</h2>
          <p>
            The calculator applies three well-established strength formulas — Epley, Brzycki and
            Lombardi — to the set you enter and averages them. Use a set you took close to failure
            with good form; an easy set of 5 will underestimate your max.
          </p>
          <p>
            Training at home? A sturdy{" "}
            <Link
              to={"/strength-equipment" as never}
              className="font-semibold text-primary hover:underline"
            >
              power rack with safety arms
            </Link>{" "}
            makes heavy sets far safer when you train without a spotter.
          </p>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <Segmented
            label="Units"
            value={unit}
            onChange={setUnit}
            options={[
              { value: "lb", label: "Pounds (lb)" },
              { value: "kg", label: "Kilograms (kg)" },
            ]}
          />
          <NumberField
            id="orm-weight"
            label="Weight lifted"
            value={weight}
            onChange={setWeight}
            suffix={unit}
            step={unit === "kg" ? 0.5 : 1}
          />
          <NumberField
            id="orm-reps"
            label="Reps completed (1–15)"
            value={reps}
            onChange={setReps}
            min={1}
          />
          {!valid && (
            <p className="text-sm font-semibold text-destructive">
              Enter a weight above zero and between 1 and 15 reps.
            </p>
          )}
        </div>
        <div className="space-y-4">
          <ResultCard
            label="Estimated one-rep max"
            value={valid ? `${round(oneRm)} ${unit}` : "—"}
            note={valid ? "Average of three formulas" : undefined}
          />
          {valid && (
            <dl className="grid grid-cols-3 gap-2 text-center">
              {estimates.map((e) => (
                <div key={e.name} className="border border-border p-3">
                  <dt className="text-xs text-muted-foreground">{e.name}</dt>
                  <dd className="font-bold tabular-nums text-foreground">
                    {round(e.value)} {unit}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {valid && (
        <div className="mt-10 overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <caption className="sr-only">Training weights by percentage of one-rep max</caption>
            <thead className="bg-secondary text-left text-xs font-bold tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3">% of 1RM</th>
                <th className="px-4 py-3 text-right">Weight</th>
                <th className="px-4 py-3 text-right">Approx. reps</th>
              </tr>
            </thead>
            <tbody>
              {percentages.map((p) => (
                <tr key={p} className="border-t border-border">
                  <td className="px-4 py-2.5 font-semibold text-foreground">{p}%</td>
                  <td className="px-4 py-2.5 text-right font-bold tabular-nums text-foreground">
                    {round((oneRm * p) / 100)} {unit}
                  </td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground tabular-nums">
                    {repsAt(p)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ToolShell>
  );
}
