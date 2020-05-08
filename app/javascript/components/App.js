import { Link, Router } from "@reach/router";
import React from "react";
import UsersTable from "./UsersTable";
import RegularQuery from "./RegularQuery";
import FancyQuery from "./FancyQuery";

const App = () => (
  <div className="app">
    <nav>
      <Link to="regular_query">Regular Query</Link>
      <span>&nbsp;&mdash;&nbsp;</span>
      <Link to="fancy_query">Fancy Query</Link>
      <span>&nbsp;&mdash;&nbsp;</span>
      <Link to="users_table">Users Table</Link>
    </nav>
    <Router>
      <UsersTable path="users_table" />
      <RegularQuery path="regular_query" />
      <FancyQuery path="fancy_query" />
    </Router>
  </div>
);

export default App;
