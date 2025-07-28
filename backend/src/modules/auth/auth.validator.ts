import { body } from "express-validator";

const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Nama wajib diisi")
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter"),
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
  body("number")
    .optional()
    .isMobilePhone("id-ID")
    .withMessage("Nomor telpon tidak valid"),
];
const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email wajib diisi")
    .isEmail()
    .withMessage("Email tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password wajib diisi")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
];

export { registerValidator, loginValidator };
