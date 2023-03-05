import { validationResult } from "express-validator";

const validate = (req, res, next) => {
	const errors = validationResult(req);

	if(errors.isEmpty()){
		next();
		return;
	};

	const extratedErros = [];
	errors.array().map((error) => {
		extratedErros.push(error.msg)
	});

	res.status(422).json({
		errors: extratedErros,
	});
	return;
};

export { validate };