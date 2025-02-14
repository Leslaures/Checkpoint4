import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Element = {
  name: string;
  slug: string;
  ecv: string;
  image_url: string;
  category: string;
  thematique_id: number;
};

type Thematique = {
  id?: number;
  name: string;
  slug: string;
  elements?: Element[];
};

class ThematiqueRepository {
  /*Créer une nouvelle thématique */
  async createThematique(
    thematique: Thematique,
  ): Promise<{ insertId: number }> {
    const [result] = await databaseClient.query<Result>(
      `
    INSERT INTO thematiques (name, slug)
    VALUES (?, ?)
    `,
      [thematique.name, thematique.slug],
    );
    return { insertId: result.insertId };
  }

  /*Lire une thématique par son slug */
  async getBySlug(slug: string): Promise<Thematique | null> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT * FROM thematiques
    WHERE slug = ?`,
      [slug],
    );
    return rows[0] as Thematique | null;
  }

  /*Lire toutes les thématiques avec leurs éléments */
  async getAll(): Promise<Thematique[]> {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT t.id as thematique_id, t.name as thematique_name, t.slug as thematique_slug,
             e.id as element_id, e.name as element_name, e.slug as element_slug, e.ecv, e.image_url, e.category
      FROM thematiques t
      LEFT JOIN elements e ON t.id = e.thematique_id
      `,
    );

    const thematiquesMap: { [key: string]: Thematique } = {};

    for (const row of rows) {
      const thematiqueId = row.thematique_id;
      if (!thematiquesMap[thematiqueId]) {
        thematiquesMap[thematiqueId] = {
          id: row.thematique_id,
          name: row.thematique_name,
          slug: row.thematique_slug,
          elements: [],
        };
      }

      if (row.element_id) {
        thematiquesMap[thematiqueId].elements?.push({
          name: row.element_name,
          slug: row.element_slug,
          ecv: row.ecv,
          image_url: row.image_url,
          category: row.category,
          thematique_id: row.thematique_id,
        });
      }
    }

    return Object.values(thematiquesMap);
  }

  /*Mettre à jour une thématique */
  async updateThematique(
    slug: string,
    thematique: Partial<Thematique>,
  ): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      `
    UPDATE thematiques
    SET name = ?
    WHERE slug = ?
    `,
      [thematique.name, slug],
    );
    return result.affectedRows > 0;
  }

  /*Supprimer une thématique */
  async deleteThematique(slug: string): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      `   
    DELETE FROM thematiques
    WHERE slug = ?
    `,
      [slug],
    );
    return result.affectedRows > 0;
  }
}

export default new ThematiqueRepository();
