import * as Yup from "yup";
import { updateCurrentHomeDoc } from "../slices/HomeDocSlice";
import { useTranslation } from "react-i18next";

export const useExtraHomeDocFormik = (homeDoc, dispatch, pageType) => {
  const { t } = useTranslation();

  const extraDataItem = Yup.object({
    value: Yup.string()
      .max(35, t("validation.max_35"))
      .required(t("validation.required")),
    characteristic: Yup.string()
      .max(100, t("validation.max_100"))
      .required(t("validation.required")),
  });

  const schema = Yup.object({
    extraData: Yup.array().of(extraDataItem),
    subEntitiesQuantity: Yup.number()
      .typeError(t("validation.number"))
      .integer(t("validation.integer"))
      .positive(t("validation.positive_integer")),
    area: Yup.number()
      .typeError(t("validation.number"))
      .positive(t("validation.positive")),

    width: Yup.number()
      .typeError(t("validation.number"))
      .positive(t("validation.positive")),
    length: Yup.number()
      .typeError(t("validation.number"))
      .positive(t("validation.positive")),

    constructionYear: Yup.number()
      .typeError(t("validation.number"))
      .integer(t("validation.integer"))
      .positive(t("validation.positive_integer"))
      .max(new Date().getFullYear(), t("validation.year_invalid")),

    quantity: Yup.number()
      .typeError(t("validation.number"))
      .integer(t("validation.integer"))
      .positive(t("validation.positive_integer")),
    weight: Yup.number()
      .typeError(t("validation.number"))
      .positive(t("validation.positive")),
  });

  const formik = {
    initialValues: {
      description: homeDoc?.description || "",
      extraData: homeDoc?.extraData || [],

      width: homeDoc?.width || "",
      length: homeDoc?.length || "",

      area: homeDoc?.area || "",
      subEntitiesQuantity: homeDoc?.subEntitiesQuantity || "",
      constructionYear: homeDoc?.constructionYear || "",

      colors: homeDoc?.colors ? homeDoc?.colors.split("|") : [],
      quantity: homeDoc?.quantity || "",
      weight: homeDoc?.weight || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        updateCurrentHomeDoc({
          id: homeDoc.id,
          pageType: pageType,
          HomeDocData: {
            ...values,
            area: values.area ? parseFloat(values.area) : null,
            length: values.length ? parseFloat(values.length) : null,
            width: values.width ? parseFloat(values.width) : null,
            constructionYear: values.constructionYear
              ? parseInt(values.constructionYear)
              : null,
            quantity: values.quantity ? parseInt(values.quantity) : null,
            weight: values.weight ? parseFloat(values.weight) : null,
            colors: values.colors.join("|"),
            extraData: values.extraData.map((elem) => ({
              value: elem.value,
              characteristic: elem.characteristic,
            })),
          },
        })
      );
    },
  };

  return formik;
};
