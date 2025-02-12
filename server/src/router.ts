import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define aliment-related routes
import alimentActions from "./modules/aliment/alimentActions";

router.get("/api/aliments", alimentActions.browse);
router.get("/api/aliments/:id", alimentActions.read);
router.post("/api/aliments", alimentActions.add);
router.put("/api/aliments/:id", alimentActions.edit);
router.delete("/api/aliments/:id", alimentActions.remove);

import categorieActions from "./modules/categorie/categorieActions";
router.get("/api/categories", categorieActions.browse);
router.get("/api/categories/:id", categorieActions.read);
router.post("/api/categories", categorieActions.add);
router.put("/api/categories/:id", categorieActions.edit);
router.delete("/api/categories/:id", categorieActions.remove);

/* ************************************************************************* */

export default router;
