import { Router } from "express";
import user from "../../data/fs/users.fs.js";
import propsUsers from "../../middlewares/propsUsers.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const usersArray = await user.read();

    if (usersArray.length > 0) {
      res.status(200).json({ success: true, response: usersArray });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const id = parseInt(req.params.uid);
    const obj = await user.readOne(id);

    if (obj !== null) {
      res.status(200).json({ success: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: "Not found" });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const usuario = req.body;
    const obj = await user.create(usuario);
    res.status(200).json({ success: true, response: obj });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", propsUsers, async (req, res, next) => {
  try {
    const uid = req.params.uid;
    const usuario = req.body;
    const obj = await user.update(uid, usuario);
    
    if (obj == `El usuario con el ID: ${uid} ha sido actualizado`) {
      res.status(200).json({ success: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: obj });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const id = req.params.uid;
    const obj = await user.destroy(id);

    if (obj !== "No hay elementos con el ID ingresado") {
      res.status(200).json({ success: true, response: obj });
    } else {
      res.status(404).json({ success: false, message: obj });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;