const {
	models: { User },
} = require("../../db");
const { decodeToken } = require("../../utils");

// Authorization token middleware. It allows you to
// validate User's HTTP calls. This middleware attaches authorized user data to req.user.
const requireToken = async (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (authorization) {
			let id;
			try {
				// try to decode auth token with "customer" signature
				id = decodeToken(authorization, "customer").id;
			} catch (error) {
				// retry decode auth token with "admin" signature
				id = decodeToken(authorization, "admin").id;
			}

			const user = await User.findByPk(id);
			// attach user data to req if successfully authenticated.
			if (user) {
				req.user = user;
				next();
				return;
			}
		}
		res.sendStatus(401);
	} catch (error) {
		next(error);
	}
};

const requireAdminToken = async (req, res, next) => {
	try {
		const { authorization } = req.headers;

		if (authorization) {
			// decode auth token with "admin" signature
			const { id } = decodeToken(authorization, "admin");

			const user = await User.findByPk(id);
			// attach user data to req if successfully authenticated.
			if (user) {
				req.user = user;
				next();
				return;
			}
		}
		res.sendStatus(401);
	} catch (error) {
		next(error);
	}
};

module.exports = { requireToken, requireAdminToken };
