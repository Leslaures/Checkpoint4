import impactCategories from "./impactCategories";

const API_URL = "https://impactco2.fr/api/v1";

class ImpactCo2Repository {
  /*pour obtenir les grandes thématiques d'impact co2*/
  async getThematiques() {
    console.info(`Fetching data from: ${API_URL}/thematiques`);
    const response = await fetch(`${API_URL}/thematiques`);

    if (!response.ok) {
      throw new Error(`Erreur API ImpactCO2 : ${response.statusText}`);
    }
    return await response.json();
  }

  /*pou robetnir tous les objets dans cette thématique*/
  async getThematiqueDetails(id: string) {
    console.info(`Fetching data from: ${API_URL}/thematiques/ecv/${id}`);
    const response = await fetch(`${API_URL}/thematiques/ecv/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur API ImpactCO2 : ${response.statusText}`);
    }
    return await response.json();
  }

  /*pour récupérer une catégorie spécifique*/
  async getCategorie(categorie: string) {
    const thematique = impactCategories.find((t) => t.slug === categorie);
    if (!thematique) {
      throw new Error(`Catégorie inconnue: ${categorie}`);
    }
    console.info(
      `Fetching data for category ${categorie} (ID: ${thematique.id}) from: ${API_URL}/thematiques/ecv/${thematique.id}`,
    );
    const response = await fetch(`${API_URL}/thematiques/ecv/${thematique.id}`);
    if (!response.ok) {
      throw new Error(`Erreur API ImpactCO2 : ${response.statusText}`);
    }
    return await response.json();
  }
}

export default new ImpactCo2Repository();
