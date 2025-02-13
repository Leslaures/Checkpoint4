import { useEffect, useState } from "react";
import ImpactCo2Element from "../components/ImpactCo2Element.tsx";
import "../styles/ImpactPage.css";

function ImpactPage() {
  interface Thematique {
    id: number;
    name: string;
    slug: string;
  }

  interface Element {
    name: string;
    slug: string;
    ecv: number;
  }

  const [thematiques, setThematiques] = useState<Thematique[]>([]);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedThematique, setSelectedThematique] =
    useState<Thematique | null>(null);

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

  const sortedElements = [...elements].sort((a, b) => a.ecv - b.ecv);

  return (
    <div className="impact-page">
      <h1>Impact CO₂</h1>
      <h2>Connaitre l'impact de nos activités sur la planète</h2>
      <section className="impact-co2-container">
        <label htmlFor="thematique-select">Sélectionnez une thématique :</label>
        <select
          id="thematique-select"
          value={selectedThematique ? selectedThematique.id : ""}
          onChange={(e) => {
            const selected = thematiques.find(
              (thematique) => thematique.id === Number.parseInt(e.target.value),
            );
            setSelectedThematique(selected || null);
          }}
        >
          <option value="">Sélectionner une thématique</option>
          {thematiques.map((thematique) => (
            <option key={thematique.id} value={thematique.id}>
              {thematique.name}
            </option>
          ))}
        </select>

        {elements.length > 0 && (
          <div>
            <h2>Produits associés à "{selectedThematique?.name}"</h2>
            <ul>
              {sortedElements.map((element) => (
                <>
                  <ImpactCo2Element
                    key={element.slug}
                    element={element}
                    selectedThematique={selectedThematique}
                  />
                </>
              ))}
            </ul>
          </div>
        )}

        {elements.length === 0 && selectedThematique && (
          <p>Aucun produit disponible pour cette thématique.</p>
        )}
      </section>
    </div>
  );
}

export default ImpactPage;
