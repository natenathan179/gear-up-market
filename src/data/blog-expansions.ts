import type { BlogBodySection } from "@/data/blog";

import { equipmentExpansionsA } from "@/data/expansions-equipment-a";
import { equipmentExpansionsB } from "@/data/expansions-equipment-b";
import { equipmentExpansionsC } from "@/data/expansions-equipment-c";
import { equipmentExpansionsD } from "@/data/expansions-equipment-d";
import { equipmentExpansionsE } from "@/data/expansions-equipment-e";
import { equipmentExpansionsF } from "@/data/expansions-equipment-f";
import { equipmentExpansionsG } from "@/data/expansions-equipment-g";
import { equipmentExpansionsH } from "@/data/expansions-equipment-h";
import { exerciseExpansions } from "@/data/expansions-exercise";
import { programExpansions } from "@/data/expansions-programs";
import { programExpansionsB } from "@/data/expansions-programs-b";
import { priceSpecialtyExpansions } from "@/data/expansions-prices-specialty";
import { priceSpecialtyExpansionsB } from "@/data/expansions-prices-specialty-b";
import { specialtyGoalExpansions } from "@/data/expansions-specialty-goals";
import { specialtyGoalExpansionsB } from "@/data/expansions-specialty-goals-b";
import { brandBusinessExpansions } from "@/data/expansions-brands-business";
import { brandBusinessExpansionsB } from "@/data/expansions-brands-business-b";
import { brandBusinessExpansionsC } from "@/data/expansions-brands-business-c";
import { proteinExpansionsA } from "@/data/expansions-protein-a";
import { proteinExpansionsB } from "@/data/expansions-protein-b";
import { proteinExpansionsC } from "@/data/expansions-protein-c";
import { creatineExpansions } from "@/data/expansions-creatine";
import { creatinePreExpansions } from "@/data/expansions-creatine-pre";
import { ingredientExpansions } from "@/data/expansions-ingredients";
import { ingredientExpansionsB } from "@/data/expansions-ingredients-b";
import { suppCloseExpansionsA } from "@/data/expansions-supp-close-a";
import { suppCloseExpansionsB } from "@/data/expansions-supp-close-b";
import { suppCloseExpansionsC } from "@/data/expansions-supp-close-c";
import { fatLossExpansions } from "@/data/expansions-fat-loss";
import { wellnessExpansions } from "@/data/expansions-wellness";
import { safetyCreatineExpansions } from "@/data/expansions-safety-creatine";
import { nutritionExpansions } from "@/data/expansions-nutrition";
import { nutritionExpansionsB } from "@/data/expansions-nutrition-b";
import { audienceExpansions } from "@/data/expansions-audiences";
import { suppUseExpansions } from "@/data/expansions-supp-use";
import { preStackExpansions } from "@/data/expansions-pre-stacks";
import { suppBrandExpansions } from "@/data/expansions-supp-brands";
import { healthExpansions } from "@/data/expansions-health";
import { recoveryBusinessExpansions } from "@/data/expansions-recovery-business";
import { finalExpansionsA } from "@/data/expansions-final-a";
import { finalExpansionsB } from "@/data/expansions-final-b";
import { finalExpansionsC } from "@/data/expansions-final-c";
import { finalExpansionsD } from "@/data/expansions-final-d";

// Long-form sections that bring every post past ~500 words of unique, on-topic
// copy. Each file maps post slug → extra body sections; a slug can appear in
// more than one file and its sections are concatenated in import order.
const sources: Record<string, BlogBodySection[]>[] = [
  equipmentExpansionsA,
  equipmentExpansionsB,
  equipmentExpansionsC,
  equipmentExpansionsD,
  equipmentExpansionsE,
  equipmentExpansionsF,
  equipmentExpansionsG,
  equipmentExpansionsH,
  exerciseExpansions,
  programExpansions,
  programExpansionsB,
  priceSpecialtyExpansions,
  priceSpecialtyExpansionsB,
  specialtyGoalExpansions,
  specialtyGoalExpansionsB,
  brandBusinessExpansions,
  brandBusinessExpansionsB,
  brandBusinessExpansionsC,
  proteinExpansionsA,
  proteinExpansionsB,
  proteinExpansionsC,
  creatineExpansions,
  creatinePreExpansions,
  ingredientExpansions,
  ingredientExpansionsB,
  suppCloseExpansionsA,
  suppCloseExpansionsB,
  suppCloseExpansionsC,
  fatLossExpansions,
  wellnessExpansions,
  safetyCreatineExpansions,
  nutritionExpansions,
  nutritionExpansionsB,
  audienceExpansions,
  suppUseExpansions,
  preStackExpansions,
  suppBrandExpansions,
  healthExpansions,
  recoveryBusinessExpansions,
  finalExpansionsA,
  finalExpansionsB,
  finalExpansionsC,
  finalExpansionsD,
];

export const postExpansions: Record<string, BlogBodySection[]> = {};
for (const source of sources) {
  for (const [slug, sections] of Object.entries(source)) {
    postExpansions[slug] = [...(postExpansions[slug] ?? []), ...sections];
  }
}
