import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createItem, updateItem } from "../Features/itemReducer";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import modal_header from "../Assets/modal_header.png";

export default function Modal({ isOpen, handleClose, mode, currentItem }) {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    image: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "edit" && currentItem) {
      setCustomer({
        name: currentItem.name,
        email: currentItem.email,
        image: null,
      });
    } else {
      setCustomer({
        name: "",
        email: "",
        image: null,
      });
    }
  }, [isOpen, mode, currentItem]);

  const getCustomerData = (e) => {
    if (e.target.name === "image") {
      setCustomer({ ...customer, [e.target.name]: e.target.files[0] });
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (customer.image && customer.image instanceof File) {
      try {
        const formData = new FormData();
        formData.append("file", customer.image);
        formData.append("upload_preset", "kvnnbdmy");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dxbiuh1al/image/upload",
          formData
        );

        if (response.status === 200) {
          const imageUrl = response.data.secure_url;
          updateItemWithImage(imageUrl);
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error(
          "Error uploading image:",
          error.response ? error.response.data : error.message
        );
      } finally {
        handleClose();
      }
    } else {
      // No new image selected, update item without uploading a new image
      updateItemWithImage(currentItem ? currentItem.image : null);
    }
  };

  const updateItemWithImage = (imageUrl) => {
    const newItem = {
      id: currentItem ? currentItem.id : generateUniqueId(),
      name: customer.name,
      email: customer.email,
      image: imageUrl,
    };

    if (mode === "edit") {
      dispatch(updateItem(newItem));
    } else {
      dispatch(createItem(newItem));
    }

    setCustomer({
      name: "",
      email: "",
      image: null,
    });

    handleClose();
  };

  const generateUniqueId = () => {
    return Date.now().toString();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      style={{ width: "500px", margin: "auto" }}
    >
      <Box
        sx={{
          backgroundImage: `url(${modal_header})`,
          backgroundSize: "cover",
          height: "127px",
          alignItems: "end",
          display: "flex",
        }}
      >
        <IconButton
          style={{
            position: "absolute",
            top: "7px",
            right: "10px",
            color: "white",
          }}
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle
          id="alert-dialog-title"
          style={{
            margin: "0 auto",
            color: "#fff",
            fontFamily: "Recoleta-SemiBold",
            fontSize: "35px",
          }}
        >
          {mode === "edit" ? "Edit Customer" : "Add New Customer"}
        </DialogTitle>
      </Box>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{ backgroundColor: "#FBFCFC" }}
      >
        <DialogContent sx={{ padding: "27px 20px" }}>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Customer Name"
            type="text"
            fullWidth
            name="name"
            value={customer.name}
            onChange={getCustomerData}
            sx={{ padding: "10px 0" }}
          />
          <TextField
            margin="dense"
            id="email"
            placeholder="Email Address"
            type="email"
            fullWidth
            name="email"
            value={customer.email}
            onChange={getCustomerData}
            sx={{ padding: "10px 0" }}
          />
          <input
            type="file"
            id="imageInput"
            name="image"
            accept="image/*"
            onChange={getCustomerData}
            style={{ display: "none" }}
          />
          <label htmlFor="imageInput" className="input-label">
            Upload Photo
          </label>
        </DialogContent>

        <DialogActions
          style={{ justifyContent: "center", marginBottom: "40px" }}
        >
          <Button
            sx={{
              backgroundImage:
                "linear-gradient(53.25deg, #57bc90 0%, #004b40 100%)",
              padding: "10px",
              width: "400px",
              color: "#ffffff",
              fontFamily: "Lato-SemiBold",
              fontWeight: "900",
              fontSize: "14px",
            }}
            type="submit"
          >
            {mode === "edit" ? "Edit Customer" : "Add Customer"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
