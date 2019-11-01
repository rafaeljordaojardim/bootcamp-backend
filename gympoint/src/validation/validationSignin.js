import * as yup from 'yup';

const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .required()
    .email(),
  password: yup
    .string()
    .required()
    .min(6),
});

export default schemaValidation;
