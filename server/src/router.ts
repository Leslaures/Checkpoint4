import express, { Router } from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* Routes pour l'API extérieure ImpactCO2*/
import impactCo2Actions from "./modules/impact/impactCo2Actions";
router.get("/impact/thematiques", impactCo2Actions.getThematiques);
router.get("/impact/thematiques/:id", impactCo2Actions.getThematiqueDetails);
router.get("/impact/:categorie", impactCo2Actions.getCategorie);

/*Routes pour l'API Element */
import elementActions from "./modules/element/elementActions";
router.get("/elements", elementActions.getAll);
router.get("/elements/:slug", elementActions.getBySlug);
router.post("/elements", elementActions.create);
router.put("/elements/:slug", elementActions.update);
router.delete("/elements/:slug", elementActions.destroy);

/*Routes pour l'API Thematique */
import thematiqueActions from "./modules/thematique/thematiqueActions";
router.get("/thematiques", thematiqueActions.getAll);
router.get("/thematiques/:slug", thematiqueActions.getBySlug);
router.post("/thematiques", thematiqueActions.create);
router.put("/thematiques/:slug", thematiqueActions.update);
router.delete("/thematiques/:slug", thematiqueActions.destroy);

/* ************************************************************************* */

export default router;
