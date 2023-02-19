import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from "antd";

import { editArticle, getOneArticle } from "../../redux/slices/listArticle";
import { ArticleForm } from "../../components/ArticleForm";
import classes from "../new-article/new-article.module.scss";

const EditArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { article: data, isError } = useSelector((state) => state.listArticle);

  useEffect(() => {
    dispatch(getOneArticle(id));
  }, []);

  const onSubmit = (date) => {
    const { tagList } = date;
    const filtersTag = tagList.filter((el) => el.tag.trim() !== "");
    const article = { article: { ...date, tagList: filtersTag.map((el) => el.tag) } };

    if (id) {
      dispatch(editArticle({ id, article }));
    }

    navigate("/", { replace: true });
  };

  if (data) {
    return (
      <div className={classes.editArticleContainer}>
        <h2 className={classes.title}>Edit article</h2>
        <ArticleForm onSubmit={onSubmit} article={data} />
      </div>
    );
  }

  return <div>{isError && <Alert message="Не удалось изменить пост" type="error" />}</div>;
};

export default EditArticle;
