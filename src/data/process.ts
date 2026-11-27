export interface ProcessStep {
  step: number;
  title: string;
  summary: string;
  detail: string;
  imageSrc: string;
  imageAlt: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Mix",
    summary: "Measured flour, real butter, whole milk, and warm spice.",
    detail:
      "Every batch starts with sieved wheat flour, fresh eggs, butter, and flavourings—from grated nutmeg to toasted coconut or Nigerian chilli—brought together into a smooth, rested dough.",
    imageSrc: "/images/site/process/mix-1.webp",
    imageAlt: "Mixing chin chin dough with butter, flour, and warm nutmeg",
  },
  {
    step: 2,
    title: "Roll & Cut",
    summary: "Rolled even and cut into neat, bite-sized cubes.",
    detail:
      "We roll the dough to an exact thickness so every cube cooks evenly—crisp on the outside with a light, satisfying snap inside.",
    imageSrc: "/images/site/process/cut-2.webp",
    imageAlt: "Rolling and cutting chin chin dough into uniform cubes",
  },
  {
    step: 3,
    title: "Fry Golden",
    summary: "Small-batch fried in clean oil until warmly golden.",
    detail:
      "Controlled temperature keeps the cubes golden and dry rather than greasy, locking in flavour without heaviness.", // TODO(client): confirm kitchen process details
    imageSrc: "/images/site/process/fry-3.webp",
    imageAlt: "Frying chin chin cubes until crisp and golden brown",
  },
  {
    step: 4,
    title: "Pack Fresh",
    summary: "Cooled completely, then sealed for lasting crunch.",
    detail:
      "Once cooled to room temperature, each batch is weighed and sealed into moisture-barrier pouches and gift boxes ready for dispatch.",
    imageSrc: "/images/site/process/pack-4.webp",
    imageAlt: "Cooling and sealing freshly made chin chin into CRUNCHÉ pouches",
  },
];
