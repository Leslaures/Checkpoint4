import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Recette = {
  id?: number;
  nom_recette: string;
};

class RecetteRepository {
  async create(recette: Recette) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO recette (nom_recette) VALUES (?)",
      [recette.nom_recette],
    );
    if (result && "insertId" in result) {
      return result.insertId;
    }
    throw new Error("Failed to insert Recipe");
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM recette WHERE id = ?",
      [id],
    );
    return rows[0] as Recette;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM recette");
    return rows as Recette[];
  }

  async update(recetteId: number, recette: Recette) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE recette SET nom_recette = ? WHERE id = ?",
      [recette.nom_recette, recetteId],
    );
    if (result.affectedRows > 0) {
      return this.read(recetteId);
    }
    return null;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM recette WHERE id = ?",
      [id],
    );
    if (result.affectedRows === 0) {
      throw new Error("Recipe not found");
    }
  }
}

export default new RecetteRepository();
