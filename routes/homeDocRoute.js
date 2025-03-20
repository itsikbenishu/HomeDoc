import express from "express";
import homeDocController from "../controllers/homeDocController.js";

const router = express.Router();

router
  .route("/")
  .get(homeDocController.getAllHomeDocs)
  .post(homeDocController.createHomeDoc)
  .put(homeDocController.createSubHomeDoc);

router.route("/stats").get(homeDocController.getCounts);

router
  .route("/:id")
  .get(homeDocController.getHomeDoc)
  .patch(homeDocController.updateHomeDoc)
  .delete(homeDocController.deleteHomeDoc);

router
  .route("/:pageType/:id")
  .get(homeDocController.getHomeDoc)
  .patch(homeDocController.updateHomeDoc);

export default router;
