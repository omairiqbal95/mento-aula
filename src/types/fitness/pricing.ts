export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  id: number;
  package: string;
  name: string;
  price: string;
  features: PricingFeature[];
  buttonText: string;
  buttonLink: string;
  delay: string;
}

export interface PricingContent {
  sectionHeader: {
    title: string;
    description: string;
  };
  plans: PricingPlan[];
}
