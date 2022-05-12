import * as yup from 'yup';

const validate = (data, text) => {
  yup.setLocale({
    string: {
      url: () => text.t('parsingError'),
    },
  });
  const schema = yup.object().shape({
    url: yup.string().url().required(),
  });

  return schema.validate({ url: data }, { abortEarly: false });
};

export default validate;
