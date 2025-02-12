import type { RequestHandler } from "express";
import recetteAlimentRepository from "../recette_aliment/recette_alimentRepository";
import recetteRepository from "./recetteRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const recettes = await recetteRepository.readAll();
    res.json(recettes);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  const recetteId = Number(req.params.id);
  try {
    const recette = await recetteRepository.read(recetteId);
    if (!recette) {
      res.sendStatus(404);
      return;
    }
    const aliments =
      await recetteAlimentRepository.getAlimentsByRecipe(recetteId);
    res.json({ ...recette, aliments });
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newRecipe = { nom_recette: req.body.nom_recette };
    const insertId = await recetteRepository.create(newRecipe);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  const recetteId = Number(req.params.id);
  try {
    const updatedRecipe = await recetteRepository.update(recetteId, req.body);
    if (!updatedRecipe) {
      res.sendStatus(404);
    } else {
      res.json(updatedRecipe);
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  const recetteId = Number(req.params.id);
  try {
    await recetteRepository.delete(recetteId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };
