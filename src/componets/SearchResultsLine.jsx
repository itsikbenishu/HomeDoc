import { Card, Stack, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResultsLine = ({
  item,
  idName = "id",
  fields = [],
  rowIndex,
  isLinkable = false,
  linkPath = "",
}) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{
        width: "85rem",
        height: "2.5rem",
      }}
    >
      <Stack direction="row">
        {fields.map((field) => (
          <div
            key={`${item[idName]}-${field}`}
            style={{
              width: `${85 / fields.length}rem`,
              height: "2.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#430494",
              fontSize: "1.2rem",
              whiteSpace: "nowrap",
            }}
          >
            {field === "#" ? rowIndex : item[field]}
          </div>
        ))}
        {isLinkable && (
          <IconButton
            key={`icon-${item[idName]}`}
            onClick={() => {
              navigate(`${linkPath}/${item[idName]}`);
            }}
            style={{
              width: `2.5rem`,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};

export default SearchResultsLine;
