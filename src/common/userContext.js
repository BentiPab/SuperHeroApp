import React from "react";
import auth from "../services/authServices";

let user = auth.getCurrentUser();
const UserContext = React.createContext(user);

UserContext.displayName = "UserContext";

export default UserContext;
