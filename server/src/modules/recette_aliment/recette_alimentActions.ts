import type { RequestHandler } from "express";
import recetteAlimentRepository from "./recette_alimentRepository";

const addAlimentToRecipe: RequestHandler = async (req, res, next) => {
  const recetteId = Number(req.params.id);
  const { id_aliment, quantite } = req.body;
  try {
    await recetteAlimentRepository.addAlimentToRecipe(
      recetteId,
      id_aliment,
      quantite,
    );
    res.status(201).json({ message: "Aliment ajouté à la recette" });
  } catch (err) {
    next(err);
  }
};

const removeAlimentFromRecipe: RequestHandler = async (req, res, next) => {
  const recetteId = Number(req.params.id);
  const idAliment = Number(req.params.id_aliment);
  try {
    await recetteAlimentRepository.removeAlimentFromRecipe(
      recetteId,
      idAliment,
    );
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { addAlimentToRecipe, removeAlimentFromRecipe };
