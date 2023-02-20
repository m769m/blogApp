import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { Alert } from "antd";

import Vector from "../../assets/images/Vector.svg";
import Heart from "../../assets/images/Heart.svg";
import { favorite, unFavorite } from "../../redux/slices/list-article";

import classes from "./ArticlesCard.module.scss";

const ArticlesCard = ({ author, slug, body, title, updatedAt, favorited, favoritesCount, tagList }) => {
  const { isError } = useSelector((state) => state.listArticle);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const favoriteClick = async () => {
    if (token) {
      dispatch(favorite(slug));
    } else {
      alert("Необходимо авторизоваться");
    }
  };

  const unFavoriteClick = async () => {
    if (token) {
      dispatch(unFavorite(slug));
    }
  };

  const { image, username } = author;

  return (
    <li className={classes.list}>
      <div className={classes.block}>
        <div className={classes.title}>
          <Link to={`/articles/${slug}`}>
            <h3 className={classes.text}>{title}</h3>
          </Link>

          <button onClick={favorited ? unFavoriteClick : favoriteClick} className={classes.btn} type="button">
            <img src={favorited ? Heart : Vector} alt="like" />
          </button>

          {isError && <Alert message="Ошибка" type="error" />}

          {favoritesCount}
        </div>

        <div className={classes.tags}>
          {tagList.map((tag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={index} className={classes.tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className={classes.par}>{body}</p>
      </div>

      <div className={classes.auth}>
        <div className={classes.userInfo}>
          <span className={classes.userInfoText}>{username}</span>
          <span>{format(new Date(updatedAt), "d MMMM, Y")} </span>
        </div>

        <img className={classes.authImage} src={image} alt="avatar" />
      </div>
    </li>
  );
};

export default ArticlesCard;
