import React from "react";
import { Button } from "@mui/material";
import { ReactComponent as PlusIcon } from "../Assets/plus.svg";

export default function AddButton({ onClick }) {
  return (
    <Button
      sx={{
        backgroundImage: "linear-gradient(53.25deg, #57bc90 0%, #004b40 100%)",
        padding: "10px",
        width: "240px",
        color: "#ffffff",
        fontFamily: "Lato-SemiBold",
      }}
      onClick={onClick}
    >
      <span style={{ padding: "0 10px 0 0", height: "20px" }}>
        <PlusIcon style={{ height: "15px" }} />
      </span>
      Add New Customer
    </Button>
  );
}
