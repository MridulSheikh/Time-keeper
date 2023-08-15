import { useContext } from "react";
import { cart } from "./Context";

const cartState = () => useContext(cart);

export default cartState;
