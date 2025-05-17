import { useTranslation } from "react-i18next";
import * as constants from "../../Constants";

export const useTranslatedConstants = () => {
  const { t } = useTranslation();

  const translatedConstants = {
    SYS_NAME: t("SYS_NAME", { defaultValue: constants.SYS_NAME }),

    HOME_DOC_CATEGORIES: Object.keys(constants.HOME_DOC_CATEGORIES).reduce(
      (acc, key) => {
        acc[key] = t(`HOME_DOC_CATEGORIES.${key}`, {
          defaultValue: constants.HOME_DOC_CATEGORIES[key],
        });
        return acc;
      },
      {}
    ),

    HOME_DOC_RESIDENCE_TYPE: Object.keys(
      constants.HOME_DOC_RESIDENCE_TYPE
    ).reduce((acc, key) => {
      acc[key] = t(`HOME_DOC_RESIDENCE_TYPE.${key}`, {
        defaultValue: constants.HOME_DOC_RESIDENCE_TYPE[key],
      });
      return acc;
    }, {}),

    HOME_DOC_CHATTELS_TYPE: Object.keys(
      constants.HOME_DOC_CHATTELS_TYPE
    ).reduce((acc, key) => {
      acc[key] = t(`HOME_DOC_CHATTELS_TYPE.${key}`, {
        defaultValue: constants.HOME_DOC_CHATTELS_TYPE[key],
      });
      return acc;
    }, {}),

    SUB_HOME_DOC_KEY: Object.keys(constants.SUB_HOME_DOC_KEY).reduce(
      (acc, key) => {
        acc[key] = t(`SUB_HOME_DOC_KEY.${key}`, {
          defaultValue: constants.SUB_HOME_DOC_KEY[key],
        });
        return acc;
      },
      {}
    ),

    SUB_HOME_DOC_LIST: Object.keys(constants.SUB_HOME_DOC_LIST).reduce(
      (acc, key) => {
        acc[key] = t(`SUB_HOME_DOC_LIST.${key}`, {
          defaultValue: constants.SUB_HOME_DOC_LIST[key],
        });
        return acc;
      },
      {}
    ),
  };

  return translatedConstants;
};
