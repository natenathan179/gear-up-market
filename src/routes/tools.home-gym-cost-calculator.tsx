import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ResultCard, Segmented, ToolShell, toolHead, tools } from "@/components/site/ToolKit";
import { usd } from "@/lib/price-index";

const tool = tools.find((t) => t.path === "/tools/home-gym-cost-calculator")!;
const title = "Home Gym Cost Calculator – How Much Does a Home Gym Cost?";
const description =
  "Free home gym cost calculator: choose your equipment and budget, mid-range or premium quality to estimate the total cost of a home gym, item by item.";

const faqs = [
  {
    q: "How much does a basic home gym cost?",
    a: "A basic barbell setup — rack, bar, around 300 lb of plates, a bench and flooring — typically costs about $1,100–$1,500 new at budget quality. Adding cardio machines or a cable station is what pushes most home gyms past $3,000.",
  },
  {
    q: "Is it cheaper to buy used gym equipment?",
    a: "Usually, yes. Racks, plates, dumbbells and commercial cardio machines hold up for decades, so the used market offers commercial-grade equipment for less than new home-grade gear. Compare real prices in our used gym equipment price index.",
  },
  {
    q: "What should I buy first for a home gym?",
    a: "For strength training, a power rack, barbell, plates and an adjustable bench cover nearly every major lift. Add flooring to protect the floor and equipment, then expand with dumbbells, a cable attachment or a cardio machine.",
  },
  {
    q: "Where do these price ranges come from?",
    a: "They are typical new retail price ranges for the US market at each quality tier, rounded for planning. Actual prices vary by brand, sales and shipping — treat the result as a budgeting estimate, not a quote.",
  },
];

export const Route = createFileRoute("/tools/home-gym-cost-calculator")({
  head: () => toolHead(tool, title, description, faqs),
  component: CostCalculator,
});

type Tier = "budget" | "mid" | "premium";

// Typical new retail ranges (USD), rounded for planning purposes.
const ITEMS: { id: string; name: string; note: string; price: Record<Tier, number> }[] = [
  {
    id: "rack",
    name: "Power rack / squat rack",
    note: "with safety arms",
    price: { budget: 350, mid: 750, premium: 1600 },
  },
  {
    id: "bar",
    name: "Olympic barbell",
    note: "20 kg / 45 lb",
    price: { budget: 150, mid: 300, premium: 550 },
  },
  {
    id: "plates",
    name: "Weight plates",
    note: "≈300 lb set",
    price: { budget: 350, mid: 650, premium: 1100 },
  },
  {
    id: "bench",
    name: "Adjustable bench",
    note: "flat / incline",
    price: { budget: 150, mid: 350, premium: 700 },
  },
  {
    id: "dumbbells",
    name: "Dumbbells",
    note: "adjustable pair or small fixed set",
    price: { budget: 300, mid: 550, premium: 1000 },
  },
  {
    id: "flooring",
    name: "Rubber flooring",
    note: "≈100 sq ft",
    price: { budget: 200, mid: 400, premium: 750 },
  },
  {
    id: "cable",
    name: "Cable machine / functional trainer",
    note: "",
    price: { budget: 900, mid: 2500, premium: 5000 },
  },
  {
    id: "treadmill",
    name: "Treadmill",
    note: "",
    price: { budget: 800, mid: 2000, premium: 5000 },
  },
  {
    id: "bike",
    name: "Exercise bike",
    note: "spin or upright",
    price: { budget: 350, mid: 1000, premium: 2500 },
  },
  {
    id: "rower",
    name: "Rowing machine",
    note: "",
    price: { budget: 350, mid: 1000, premium: 1600 },
  },
  {
    id: "kettlebells",
    name: "Kettlebells",
    note: "3-bell starter set",
    price: { budget: 120, mid: 250, premium: 450 },
  },
  {
    id: "accessories",
    name: "Accessories",
    note: "bands, collars, mats, storage",
    price: { budget: 100, mid: 250, premium: 500 },
  },
];

const DEFAULT_SELECTED = ["rack", "bar", "plates", "bench", "flooring"];

function CostCalculator() {
  const [tier, setTier] = useState<Tier>("mid");
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);

  const chosen = ITEMS.filter((i) => selected.includes(i.id));
  const total = chosen.reduce((s, i) => s + i.price[tier], 0);

  return (
    <ToolShell
      tool={tool}
      intro="Tick the equipment you want, pick a quality level, and see an itemised estimate of what your home gym will cost."
      faqs={faqs}
      aside={
        <>
          <h2>Cutting the cost of a home gym</h2>
          <p>
            The estimate uses new retail prices. Buying used is the single biggest saving:
            commercial racks, plates and cardio machines are built for years of heavy gym use, so a
            used commercial piece often outlasts a new home-grade one. See what equipment actually
            sells for in our{" "}
            <Link
              to={"/used-gym-equipment-prices" as never}
              className="font-semibold text-primary hover:underline"
            >
              used gym equipment price index
            </Link>
            , or browse{" "}
            <Link
              to={"/used-gym-equipment" as never}
              className="font-semibold text-primary hover:underline"
            >
              used gym equipment for sale
            </Link>
            .
          </p>
          <p>
            Before you buy, check everything fits with the{" "}
            <Link
              to={"/tools/gym-space-calculator" as never}
              className="font-semibold text-primary hover:underline"
            >
              gym space calculator
            </Link>
            .
          </p>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <Segmented
            label="Quality level"
            value={tier}
            onChange={setTier}
            options={[
              { value: "budget", label: "Budget" },
              { value: "mid", label: "Mid-range" },
              { value: "premium", label: "Premium" },
            ]}
          />
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
                        {i.note && (
                          <span className="block text-xs text-muted-foreground">{i.note}</span>
                        )}
                      </span>
                      <span
                        className={`text-sm tabular-nums ${on ? "font-bold text-foreground" : "text-muted-foreground"}`}
                      >
                        {usd(i.price[tier])}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ResultCard
            label="Estimated total"
            value={usd(total)}
            note={`${chosen.length} item${chosen.length === 1 ? "" : "s"} · new retail, ${
              tier === "mid" ? "mid-range" : tier
            } quality`}
          />
          <div className="border border-border p-4 text-sm">
            <p className="font-bold text-foreground">Same list at other levels</p>
            <dl className="mt-2 space-y-1">
              {(["budget", "mid", "premium"] as Tier[]).map((t) => (
                <div key={t} className="flex justify-between">
                  <dt className="text-muted-foreground capitalize">
                    {t === "mid" ? "Mid-range" : t}
                  </dt>
                  <dd className="font-semibold tabular-nums text-foreground">
                    {usd(chosen.reduce((s, i) => s + i.price[t], 0))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
