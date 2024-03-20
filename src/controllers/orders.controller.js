import service from "../services/orders.service.js";
import { Types } from "mongoose";

class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const object = req.body;
      const obj = await this.service.create(object);
      return res.success201(obj);
    } catch (error) {
      return next(error);
    }
  }
  read = async (req, res, next) => {
    try {
      const orderAndPaginate = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { name: "asc" },
      };
      const filter = {};
      const orders = await this.service.read({ filter, orderAndPaginate });

      if (orders.totalPages > 0) {
        return res.success200(orders);
      } else {
        return res.error404();
      }
    } catch (error) {
      next(error);
    }
  }
  readOne = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const isValidID = Types.ObjectId.isValid(oid);

      if (isValidID) {
        const obj = await this.service.readOne(oid);

        return res.success200(obj);
      } else {
        res.error404();
      }
    } catch (error) {
      next(error);
    }
  }
  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const isValidID = Types.ObjectId.isValid(uid);

      if (isValidID) {
        const reportBill = await this.service.report(uid);

        return res.success200(reportBill);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const isValidID = Types.ObjectId.isValid(oid);

      if (isValidID) {
        const one = await this.service.update(oid, data);
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
      const { oid } = req.params;
      const isValidID = Types.ObjectId.isValid(oid);

      if (isValidID) {
        const one = await this.service.destroy(oid);
        return res.success200(one);
      } else {
        res.error404();
      }
    } catch (error) {
      next(error);
    }
  }
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, report, update, destroy, readOne } = controller;
export { create, read, report, update, destroy, readOne };