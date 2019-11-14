import * as React from 'react';

const routers = [
  {path: "/", name: "Index", component: './containers/Home',auth: true},
  {path: "/home", name: "Home", component: './containers/Home',auth: true},
  {path: "/login", name: "Login", component: './containers/Login'},
  {path: "/register", name: "Register", component: './containers/Register'},
  {path: "/2019", name: "My", component: './containers/CurrentYear', auth: true},
  {path: "/2018", name: "Create", component: './containers/PastYear', auth: true},
  {path: "/2017", name: "Detail", component: './containers/PastYear', auth: true},
]

export default routers;
