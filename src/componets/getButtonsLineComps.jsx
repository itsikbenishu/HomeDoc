import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "../utils/toast";

const getButtonsLineComps = (navigate, location, formik, otherHandlers) => {
  const { resetForm, submitForm, isValid } = formik;
  const isEditMode = location.pathname.endsWith("/Edit");
  const pathname = location.pathname;

  const buttonsLineComponents = [
    {
      key: "delete",
      label: "מחיקה",
      onClick: () => {},
      iconComponent: <DeleteIcon />,
      dialog: {
        message: (
          <>
            האם אתה בטוח שהינך מעוניין למחוק את התיעוד? <br /> ימחקו גם תיעודים
            של תתי ישויות.
          </>
        ),
        onConfirm: otherHandlers["delete"],
      },
    },
    {
      key: "editSave",
      label: isEditMode ? "שמירה" : "עריכה",
      onClick: () => {
        if (isEditMode) {
          submitForm();
          if (isValid) {
            navigate(pathname.substring(0, pathname.indexOf("/Edit")));
          } else {
            toast(" העדכון נכשל בשל שדה שגוי ", "error", 10000);
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
      label: "ביטול",
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
