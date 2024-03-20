import service from "../services/users.service.js";
import { Types } from "mongoose";

class UsersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const usuario = req.body;
      const obj = this.service.create(usuario);
      res.success201(obj);
    } catch (error) {
      return next(error);
    }
  }
  read = async (req, res, next) => {
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
      const users = await this.service.read({ filter, sortAndPaginate });
      return res.success200(users);
    } catch (error) {
      return next(error);
    }
  }
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const isValidID = Types.ObjectId.isValid(uid);

      if (isValidID) {
        const obj = await this.service.readOne(uid);
        return res.success200(obj);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const isValidID = Types.ObjectId.isValid(uid);

      if (isValidID) {
        const data = req.body;
        const one = await this.service.update(uid, data);
        return res.success200(one);
      } else {
        res.error404();
      }
    } catch (error) {
      next(error);
    }
  }
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const isValidID = Types.ObjectId.isValid(uid);
      
      if (isValidID) {
        const obj = await this.service.destroy(uid);
        return res.success200(obj);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };