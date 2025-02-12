import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Aliment = {
  id?: number;
  nom_aliment: string;
  categorie_aliment: number;
  portion_standard: number;
  empreinte_carbone: number;
  consommation_eau: number;
};

class AlimentRepository {
  async create(aliment: Aliment) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO aliment (nom_aliment, categorie_aliment, portion_standard, empreinte_carbone, consommation_eau) VALUES (?, ?, ?, ?, ?)",
      [
        aliment.nom_aliment,
        aliment.categorie_aliment,
        aliment.portion_standard,
        aliment.empreinte_carbone,
        aliment.consommation_eau,
      ],
    );
    if (result && "insertId" in result) {
      return result.insertId;
    }
    throw new Error("Failed to insert Aliment");
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM aliment WHERE id = ?",
      [id],
    );
    return rows[0] as Aliment;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(`
      SELECT aliment.*, categorie.nom AS nom_categorie
      FROM aliment
      JOIN categorie ON aliment.categorie_aliment = categorie.id
    `);

    return rows.map((row) => ({
      id: row.id,
      nom_aliment: row.nom_aliment,
      categorie_aliment: { id: row.categorie_aliment, nom: row.nom_categorie },
      portion_standard: row.portion_standard,
      empreinte_carbone: row.empreinte_carbone,
      consommation_eau: row.consommation_eau,
    }));
  }

  async update(alimentId: number, aliment: Aliment) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE aliment SET nom_aliment = ?, categorie_aliment = ?, portion_standard = ?, empreinte_carbone = ?, consommation_eau = ? WHERE id = ?",
      [
        aliment.nom_aliment,
        aliment.categorie_aliment,
        aliment.portion_standard,
        aliment.empreinte_carbone,
        aliment.consommation_eau,
        alimentId,
      ],
    );
    if (result.affectedRows > 0) {
      return this.read(alimentId);
    }
    return null;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM aliment WHERE id = ?",
      [id],
    );
    if (result.affectedRows === 0) {
      throw new Error("Aliment not found");
    }
  }
}

export default new AlimentRepository();
