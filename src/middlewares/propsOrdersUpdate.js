function propsOrdersUpdate(req, res, next) {
  const { oid, quantity, state } = req.body;
  if (!quantity || !state) {
    const error = new Error(`Quantity and State are required`);
    error.statusCode = 404;
    throw error;
  } else {
    return next();
  }
}

export default propsOrdersUpdate;
