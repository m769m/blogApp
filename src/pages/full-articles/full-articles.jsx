import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { Alert, Spin } from "antd";

import { getOneArticle, favorite, unFavorite } from "../../redux/slices/list-article";
import Vector from "../../assets/images/Vector.svg";
import Heart from "../../assets/images/Heart.svg";
import { ModalButton } from "../../components/ModalButton";

import classes from "./full-articles.module.scss";

const FullArticles = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { article, favorited, favoritesCount, isLoading, isError } = useSelector((state) => state.listArticle);
  const { user } = useSelector((state) => state.saveUser);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (slug) {
      dispatch(getOneArticle(slug));
    }
  }, [slug]);

  const favoriteClick = async () => {
    if (token && slug) {
      dispatch(favorite(slug));
    }
  };

  const unFavoriteClick = async () => {
    if (token && slug) {
      dispatch(unFavorite(slug));
    }
  };

  if (isLoading === "getOneArticle") {
    return (
      <Spin tip="Loading...">
        <Alert message="Идет загрузка" type="info" />
      </Spin>
    );
  }

  if (article) {
    const { author, title, body, createdAt, description, tagList } = article;
    const isOwnArticle = author.username === user?.username;

    return (
      <div className={classes.list}>
        <div className={classes.block}>
          <div className={classes.title}>
            <h3 className={classes.text}>{title}</h3>

            <button onClick={favorited ? unFavoriteClick : favoriteClick} className={classes.btnFull} type="button">
              <img src={favorited && token ? Heart : Vector} alt="like" />
            </button>

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

          <ReactMarkdown children={body} />
          <ReactMarkdown children={description} />
        </div>

        <div className={classes.authFull}>
          <div className={classes.auth}>
            <div className={classes.userInfo}>
              <span className={classes.userInfoText}>{author.username}</span>
              <span className={classes.userInfoText}>{format(new Date(createdAt), "d MMMM, Y")} </span>
            </div>

            <img className={classes.imageFull} src={author.image} alt="avatar" />
          </div>

          <div>
            {user && isOwnArticle && (
              <div className={classes.btns}>
                <ModalButton />

                <Link to={`/articles/${slug}/edit`}>
                  <button type="button" className={classes.edit}>
                    Edit
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div>{isError && <Alert message="Не удалось загрузить пост" type="error" />}</div>;
};

export default FullArticles;
