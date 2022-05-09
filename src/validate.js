import * as yup from 'yup';

const validate = (data, text) => {
  yup.setLocale({
    string: {
      url: () => text.t('parsingError'),
    },
  });
  const schema = yup.object().shape({
    url: yup.string().url().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    ),
  });

  return schema.validate({ url: data }, { abortEarly: false });
};
export default validate;
