import { useReducer } from "react";
import { createContext } from "react";

export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  bag: {
    checkoutData: localStorage.getItem("checkoutData")
      ? JSON.parse(localStorage.getItem("checkoutData"))
      : {},
    bagItems: localStorage.getItem("bagItems")
      ? JSON.parse(localStorage.getItem("bagItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "BAG_ADD_ITEM": {
      //add to bag
      const newItem = action.payload;
      const existItem = state.bag.bagItems.find(
        (item) => item._id === newItem._id
      );
      const bagItems = existItem
        ? state.bag.bagItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.bag.bagItems, newItem];
      localStorage.setItem("bagItems", JSON.stringify(bagItems));

      return {
        ...state,
        bag: {
          ...state.bag,
          bagItems,
        },
      };
    }

    case "CART_REMOVE_ITEM": {
      const bagItems = state.bag.bagItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("bagItems", JSON.stringify(bagItems));
      return {
        ...state,
        bag: {
          ...state.bag,
          bagItems,
        },
      };
    }

    case "CART_CLEAR":
      return { ...state, bag: { ...state.bag, bagItems: [] } };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        bag: {
          checkoutData: {},
          bagItems: [],
        },
      };

    case "SAVE_CHECKOUT":
      return {
        ...state,
        bag: {
          ...state.bag,
          checkoutData: action.payload,
        },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
