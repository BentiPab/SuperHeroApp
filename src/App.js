import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router";
import "./App.css";
import Login from "./components/LoginForm";
import Logout from "./components/LogOut";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFounds";
import ProtectedRoute from "./common/ProtectedRoute";
import HeroSearch from "./components/HeroSearch";
import UserTeam from "./components/UserTeam";
import UserContext from "./common/userContext";
import HeroProfile from "./components/HeroProfile";
import Register from "./components/Register";
import auth from "./services/authServices";
import HeroIndex from "./components/HeroesIndex";

const App = () => {
  const authUser = auth.getCurrentUser();
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    if (user && !user.team) {
      user.team = [];
    }
  }, [user]);

  const dispatchHeroEvent = (actionType, payload) => {
    switch (actionType) {
      case "ADD_HERO":
        user.team.push(payload);
        setUser({ ...user });
        return;
      case "REMOVE_HERO":
        user.team = user.team.filter((hero) => hero.id !== payload);
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

        <main className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
            <Route path="/hero-index" component={HeroIndex} />
            <ProtectedRoute path="/all-heroes/:id" component={HeroProfile} />
            <ProtectedRoute
              path="/my-team"
              render={(props) => <UserTeam {...props} />}
            />
            <ProtectedRoute
              path="/find-hero"
              render={(props) => <HeroSearch {...props} />}
            />
            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" to="my-team" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default App;
