import type { RequestHandler } from "express";
import thematiqueRepository from "./thematiqueRepository";

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const thematiques = await thematiqueRepository.getAll();
    res.json(thematiques);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
    next(error);
  }
};

const getBySlug: RequestHandler = async (req, res, next) => {
  try {
    const thematique = await thematiqueRepository.getBySlug(req.params.slug);
    if (!thematique) res.status(404).json({ error: "Thématique non trouvée" });
    res.json(thematique);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
    next(error);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    const newThematique = await thematiqueRepository.createThematique({
      name,
      slug,
    });
    res.status(201).json(newThematique);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création" });
    next(error);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updatedThematique = await thematiqueRepository.updateThematique(
      req.params.slug,
      req.body,
    );
    if (!updatedThematique)
      res.status(404).json({ error: "Thématique non trouvée" });
    res.json(updatedThematique);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await thematiqueRepository.deleteThematique(
      req.params.slug,
    );
    if (!deleted) res.status(404).json({ error: "Thématique non trouvée" });
    res.json({ message: "Thématique supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
    next(error);
  }
};

export default { getAll, getBySlug, create, update, destroy };
