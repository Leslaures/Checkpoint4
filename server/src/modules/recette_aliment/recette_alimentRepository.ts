import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

class RecetteAlimentRepository {
  async addAlimentToRecipe(
    id_recette: number,
    id_aliment: number,
    quantite: number,
  ) {
    await databaseClient.query<Result>(
      "INSERT INTO recette_aliment (id_recette, id_aliment, quantite) VALUES (?, ?, ?)",
      [id_recette, id_aliment, quantite],
    );
  }

  async removeAlimentFromRecipe(id_recette: number, id_aliment: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM recette_aliment WHERE id_recette = ? AND id_aliment = ?",
      [id_recette, id_aliment],
    );
    if (result.affectedRows === 0) {
      throw new Error("Association not found");
    }
  }

  async getAlimentsByRecipe(id_recette: number) {
    const [rows] = await databaseClient.query(
      "SELECT a.id, a.nom_aliment, ra.quantite FROM recette_aliment ra JOIN aliment a ON ra.id_aliment = a.id WHERE ra.id_recette = ?",
      [id_recette],
    );
    return rows;
  }
}

export default new RecetteAlimentRepository();
