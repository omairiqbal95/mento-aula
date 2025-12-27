import { ProcessStep as ProcessStepType } from "@/types/inner-pages/portfolio-details";

interface ProcessStepProps {
  step: ProcessStepType;
  delay: string;
}

const ProcessStep = ({ step, delay }: ProcessStepProps) => {
  return (
    <div className="process fade_up_anim" data-delay={delay}>
      <div className="process-wrapper">
        <h6 className="h6">{step.title}</h6>
        <ul>
          {step.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProcessStep;
