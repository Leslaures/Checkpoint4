import { useEffect, useState } from "react";
import ImpactCo2Element from "../components/ImpactCo2Element";
import "../styles/ImpactPage.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

interface Thematique {
  id: number;
  name: string;
  slug: string;
}

interface Element {
  name: string;
  slug: string;
  ecv: string;
}

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function ImpactPage() {
  const [thematiques, setThematiques] = useState<Thematique[]>([]);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedThematique, setSelectedThematique] =
    useState<Thematique | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    async function fetchThematiques() {
      const response = await fetch("http://localhost:3310/impact/thematiques");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des thématiques");
      }
      const data = await response.json();
      setThematiques(data.data);
    }

    fetchThematiques();
  }, []);

  useEffect(() => {
    if (selectedThematique) {
      async function fetchElements() {
        console.info(selectedThematique);
        const response = await fetch(
          `http://localhost:3310/impact/thematiques/${selectedThematique?.id}`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des éléments");
        }
        const data = await response.json();
        setElements(data.data);
        console.info("elements =", data.data);
      }

      fetchElements();
    }
  }, [selectedThematique]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setSelectedThematique(thematiques[newValue]);
  };

  const sortedElements = [...elements].sort(
    (a, b) => Number.parseFloat(a.ecv) - Number.parseFloat(b.ecv),
  );

  return (
    <div className="impact-page">
      <h1>Impact CO₂</h1>
      <h2>Connaitre l'impact de nos activités sur la planète</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="thématiques tabs"
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile
        >
          {thematiques.map((thematique) => (
            <Tab key={thematique.id} label={thematique.name} />
          ))}
        </Tabs>
      </Box>
      {thematiques.map((thematique, index) => (
        <TabPanel key={thematique.id} value={tabIndex} index={index}>
          {elements.length > 0 ? (
            <div>
              <h2>Produits associés à "{thematique.name}"</h2>
              <ul>
                {sortedElements.map(
                  (element) =>
                    selectedThematique && (
                      <ImpactCo2Element
                        key={element.slug}
                        element={element}
                        selectedThematique={selectedThematique}
                      />
                    ),
                )}
              </ul>
            </div>
          ) : (
            <p>Aucun produit disponible pour cette thématique.</p>
          )}
        </TabPanel>
      ))}
    </div>
  );
}

export default ImpactPage;
