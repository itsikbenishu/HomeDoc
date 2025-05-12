import React from "react";
import i18next from "../../i18nConfig";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "../utils/toast";

const getButtonsLineComps = (navigate, location, formik, otherHandlers) => {
  const { resetForm, submitForm, isValid } = formik;
  const transletor = (str) => i18next.t(str);
  const isEditMode = location.pathname.endsWith("/Edit");
  const pathname = location.pathname;

  const buttonsLineComponents = [
    {
      key: "delete",
      label: transletor("buttons_line_components.label_delete"),
      onClick: () => {},
      iconComponent: <DeleteIcon />,
      dialog: {
        message: (
          <>
            {transletor("buttons_line_components.question_and_disclaimer")
              .split("\n")
              .map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </>
        ),
        onConfirm: otherHandlers["delete"],
      },
    },
    {
      key: "editSave",
      label: isEditMode
        ? transletor("buttons_line_components.label_save")
        : transletor("buttons_line_components.label_edit"),
      onClick: () => {
        if (isEditMode) {
          submitForm();
          if (isValid) {
            navigate(pathname.substring(0, pathname.indexOf("/Edit")));
          } else {
            toast(
              transletor("buttons_line_components.failed_edit"),
              "error",
              10000
            );
          }
        } else {
          navigate(`${pathname}/Edit`);
        }
      },
      iconComponent: isEditMode ? <SaveIcon /> : <EditIcon />,
    },
  ];

  if (isEditMode) {
    buttonsLineComponents.push({
      key: "cancel",
      label: transletor("buttons_line_components.label_cancel"),
      onClick: () => {
        resetForm();
        navigate(pathname.substring(0, pathname.indexOf("/Edit")));
      },
      iconComponent: <CloseIcon />,
    });
  }

  return buttonsLineComponents;
};

export default getButtonsLineComps;
