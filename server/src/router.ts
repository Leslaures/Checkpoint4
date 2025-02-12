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

/* ************************************************************************* */

export default router;
