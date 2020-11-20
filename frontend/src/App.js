import React from "react";
import './App.css';
import NavBar from "../../frontend/src/components/NavBar";
import Sidebar from "../../frontend/src/components/Sidebar";
import DashboardApp from "../../frontend/src/components/DashboardApp";
import './dashboard.css';
import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <Sidebar/>
          </nav>
          <main role="main" className="min-h-100 col-md-9 ml-sm-auto col-lg-10 px-4">
            <DashboardApp/>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
