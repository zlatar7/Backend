import service from "../services/products.service.js";
import { Types } from "mongoose";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const sortAndPaginate = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
      };
      const filter = {};

      if (req.query.title === "desc") {
        sortAndPaginate.sort.title = "desc";
      }
      const arrayProducts = await this.service.read({ filter, sortAndPaginate });

      return res.success200(arrayProducts);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const isValidID = Types.ObjectId.isValid(pid);

      if (isValidID) {
        const obj = await this.service.readOne(pid);

        return res.success200(obj);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const isValidID = Types.ObjectId.isValid(pid);

      if (isValidID) {
        const prod = req.body;
        const obj = await this.service.update(pid, prod);

        return res.json({ statusCode: 200, response: obj });
      } else {
        res.error404();
      }
    } catch (error) {
      next(error);
    }
  };
  destroy = async (req, res) => {
    try {
      const { pid } = req.params;
      const isValidID = Types.ObjectId.isValid(pid);

      if (isValidID) {
        const obj = await this.service.destroy(pid);

        return res.json({ statusCode: 200, response: obj });
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
