import * as yup from 'yup';

const validate = (data) => {
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  return schema.validate({ url: data });
};

export default validate;
