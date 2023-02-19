import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import classes from "./ArticleForm.module.scss";

const ArticleForm = ({ onSubmit, article }) => {
  const [flag, setFlag] = useState(true);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: article?.title,
      description: article?.description,
      body: article?.body,
      tagList: article?.tagList ? article.tagList.map((el) => ({ tag: el })) : null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  const removeClick = (index) => {
    if (index === 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }

    remove(index);
  };

  const appendClick = () => {
    if (flag) {
      append({ tag: "" });
    }

    setFlag(true);
  };

  const tagsBlock = fields.map((item, index) => (
    <div key={item.id} className={classes.tag}>
      <input className={classes.tagInput} type="text" placeholder="Tag" {...register(`tagList.${index}.tag`)} />

      <button type="button" className={classes.deleteTagButton} onClick={() => removeClick(index)}>
        Delete
      </button>
    </div>
  ));

  const tagsField = (
    <div className={classes.tagsField}>
      {flag && <div className={classes.tagsBlock}>{tagsBlock}</div>}

      <button type="button" className={classes.addTagButton} onClick={() => appendClick()}>
        Add Tag
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <label className={classes.field}>
        <span className={classes.label}>Title</span>

        <input
          className={classes.textInput}
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
      </label>

      <label className={classes.field}>
        <span className={classes.label}>Short description</span>

        <input
          className={classes.textInput}
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
        />
      </label>

      <label className={classes.field}>
        <span className={classes.label}>Text</span>
        <textarea className={classes.textarea} placeholder="Text" {...register("body", { required: true })} />
      </label>

      <label className={classes.field}>
        <span className={classes.label}>Tags</span>
        {tagsField}
      </label>

      <input type="submit" className={classes.submitButton} value="Send" />
    </form>
  );
};

export default ArticleForm;
