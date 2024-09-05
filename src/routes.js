// /routes.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import RoutePage from './pages/Routes/RoutePage';
import StationPage from './pages/Stations/StationPage';
import TicketPage from './pages/Tickets/TicketPage';
import TrainPage from './pages/Trains/TrainPage';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/routes" component={RoutePage} />
                <Route path="/stations" component={StationPage} />
                <Route path="/tickets" component={TicketPage} />
                <Route path="/trains" component={TrainPage} />
                {/* Another route */}
            </Switch>
        </Router>
    );
};

export default Routes;
