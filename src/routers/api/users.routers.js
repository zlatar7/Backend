import { Router } from "express";
import { Types } from "mongoose";
// import user from "../../data/fs/users.fs.js";
import { user } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";

const usersRouter = Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const sortAndPaginate = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { name: "asc" },
    };
    const filter = {};
    if (req.query.email) {
      filter.email = new RegExp(req.query.email.trim(), "i");
    }
    if (req.query.name === "desc") {
      sortAndPaginate.sort.name = -1;
    }
    const users = await user.read({ filter, sortAndPaginate });

    return res.json({ statusCode: 200, response: users });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const isValidID = Types.ObjectId.isValid(uid);
    console.log(isValidID);
    if (isValidID) {
      const obj = await user.readOne(uid);
      return res.json({ statusCode: 200, response: obj });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID del ususario no existe en la base de datos",
      });
    }
  } catch (error) {
    return next(error);
  }
});

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const usuario = req.body;
    const obj = await user.create(usuario);
    res.json({ statusCode: 201, response: obj });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", propsUsers, async (req, res, next) => {
  try {
    const { uid } = req.params;
    const isValidID = Types.ObjectId.isValid(uid);

    if (isValidID) {
      const data = req.body;
      const one = await user.update(uid, data);

      return res.json({ statusCode: 200, response: one });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID no existe en la base de datos",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    const isValidID = Types.ObjectId.isValid(uid);
    if (isValidID) {
      const obj = await user.destroy(uid);

      return res.json({ statusCode: 200, response: obj });
    } else {
      res.json({
        statusCode: 404,
        response: "El ID no existe en la base de datos",
      });
    }
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
