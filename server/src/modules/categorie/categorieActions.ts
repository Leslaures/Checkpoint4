import type { RequestHandler } from "express";

import categorieRepository from "./categorieRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categorieRepository.readAll();

    res.json(categories);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  const categorieId = Number(req.params.id_categorie);
  try {
    const categorie = await categorieRepository.read(categorieId);
    if (categorie == null) {
      res.sendStatus(404);
    } else {
      res.json(categorie);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newCategorie = {
      nom: req.body.nom_categorie,
    };
    const insertId = await categorieRepository.create(newCategorie);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  const categorieId = Number(req.params.id_categorie);
  try {
    const updatedCategorie = await categorieRepository.update(
      categorieId,
      req.body,
    );
    if (updatedCategorie == null) {
      res.sendStatus(404);
    } else {
      res.json(updatedCategorie);
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  const categorieId = Number(req.params.id_categorie);
  try {
    const categorie = await categorieRepository.read(categorieId);
    if (!categorie) {
      res.status(404).json({ error: "Categorie non trouvée" });
      return;
    }
    await categorieRepository.delete(categorieId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };
