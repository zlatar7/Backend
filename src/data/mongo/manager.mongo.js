import Product from "./models/product.model.js";
import User from "./models/user.model.js";
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.utils.js";
import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read({ filter, sortAndPaginate }) {
    try {
      const all = await this.model.paginate(filter, sortAndPaginate);

      if (all.totalDocs === 0) {
        const error = new Error("There aren't documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  async report(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            currency: "ARS",
          },
        },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const product = new MongoManager(Product);
const user = new MongoManager(User);
const order = new MongoManager(Order);

export { product, user, order };
