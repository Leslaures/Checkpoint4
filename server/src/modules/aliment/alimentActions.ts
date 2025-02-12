import type { RequestHandler } from "express";

import alimentRepository from "./alimentRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const aliments = await alimentRepository.readAll();

    res.json(aliments);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  const alimentId = Number(req.params.id);
  try {
    const aliment = await alimentRepository.read(alimentId);
    if (aliment == null) {
      res.sendStatus(404);
    } else {
      res.json(aliment);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newAliment = {
      nom_aliment: req.body.nom_aliment,
      categorie_aliment: req.body.categorie_aliment,
      portion_standard: req.body.portion_standard,
      empreinte_carbone: req.body.empreinte_carbone,
      consommation_eau: req.body.consommation_eau,
    };
    const insertId = await alimentRepository.create(newAliment);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  const alimentId = Number(req.params.id);
  try {
    const updatedAliment = await alimentRepository.update(alimentId, req.body);
    if (updatedAliment == null) {
      res.sendStatus(404);
    } else {
      res.json(updatedAliment);
    }
  } catch (err) {
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  const alimentId = Number(req.params.id);
  try {
    const aliment = await alimentRepository.read(alimentId);
    if (!aliment) {
      res.status(404).json({ error: "Aliment non trouvé" });
      return;
    }
    await alimentRepository.delete(alimentId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, remove };
