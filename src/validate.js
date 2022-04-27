import * as yup from 'yup';
// import keyBy from 'lodash/keyBy.js';

const schema = yup.object({
  url: yup.string().optional().url(),
});

const validate = async (field) => {
  try {
    await schema.validate(field);
    return {};
  } catch (errors) {
    console.log(errors);
    return errors;
  }
};

export default validate;
