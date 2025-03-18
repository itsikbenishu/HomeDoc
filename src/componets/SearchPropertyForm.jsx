import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { makeStyles } from "@mui/styles";
import {
  IconButton,
  FormControl,
  InputLabel,
  NativeSelect,
  Input,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { BASIC_PAGINATION, HOME_DOC_CATEGORIES } from "../Constants";
import CreateHomeDialog from "./CreateHomeDialog";

const useStyles = makeStyles(() => ({
  iconButton: {
    height: "2.7rem",
    display: "flex",
    backgroundColor: "white",
    marginTop: 2,
    borderRadius: 4,
    ".MuiTouchRipple-ripple .MuiTouchRipple-child": {
      borderRadius: 4,
    },
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
  inputAddress: {
    width: `77rem`,
    height: "2.7rem",
    display: "flex",
    marginRight: 2,
    "label + &": {
      marginTop: 3,
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
  inputCategory: {
    width: `8rem`,
    height: "2.7rem",
    display: "flex",
    marginRight: 2,
    "label + &": {
      marginTop: 3,
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "white",
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  },
}));

const SearchPropertyForm = ({ initialCategory = "" }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialCategory || "");
  const [address, setAddress] = useState("");
  const [paramsForQueryObj, setParamsForQueryObj] = useState({});

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setParamsForQueryObj({
      ...paramsForQueryObj,
      category: event.target.value
        ? `'${event.target.value}'`
        : event.target.value,
    });
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setParamsForQueryObj({
      ...paramsForQueryObj,
      interiorEntityKey: event.target.value
        ? `'${event.target.value}'`
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
    <div style={{ background: "rgb(205 213 225)" }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel>סוג</InputLabel>
        <NativeSelect
          value={category}
          onChange={handleCategoryChange}
          className={classes.inputCategory}
        >
          <option aria-label="None" value="">
            סוג
          </option>
          {Object.entries(HOME_DOC_CATEGORIES).map(
            ([category, categoryText]) => (
              <option key={category} value={category}>
                {categoryText}
              </option>
            )
          )}
        </NativeSelect>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="addressInput">כתובת</InputLabel>
        <Input
          id="addressInput"
          value={address}
          onChange={handleAddressChange}
          className={classes.inputAddress}
          placeholder="כתובת"
        />
      </FormControl>
      <FormControl sx={{ mt: 3, ml: 1, bgcolor: "white" }} variant="standard">
        <Link to="resultsTilte" spy={true} smooth={true}>
          <IconButton onClick={handleSearch} className={classes.iconButton}>
            <SearchIcon></SearchIcon>
          </IconButton>
        </Link>
      </FormControl>
      <CreateHomeDialog />
    </div>
  );
};

export default SearchPropertyForm;
