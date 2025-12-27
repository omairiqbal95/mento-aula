export interface FunFactItem {
  id: number;
  number: number;
  suffix: string;
  label: string;
  delay?: string;
}

export const funFactsContent = {
  items: [
    {
      id: 1,
      number: 500,
      suffix: "+",
      label: "Expert Doctors",
      delay: ".2",
    },
    {
      id: 2,
      number: 20,
      suffix: "k",
      label: "Happy Patients",
      delay: ".4",
    },
    {
      id: 3,
      number: 150,
      suffix: "+",
      label: "Medical Beds",
      delay: ".6",
    },
    {
      id: 4,
      number: 275,
      suffix: "+",
      label: "Winning Awards",
      delay: ".8",
    },
  ],
};
