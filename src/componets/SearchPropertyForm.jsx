import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import {
  IconButton,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASIC_PAGINATION } from "../../Constants";
import CreateHomeDialog from "./CreateHomeDialog";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";

const useStyles = makeStyles(() => ({
  container: { display: "flex", alignItems: "center" },
  iconButton: {
    height: "2.7rem",
    display: "flex",
    backgroundColor: "white",
    marginTop: 2,
    borderRadius: 8,
    ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
      borderRadius: 8,
    },
    "&:hover": {
      borderRadius: 8,
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      "&:active": {
        borderRadius: 8,
        border: "1px solid #80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
  inputAddress: {
    height: "2.7rem",
    borderRadius: 8,
    ".mui-hbm4je-MuiInputBase-root-MuiInput-root": { borderRadius: 8 },
    "& .MuiInputBase-input": {
      borderRadius: 8,
      position: "relative",
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      "&:focus": {
        borderRadius: 8,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
  inputCategory: {
    height: "2.7rem",
    display: "flex",
    borderRadius: 8,
    "label + &": {
      marginTop: 3,
    },
    "& .MuiInputBase-input": {
      borderRadius: 8,
      position: "relative",
      backgroundColor: "white",

      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      "&:focus": {
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
}));

const SearchPropertyForm = ({ initialCategory = "" }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { HOME_DOC_CATEGORIES } = useTranslatedConstants();
  const [category, setCategory] = useState(initialCategory || "");
  const [address, setAddress] = useState("");
  const [paramsForQueryObj, setParamsForQueryObj] = useState({});

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setParamsForQueryObj({
      ...paramsForQueryObj,
      category: event.target.value
        ? `${event.target.value}`
        : event.target.value,
    });
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setParamsForQueryObj({
      ...paramsForQueryObj,
      interiorEntityKey: event.target.value
        ? `${event.target.value}`
        : event.target.value,
    });
  };
  const handleSearch = () => {
    let paramsForQuery =
      initialCategory === "" ? "?" : `?category=${initialCategory}`;
    paramsForQuery = "?";

    Object.entries(paramsForQueryObj).forEach(([key, value]) => {
      paramsForQuery =
        value === ""
          ? paramsForQuery
          : paramsForQuery === "?"
          ? paramsForQuery + key + "=" + value
          : paramsForQuery + "&" + key + "=" + value;
    });

    const isPaginted =
      paramsForQuery.indexOf("page=") === -1 &&
      paramsForQuery.indexOf("limit=") === -1;

    paramsForQuery =
      paramsForQuery === "?" ? paramsForQuery : paramsForQuery + "&";

    paramsForQuery = isPaginted
      ? paramsForQuery + BASIC_PAGINATION
      : paramsForQuery;

    navigate("/Results" + paramsForQuery);
  };

  return (
    <Box
      className={classes.container}
      sx={{
        px: { xs: 0.5, sm: 1 },
        mt: { xs: -1, sm: -2 },
        gap: { xs: 0.4, sm: 0.8 },
      }}
    >
      <Box
        sx={{
          p: 0.5,
          flexShrink: 0,
          width: {
            xs: "35%",
            sm: "auto",
          },
        }}
      >
        <FormControl variant="standard">
          <InputLabel>{t("search_homedoc_page.label_type")}</InputLabel>
          <NativeSelect
            value={category}
            onChange={handleCategoryChange}
            className={classes.inputCategory}
            disableUnderline
            dir="rtl"
          >
            <option aria-label="None" value="">
              {t("search_homedoc_page.label_type")}
            </option>
            {Object.entries(HOME_DOC_CATEGORIES).map(
              ([category, categoryText]) => (
                <option
                  key={category}
                  value={category}
                  style={{ textAlign: "left" }}
                >
                  {categoryText}
                </option>
              )
            )}
          </NativeSelect>
        </FormControl>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel htmlFor="addressInput">
            {t("search_homedoc_page.label_address")}
          </InputLabel>
          <Input
            value={address}
            onChange={handleAddressChange}
            className={classes.inputAddress}
            placeholder={t("search_homedoc_page.label_address")}
            disableUnderline
          />
        </FormControl>
      </Box>

      <Box sx={{ pt: 2 }}>
        <FormControl
          sx={{
            bgcolor: (theme) => theme.palette.primary.contrastText,
            borderRadius: 2,
          }}
          variant="standard"
        >
          <IconButton onClick={handleSearch} className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </FormControl>
      </Box>
      <Box sx={{ pb: 1 }}>
        <CreateHomeDialog />
      </Box>
    </Box>
  );
};

export default SearchPropertyForm;
