import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Element = {
  name: string;
  slug: string;
  ecv: number;
  image_url: string;
  category: string;
  thematique_id: number;
};

class ElementRepository {
  /*Créer un nouvel élément */
  async createElement(element: Element): Promise<{ insertId: number }> {
    const [result] = await databaseClient.query<Result>(
      `
      INSERT INTO elements (name, slug, ecv, image_url, category, thematique_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        element.name,
        element.slug,
        element.ecv,
        element.image_url,
        element.category,
        element.thematique_id,
      ],
    );
    return { insertId: result.insertId };
  }

  /*Lire un élément par son slug */
  async getBySlug(slug: string): Promise<Element | null> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM elements 
      WHERE slug = ?`,
      [slug],
    );
    return rows[0] as Element | null;
  }

  /*Lire tous les éléments */
  async getAll(): Promise<Element[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM elements");
    return rows as Element[];
  }

  /*Mettre à jour un élément */
  async updateElement(
    slug: string,
    element: Partial<Element>,
  ): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      `
      UPDATE elements 
      SET name = ?, ecv = ?
      WHERE slug = ?
    `,
      [element.name, element.ecv, slug],
    );
    return result.affectedRows > 0;
  }

  /*Supprimer un élément */
  async deleteElement(slug: string): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      `DELETE FROM elements 
      WHERE slug = ?`,
      [slug],
    );
    return result.affectedRows > 0;
  }

  /*Rechercher un élément par son nom ou son slug */
  async search(searchTerm: string): Promise<Element[]> {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT * FROM elements 
      WHERE name LIKE ? OR slug LIKE ?
    `,
      [`%${searchTerm}%`, `%${searchTerm}%`],
    );
    return rows as Element[];
  }

  /*Lire tous les éléments d'une thématique */
  async getByThematique(thematique_id: number): Promise<Element[]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM elements 
      WHERE thematique_id = ?`,
      [thematique_id],
    );
    return rows as Element[];
  }
}

export default new ElementRepository();
