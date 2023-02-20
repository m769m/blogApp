import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

import classes from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={classes.wrapper}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
