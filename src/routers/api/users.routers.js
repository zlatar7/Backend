import { Router } from "express";
import { Types } from "mongoose";
// import user from "../../data/fs/users.fs.js";
import { user } from "../../data/mongo/manager.mongo.js";
import propsUsers from "../../middlewares/propsUsers.js";
import CustomRouter from "../CustomRouter.js";

export default class UserRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], async (req, res, next) => {
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
        return res.success200(users);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:uid", ["ADMIN"], async (req, res, next) => {
      try {
        const { uid } = req.params;
        const isValidID = Types.ObjectId.isValid(uid);

        if (isValidID) {
          const obj = await user.readOne(uid);
          return res.success200(obj);
        } else {
          res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });

    this.create("/", ["PUBLIC"], propsUsers, async (req, res, next) => {
      try {
        const usuario = req.body;
        const obj = await user.create(usuario);
        res.success201(obj);
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:uid", ["ADMIN"], propsUsers, async (req, res, next) => {
      try {
        const { uid } = req.params;
        const isValidID = Types.ObjectId.isValid(uid);

        if (isValidID) {
          const data = req.body;
          const one = await user.update(uid, data);
          return res.success200(one);
        } else {
          res.error404();
        }
      } catch (error) {
        next(error);
      }
    });

    this.destroy("/:uid", ["ADMIN"], async (req, res, next) => {
      try {
        const { uid } = req.params;

        const isValidID = Types.ObjectId.isValid(uid);
        if (isValidID) {
          const obj = await user.destroy(uid);
          return res.success200(obj);
        } else {
          res.error404();
        }
      } catch (error) {
        return next(error);
      }
    });
  }
}
