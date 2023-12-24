import * as React from "react";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from "../Features/itemReducer";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import sortUp from "../Assets/sort_up.svg";
import sortDown from "../Assets/sort_down.svg";

const Styledhead = styled(Paper)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderRadius: "10px",
  height: "auto",
  backgroundColor: "rgba(87, 188, 144, 0.3)",
  maxWidth: "100%",
  margin: "auto",
  boxShadow: "none",
  marginBottom: "20px",
  "@media (max-width: 900px)": {
    flexDirection: "column",
    justifyContent: "center",
  },
  "@media (max-width: 1000px)": {
    "& ul": {
      display: "flex",
      flexDirection: "column",
    },
    "& li": {
      padding: "0px !important",
      width: "200px",
    },
  },
});

const StyledPaper = styled(Paper)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "10px",
  maxWidth: "100%",
  boxShadow: "0px 3px 5px #8D8D8D1A",
  margin: "auto",
  marginBottom: "20px",
  borderRadius: "10px",
  flexWrap: "wrap",
  justifyContent: "space-between",
  "@media (max-width: 1072px)": {
    "& .table_row": {
      display: "flex",
      flexDirection: "column",
    },
  },
});

const AvatarContainer = styled("div")({
  borderRadius: "8px",
  border: "2px solid white",
  zIndex: 9,
});

const Sort = styled(Button)({
  display: 'flex',
  fontFamily: 'Lato-Black',
  fontSize: '16px',
  alignItems: 'center',
  color: "#015249",
});

const Edit = styled(Button)({
  width: "100px",
  backgroundColor: "rgba(57, 181, 74, 0.4)",
  boxShadow: "none",
  color: "#008212",
  lineHeight: "1.20",
  fontFamily: "Lato-SemiBold",
  fontSize: "14px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "rgba(57, 181, 74, 0.4)",
    boxShadow: "none",
  },
});

const DeleteButton = styled(Button)({
  width: "100px",
  backgroundColor: "rgba(216, 0, 0, 0.4)",
  boxShadow: "none",
  color: "#D80000",
  fontFamily: "Lato-SemiBold",
  fontSize: "14px",
  lineHeight: "1.20",
  textTransform: "none",
  marginLeft: "50px",
  "&:hover": {
    backgroundColor: "rgba(216, 0, 0, 0.4)",
    boxShadow: "none",
  },
});
const ArrowDropDownIcon = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "6px",
    }}
  >
    <img
      src={sortUp}
      alt="Sort Up"
      style={{ marginBottom: "-8px", width: "9px" }}
    />
    <img
      src={sortDown}
      alt="Sort Down"
      style={{ marginTop: "-4px", width: "9px" }}
    />
  </div>
);

export default function HorizontalRow({ openModal }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const items = useSelector((state) => state.app.items);
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteItemClick = (item) => {
    setItemToDelete(item);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setItemToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmationConfirm = () => {
    dispatch(deleteItem(itemToDelete.id));
    setItemToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleEditModalClose = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users?page=1");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        const sortedData = result.data.sort((a, b) => {
          if (sortDirection === "asc") {
            return a[sortOption] > b[sortOption] ? 1 : -1;
          } else {
            return a[sortOption] < b[sortOption] ? 1 : -1;
          }
        });
        setData(sortedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortOption, sortDirection]);

  const handleSortChange = (option) => {
    if (option === sortOption) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortOption(option);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <Styledhead>
        <div style={{ textAlign: "center", flexGrow: 1 }}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: "auto 0",
              width: "75%",
              justifyContent: "center",
            }}
          >
            <li style={{ padding: "0 60px" }}>
              <Sort onClick={() => handleSortChange("id")}>
                Customer ID <ArrowDropDownIcon />
              </Sort>
            </li>
            <li style={{ padding: "0 60px" }}>
              <Sort onClick={() => handleSortChange("first_name")}>
                Customer Name <ArrowDropDownIcon />
              </Sort>
            </li>

            <li style={{ padding: "0 60px" }}>
              <Sort onClick={() => handleSortChange("email")}>
                Email <ArrowDropDownIcon />
              </Sort>
            </li>
          </ul>
        </div>
      </Styledhead>
      {loading && (
        <p style={{ textAlign: "center", marginTop: "16px" }}>Loading...</p>
      )}
      {error && (
        <p style={{ textAlign: "center", marginTop: "16px", color: "red" }}>
          Error: {error}
        </p>
      )}
      {!loading && !error && (
        <div>
          {data.map((item) => (
            <StyledPaper key={item.id}>
              <div
                className="table_row"
                style={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AvatarContainer
                  style={{ flex: "0 0 auto", padding: "0 10px" }}
                >
                  <img
                    src={item.avatar}
                    alt={`Avatar for ${item.first_name}`}
                    style={{ borderRadius: "8px", width: "80px" }}
                  />
                </AvatarContainer>
                {/* Display only the last 3 digits of the item.id */}
                <div
                  style={{
                    flex: "0 1 auto",
                    padding: "0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.id}
                </div>
                <div
                  style={{
                    flex: "0 1 auto",
                    padding: "0",
                    textDecoration: "underline",
                    fontFamily: "Lato-Semibold",
                    color: "#57BC90",
                  }}
                >
                  {`${item.first_name} ${item.last_name}`}
                </div>
                <div
                  style={{
                    flex: "0 1 auto",
                    padding: "0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.email}
                </div>
                <div style={{ flex: "0 0 auto", textAlign: "center" }}>
                  <Edit
                    variant="contained"
                    color="primary"
                    style={{ width: "100px" }}
                    onClick={() => openModal(item)}
                  >
                    Edit
                  </Edit>
                  <DeleteButton
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteItemClick(item)}
                  >
                    Delete
                  </DeleteButton>
                </div>
              </div>
            </StyledPaper>
          ))}
          <h1 style={{ textAlign: "center" }}>Here's The LocalStorage Data</h1>
          {items.map((item) => (
            <StyledPaper key={item.id}>
              <div
                className="table_row"
                style={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AvatarContainer
                  style={{ flex: "0 0 auto", padding: "0 10px" }}
                >
                  <img
                    src={item.image}
                    alt={`Avatar for ${item.name}`}
                    style={{ borderRadius: "8px", height: "60px" }}
                  />
                </AvatarContainer>
                {/* Display only the last 3 digits of the item.id */}
                <div
                  style={{
                    flex: "0 1 auto",
                    padding: "0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.id.toString().slice(-3)}
                </div>
                <div
                  style={{
                    flex: "0 1 auto",
                    padding: "0",
                    textDecoration: "underline",
                    fontFamily: "Lato-Semibold",
                    color: "#57BC90",
                  }}
                >
                  {`${item.name}`}
                </div>
                <div
                  style={{
                    flex: "0 1 auto",
                    padding: "0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.email}
                </div>
                <div style={{ flex: "0 0 auto", textAlign: "center" }}>
                  <Edit
                    variant="contained"
                    color="primary"
                    onClick={() => openModal(item)}
                  >
                    Edit
                  </Edit>
                  <DeleteButton
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteItemClick(item)}
                  >
                    Delete
                  </DeleteButton>
                </div>
              </div>
            </StyledPaper>
          ))}

          {selectedItem && (
            <Modal
              mode="edit"
              currentItem={selectedItem}
              handleClose={handleEditModalClose}
            />
          )}
          <DeleteModal
            open={deleteConfirmationOpen}
            onClose={handleDeleteConfirmationClose}
            onConfirm={handleDeleteConfirmationConfirm}
          />
        </div>
      )}
    </div>
  );
}
