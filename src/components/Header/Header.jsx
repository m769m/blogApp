import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../redux/slices/user";
import Avatar from "../../assets/images/Avatar.svg";

import classes from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.saveUser.user);

  const token = localStorage.getItem("token");

  const handleOnClick = () => {
    dispatch(logOut());
    navigate("/", { replace: true });
  };

  return (
    <header className={classes.head}>
      <Link to="/" className={classes.link}>
        <span className={classes.txt}>Realworld Blog</span>
      </Link>

      {token ? (
        <div className={classes.auth}>
          <Link className={classes.authLink} to="/new-article">
            <button className={classes.btnArticle} type="button">
              Create article
            </button>
          </Link>

          <Link to="/profile">
            <button className={classes.btn} type="button">
              {username}
              <img className={classes.imageAuth} src={Avatar} alt="Avatar" />
            </button>
          </Link>

          <Link className={classes.authLink} to="/">
            <button onClick={handleOnClick} className={classes.btnLogOut} type="button">
              Log Out
            </button>
          </Link>
        </div>
      ) : (
        <div className={classes.authLink}>
          <Link className={classes.authLink} to="/sign-in">
            <button className={classes.btn} type="button">
              Sign In
            </button>
          </Link>

          <Link to="/sign-up">
            <button className={classes.btnUp} type="button">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
