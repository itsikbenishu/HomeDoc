import * as Yup from "yup";
import { updateCurrentHomeDoc } from "../slices/HomeDocSlice";

export const useExtraHomeDocFormik = (homeDoc, dispatch, pageType) => {
  const etraDataItem = Yup.object({
    value: Yup.string()
      .max(35, "אורך השדה המירבי הוא 35 תווים")
      .required("שדה חובה"),
    characteristic: Yup.string()
      .max(100, "אורך השדה המירבי הוא 100 תווים")
      .required("שדה חובה"),
  });

  const schema = Yup.object({
    extraData: Yup.array().of(etraDataItem),
    subEntitiesQuantity: Yup.number()
      .typeError("מספר בלבד")
      .integer("מספר שלם בלבד")
      .positive("מספר שלם חיובי בלבד"),
    area: Yup.number().typeError("מספר בלבד").positive("מספר חיובי בלבד"),

    width: Yup.number().typeError("מספר בלבד").positive("מספר חיובי בלבד"),
    length: Yup.number().typeError("מספר בלבד").positive("מספר חיובי בלבד"),

    constructionYear: Yup.number()
      .typeError("מספר בלבד")
      .integer("מספר שלם בלבד")
      .positive("מספר שלם חיובי בלבד")
      .max(new Date().getFullYear(), "שנה לא תקינה"),

    quantity: Yup.number()
      .typeError("מספר בלבד")
      .integer("מספר שלם בלבד")
      .positive("מספר שלם חיובי בלבד"),
    weight: Yup.number().typeError("מספר בלבד").positive("מספר חיובי בלבד"),
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
          data: {
            ...values,
            colors: values.colors.join("|"),
            extraData: values.extraData.map((elem) => {
              return {
                value: elem.value,
                characteristic: elem.characteristic,
              };
            }),
          },
        })
      );
    },
  };

  return formik;
};
