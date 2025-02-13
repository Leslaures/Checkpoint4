import type { RequestHandler } from "express";
import impactCo2Repository from "./impactCo2Repository";

/*pour obtenir les grandes thématiques d'impact co2*/
const getThematiques: RequestHandler = async (req, res, next) => {
  try {
    const thematiques = await impactCo2Repository.getThematiques();
    res.json(thematiques);
  } catch (err) {
    next(err);
  }
};

/*pou robetnir tous les objets dans cette thématique*/
const getThematiqueDetails: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const details = await impactCo2Repository.getThematiqueDetails(id);
    res.json(details);
  } catch (err) {
    next(err);
  }
};

/*pour récupérer une catégorie spécifique*/
const getCategorie: RequestHandler = async (req, res, next) => {
  const { categorie } = req.params;
  try {
    const data = await impactCo2Repository.getCategorie(categorie);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export default { getThematiques, getThematiqueDetails, getCategorie };
