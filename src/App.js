import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import Login from "./components/LoginForm";
import Logout from "./components/LogOut";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFounds";
import ProtectedRoute from "./common/ProtectedRoute";
import AllHeroes from "./components/AllHeroes";
import UserTeam from "./components/UserTeam";
import UserContext from "./common/userContext";
import HeroProfile from "./components/HeroProfile";
import Register from "./components/Register";
import auth from "./services/authServices";

const App = () => {
  const authUser = auth.getCurrentUser();
  authUser.team = [];

  const [user, setUser] = useState(authUser);

  const dispatchHeroEvent = (actionType, payload) => {
    switch (actionType) {
      case "ADD_HERO":
        user.team.push(payload);
        setUser({ ...user });
        return;
      case "REMOVE_HERO":
        let team = user.team.filter((hero) => hero.id !== payload);
        user.team = team;
        setUser({ ...user });
        return;
      default:
        return;
    }
  };

  return (
    <React.Fragment>
      <UserContext.Provider value={{ user, dispatchHeroEvent }}>
        <NavBar />
        {
          <main className="container">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/logout" component={Logout} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/all-heroes/:id" component={HeroProfile} />
              <ProtectedRoute
                path="/my-team"
                render={(props) => <UserTeam {...props} />}
              />
              <ProtectedRoute
                path="/all-heroes"
                render={(props) => <AllHeroes {...props} />}
              />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" to="my-team" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        }
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
