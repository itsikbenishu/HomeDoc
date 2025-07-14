import { Grid, Typography } from "@mui/material";
import ExtraDataField from "./ExtraDataField";

const LabeledExtraDataFields = ({
  className,
  labels,
  columnsPerRow,
  ...others
}) => {
  return (
    <Grid container spacing={0.5}>
      {labels.map((label, index) => (
        <Grid
          key={label.formik || `$empty-col-${index}`}
          container
          item
          xs={12}
          sm={12 / columnsPerRow}
          spacing={0.5}
          alignItems="center"
        >
          <Grid item xs={6} sm={6}>
            <Typography sx={{ color: (theme) => theme.palette.primary.main }}>
              {label.text}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ pb: 1 }}>
            <ExtraDataField
              label={label.formik}
              className={className}
              {...others}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default LabeledExtraDataFields;
