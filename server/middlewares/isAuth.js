const isAuth = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      return res.status(401).send({ err: "User not logged in" });
    }
  };
};

export default isAuth;
