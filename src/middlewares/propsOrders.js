function propsOrders(req, res, next) {
  const { uid, pid, quantity, state } = req.body;
  if (!uid || !pid || !quantity || !state) {
    const error = new Error(`Uid, Pid, Quantity and State are required`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsOrders;
