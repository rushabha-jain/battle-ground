import "./App.css";
import React from "react";
import ThemeContext from "./contexts/theme";
import Nav from "./components/Nav";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Loading from "./Loading";

// Loading components only when they get rendered
const Popular = React.lazy(() => import("./Popular"));
const Battle = React.lazy(() => import("./Battle"));
const Results = React.lazy(() => import("./Results"));

export default function App(props) {
  const [theme, setTheme] = React.useState("light");
  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }
    }),
    [theme]
  );

  return (
    <Router>
      <ThemeContext.Provider value={value}>
        <div className={theme}>
          <div className="container">
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route path="/" exact component={Popular} />
                <Route path="/battle" exact component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route path="*">
                  <h3>404, Page Not Found!!!</h3>
                </Route>
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeContext.Provider>
    </Router>
  );
}
