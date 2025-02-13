import type { RequestHandler } from "express";
import elementRepository from "./elementRepository";

const getAll: RequestHandler = async (req, res, next) => {
  try {
    const elements = await elementRepository.getAll();
    res.json(elements);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
    next(error);
  }
};

const getBySlug: RequestHandler = async (req, res, next) => {
  try {
    const element = await elementRepository.getBySlug(req.params.slug);
    if (!element) res.status(404).json({ error: "Élément non trouvé" });
    res.json(element);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
    next(error);
  }
};

const create: RequestHandler = async (req, res, next) => {
  try {
    const { name, slug, ecv, image_url } = req.body;
    const newElement = await elementRepository.createElement({
      name,
      slug,
      ecv,
      image_url,
      category: req.body.category,
      thematique_id: req.body.thematique_id,
    });
    res.status(201).json(newElement);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création" });
    next(error);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const updatedElement = await elementRepository.updateElement(
      req.params.slug,
      req.body,
    );
    if (!updatedElement) res.status(404).json({ error: "Élément non trouvé" });
    res.json(updatedElement);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await elementRepository.deleteElement(req.params.slug);
    if (!deleted) res.status(404).json({ error: "Élément non trouvé" });
    res.json({ message: "Élément supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
    next(error);
  }
};

export default { getAll, getBySlug, create, update, destroy };
