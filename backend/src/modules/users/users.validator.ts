import { body, param } from "express-validator";

const createUsersValidator = [
  body("name")
    .notEmpty()
    .withMessage("Nama wajib diisi!")
    .isString()
    .withMessage("Nama harus berupa string")
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter"),
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi!")
    .isEmail()
    .withMessage("Format harus berupa email")
    .isLength({ max: 50 })
    .withMessage("Email maksimal 50 karakter"),
  body("number")
    .optional()
    .isMobilePhone("id-ID")
    .withMessage("Nomor telpon tidak valid"),
  body("password")
    .notEmpty()
    .withMessage("Password harus diisi!")
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter "),
];

const updateUsersValidator = [
  param("id").isInt().withMessage("ID harus berupa angka"),
  body("name")
    .notEmpty()
    .withMessage("Nama wajib diisi!")
    .isString()
    .withMessage("Nama harus berupa string")
    .isLength({ max: 50 })
    .withMessage("Nama maksimal 50 karakter"),
  body("email")
    .notEmpty()
    .withMessage("Email harus diisi!")
    .isEmail()
    .withMessage("Format harus berupa email")
    .isLength({ max: 50 })
    .withMessage("Email maksimal 50 karakter"),
  body("number")
    .optional()
    .isMobilePhone("id-ID")
    .withMessage("Nomor telpon tidak valid"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password minimal 6 karakter"),
];

const idParamsValidator = [
  param("id").isInt().withMessage("ID harus berupa angka"),
];

export { createUsersValidator, updateUsersValidator, idParamsValidator };
