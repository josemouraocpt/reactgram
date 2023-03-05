import { body } from "express-validator";

const photoInsertValidation = () => {
	return [
		body("title")
			.not()
			.equals("undefined")
			.withMessage("O título é obrigatorio")
			.isString()
			.withMessage("O título é obrigatorio")
			.isLength({ min: 3 })
			.withMessage("O título precisa ter no minimo 3 caracteres"),
		body("image")
			.custom((value, {req}) => {
				if(!req.file){
					throw new Error("A imgamen é obrigatória.");
				}
				return true;
			})
	]
};

const photoUpdateValidation = () => {
	return[
		body("title")
			.optional()
			.isLength({ min: 3 })
			.isString()
			.withMessage("O título precisa de no mínimo 3 caracteres")
	]
};

const photoCommentValidation = () => {
	return[
		body("comment")
			.isString()
			.withMessage("O comentátio é obrigatório")
	]
};

export { photoInsertValidation, photoUpdateValidation, photoCommentValidation };