import * as yup from 'yup';

const validate = (data, text) => {
  yup.setLocale({
    string: {
      url: () => text.t('parseError'),
    },
  });
  const schema = yup.object().shape({
    url: yup.string().url(),
  });

  return schema.validate({ url: data });
};

export default validate;
