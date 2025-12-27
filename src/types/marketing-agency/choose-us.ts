export interface TypeFunFact {
    id: string | number;
    finalValue: number;
    suffix: string;
    label: string;
    delay: number;
  }

  export interface TypeFunFactHeader {
    subTitle: string;
    title: string;
  }
  

  export interface TypeChooseUsProps {
    header: TypeFunFactHeader;
    funFacts: TypeFunFact[];
  }