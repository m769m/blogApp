import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Popconfirm } from "antd";

import { deleteArticle } from "../../redux/slices/listArticle";

import ModalBtnStyle from "./ModalBtn.module.scss";

const ModalBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleDeleteBtn = async () => {
    if (slug) {
      return dispatch(deleteArticle(slug));
    }
  };

  const handleOk = async () => {
    await handleDeleteBtn();
    navigate("/", { replace: true });
  };

  return (
    <Popconfirm
      title="Are you sure to delete this article?"
      placement="rightTop"
      onConfirm={handleOk}
      okText="Yes"
      cancelText="No"
    >
      <Button className={ModalBtnStyle.deleteBtn} type="primary">
        Delete
      </Button>
    </Popconfirm>
  );
};

export default ModalBtn;
