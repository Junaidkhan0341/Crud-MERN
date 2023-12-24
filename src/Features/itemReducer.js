export const CREATE_Customer = "CREATE_Customer";
export const UPDATE_Customer = "UPDATE_Customer";
export const DELETE_Customer = "DELETE_Customer";

export const createItem = (newItem) => ({
  type: CREATE_Customer,
  payload: newItem,
});

export const updateItem = (updatedItem) => ({
  type: UPDATE_Customer,
  payload: updatedItem,
});

export const deleteItem = (itemId) => ({
  type: DELETE_Customer,
  payload: itemId,
});

const initialState = {
  items: loadItemsFromStorage() || [],
};

function loadItemsFromStorage() {
  const storedItems = localStorage.getItem("items");
  return storedItems ? JSON.parse(storedItems) : [];
}

function saveItemsToStorage(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_Customer:
      const createdItems = [...state.items, action.payload];
      saveItemsToStorage(createdItems);
      return { ...state, items: createdItems };

    case UPDATE_Customer:
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      saveItemsToStorage(updatedItems);
      return { ...state, items: updatedItems };

    case DELETE_Customer:
      const deletedItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      saveItemsToStorage(deletedItems);
      return { ...state, items: deletedItems };

    default:
      return state;
  }
};

export default itemReducer;
