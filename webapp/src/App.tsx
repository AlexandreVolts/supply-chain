import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Room } from "./Room";

function App() {
    return (
        <div className="App">
            <header>
                <h1>Supply Chain</h1>
            </header>
            <div className="content">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/room/:id">
                        <Room />
                    </Route>
                 </Switch>
             </div>
        </div>
    );
}

export default App;
