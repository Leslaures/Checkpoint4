import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ImpactCalculator from "../components/ImpactCalculator";
import { useThematique } from "../context/ThematiqueContext";
import "../styles/GlobalImpact.css";
function GlobalImpact() {
  const thematiques = useThematique();

  return (
    <div className="impact-page">
      <h1 className="simulation-title">Simulateur d'Empreinte Carbone</h1>
      <h2 className="description">
        <span className="emphasis-word">L’empreinte carbone</span> représente la{" "}
        <b>quantité de gaz à effet de serre émise par les activités humaines</b>
        . Le simulateur d’empreinte carbone aide à repérer les usages qui
        contribuent le plus au <b>changement climatique</b> et aide ainsi à
        choisir les actions les plus efficaces pour réduire son impact.
      </h2>

      {thematiques.length === 0 ? (
        <p>Chargement des thématiques...</p>
      ) : (
        thematiques.map((thematique) => (
          <Accordion key={thematique.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${thematique.id}-content`}
              id={`panel-${thematique.id}-header`}
            >
              <Typography className="thematique-name">
                {thematique.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ImpactCalculator thematique={thematique} />
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </div>
  );
}

export default GlobalImpact;
