import { useState } from "react";
import "../styles/ImpactCalculator.css";

interface UserInput {
  [slug: string]: number;
}

interface Element {
  slug: string;
  name: string;
  ecv: string;
}

interface Thematique {
  id: number;
  name: string;
  slug: string;
  elements: Element[];
}

interface ImpactCalculatorProps {
  thematique: Thematique;
}

function ImpactCalculator({ thematique }: ImpactCalculatorProps) {
  console.info(thematique);
  const [userInput, setUserInput] = useState<UserInput>({});

  const handleChange = (slug: string, value: string) => {
    setUserInput({
      ...userInput,
      [slug]: Number.parseFloat(value) || 0,
    });
  };

  const totalImpact = thematique.elements.reduce((acc, element) => {
    const quantity = userInput[element.slug] || 0;
    return acc + Number.parseFloat(element.ecv) * quantity;
  }, 0);

  return (
    <div className="calculator">
      {thematique.elements.map((element) => (
        <div key={element.slug}>
          <label htmlFor={element.slug}>{element.name}</label>
          <input
            id={element.slug}
            type="number"
            value={userInput[element.slug] || ""}
            onChange={(e) => handleChange(element.slug, e.target.value)}
          />
          <span>
            kg CO₂e :{" "}
            {typeof Number.parseFloat(element.ecv) === "number"
              ? Number.parseFloat(element.ecv).toFixed(2)
              : "N/A"}
          </span>
        </div>
      ))}
      <strong>Total : {totalImpact.toFixed(2)} kg CO₂e</strong>
    </div>
  );
}

export default ImpactCalculator;
