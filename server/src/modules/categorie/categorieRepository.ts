import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Categorie = {
  id?: number;
  nom: string;
};

class CategorieRepository {
  async create(categorie: Categorie) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO categorie (nom) VALUES (?)",
      [categorie.nom],
    );
    if (result && "insertId" in result) {
      return result.insertId;
    }
    throw new Error("Failed to insert Categorie");
  }

  async read(id: number) {
    // id_categorie → id
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM categorie WHERE id = ?",
      [id],
    );
    return rows[0] as Categorie;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM categorie");
    return rows as Categorie[];
  }

  async update(id: number, categorie: Categorie) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE categorie SET nom = ? WHERE id = ?",
      [categorie.nom, id],
    );
    if (result.affectedRows > 0) {
      return this.read(id);
    }
    return null;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM categorie WHERE id = ?",
      [id],
    );
    if (result.affectedRows === 0) {
      throw new Error("Categorie not found");
    }
  }
}

export default new CategorieRepository();
