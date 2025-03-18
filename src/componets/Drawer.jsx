import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { NAVBAR_LINKS } from "../Constants";

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {NAVBAR_LINKS.map((link) => (
            <ListItem onClick={() => setOpenDrawer(false)} key={link.key}>
              <ListItemText key={link.key}>
                <Link to={link.loc} key={link.key}>
                  {link.name}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
          }}
        />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
