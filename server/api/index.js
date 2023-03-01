const { authRouter, usersRouter, cartRouter } = require("./routes");
const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/cart", cartRouter);

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
