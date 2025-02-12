import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Routes pour les aliments
import alimentActions from "./modules/aliment/alimentActions";
router.get("/api/aliments", alimentActions.browse);
router.get("/api/aliments/:id", alimentActions.read);
router.post("/api/aliments", alimentActions.add);
router.put("/api/aliments/:id", alimentActions.edit);
router.delete("/api/aliments/:id", alimentActions.remove);

// Routes pour les catégories
import categorieActions from "./modules/categorie/categorieActions";
router.get("/api/categories", categorieActions.browse);
router.get("/api/categories/:id", categorieActions.read);
router.post("/api/categories", categorieActions.add);
router.put("/api/categories/:id", categorieActions.edit);
router.delete("/api/categories/:id", categorieActions.remove);

// Routes pour les recettes
import recetteActions from "./modules/recette/recetteActions";
router.get("/api/recettes", recetteActions.browse);
router.get("/api/recettes/:id", recetteActions.read);
router.post("/api/recettes", recetteActions.add);
router.put("/api/recettes/:id", recetteActions.edit);
router.delete("/api/recettes/:id", recetteActions.remove);

// Routes pour l'association recette-aliment
import recetteAlimentActions from "./modules/recette_aliment/recette_alimentActions";
router.post(
  "/api/recettes/:id/aliments",
  recetteAlimentActions.addAlimentToRecipe,
);
router.delete(
  "/api/recettes/:id/aliments/:id_aliment",
  recetteAlimentActions.removeAlimentFromRecipe,
);

/* ************************************************************************* */

export default router;
