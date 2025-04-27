const yup = require("yup");

const authSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

const signupSchema = authSchema.shape({
  firstName: yup.string().trim().max(100, "First name cannot exceed 100 characters"),
  lastName: yup.string().trim().max(100, "Last name cannot exceed 100 characters"),
  countryCode: yup
    .string()
    .trim()
    .max(10, "Country code cannot exceed 10 characters")
    .matches(/^(\+?[0-9]+)$/, "Country code must start with + followed by numbers")
    .test(
      'is-country-code-present',
      'Country code is required when phone number is provided',
      function (value, context) {
        return !context.parent.phoneNumber || (context.parent.phoneNumber && value);
      }
    ),
  phoneNumber: yup
    .string()
    .trim()
    .max(50, "Phone number cannot exceed 50 characters")
    .matches(/^[0-9]+$/, "Phone number must contain only numbers")
    .test(
      'is-phone-number-present',
      'Phone number is required when country code is provided',
      function (value, context) {
        return !context.parent.countryCode || (context.parent.countryCode && value);
      }
    ),
});

const validateLogin = async (req, res, next) => {
  try {
    await authSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.errors.join(", ") 
    });
  }
};

const validateSignup = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(400).json({ 
      success: false,
      message: err.errors.join(", ") 
    });
  }
};

module.exports = {
  validateLogin,
  validateSignup
};