import ImpactCalculator from "../components/ImpactCalculator";
import { useThematique } from "../context/ThematiqueContext";

function GlobalImpact() {
  const thematiques = useThematique();

  return (
    <div className="impact-page">
      <h1>Simulateur d'Empreinte Carbone</h1>
      {thematiques.length === 0 ? (
        <p>Chargement des thématiques...</p>
      ) : (
        thematiques.map((thematique) => (
          <ImpactCalculator key={thematique?.name} thematique={thematique} />
        ))
      )}
    </div>
  );
}

export default GlobalImpact;
