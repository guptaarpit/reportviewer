import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Import miscellaneous routes and other requirements
import App from './components/app';
import NotFoundPage from './components/pages/not-found-page';

// Import static pages
import HomePage from './components/pages/home-page';
import ContactPage from './components/pages/contact-page';

// Import authentication related pages
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import ForgotPassword from './components/auth/forgot_password';
import ResetPassword from './components/auth/reset_password';

// Import dashboard pages
/* import Dashboard from './components/dashboard/dashboard';
 import ViewProfile from './components/dashboard/profile/view-profile';
 import Inbox from './components/dashboard/messaging/inbox';
 import Conversation from './components/dashboard/messaging/conversation';
 import ComposeMessage from './components/dashboard/messaging/compose-message';
 import BillingSettings from './components/billing/settings'; */

import MainDashboard from './components/dashboards/main';
import MainChart from './components/charts/main';

// Import higher order components
// import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={MainDashboard} />
    <Route path="contact-us" component={ContactPage} />
    <Route path="register" component={Register} />
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
    <Route path="forgot-password" component={ForgotPassword} />
    <Route path="reset-password/:resetToken" component={ResetPassword} />
    <Route path="home" component={HomePage} />
    <Route path="benchmark" component={HomePage} />
    <Route path="services" component={HomePage} />
    <Route path="schedule" component={HomePage} />
    <Route path="contact" component={HomePage} />
    <Route path="chart" component={MainChart} />

    {/* <Route path="billing/settings" component={RequireAuth(BillingSettings)} />

     <Route path="profile" component={RequireAuth(ViewProfile)} />

     <Route path="dashboard">
     <IndexRoute component={RequireAuth(Dashboard)} />
     <Route path="inbox" component={RequireAuth(Inbox)} />
     <Route path="conversation/new" component={RequireAuth(ComposeMessage)} />
     <Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
     </Route>*/}

    <Route path="*" component={NotFoundPage} />
  </Route>
);
