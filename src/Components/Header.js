import React from "react";
import { Typography } from "@mui/material";

export default function Header(props) {
  return (
    <div>
      <Typography
        variant="h6"
        noWrap
        component="div"
        style={{ fontFamily: "Lato-Black", fontSize: "32px", padding: "30px" }}
      >
        {props.headTitle}
      </Typography>
    </div>
  );
}
