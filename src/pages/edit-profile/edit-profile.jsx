import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "../../services/index";
import { saveUserInfo } from "../../redux/slices/user";

import classes from "./edit-profile.module.scss";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (user) => {
    if (user) {
      try {
        const { data } = await axios.put("/user", {
          user,
        });

        reset();

        dispatch(saveUserInfo(data.user.username));

        navigate("/", { replace: true });

        return data;
      } catch (err) {
        if (err?.response?.data?.errors)
          setError("username", {
            type: "server",
            message: "username is already taken.",
          });
      }
    }
  };

  return (
    <div className={classes.wrapform}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.titleEdit}>Edit Profile</h2>

        <label className={classes.labelEdit}>
          Username
          <input
            className={errors.username && classes.errorInput}
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username needs to be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must not exceed 20 characters",
              },
            })}
            placeholder="Username"
          />
        </label>

        {errors.username && (
          <span className={classes.errorEdit}>{errors.username?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.labelEdit}>
          Email address
          <input
            className={errors.email && classes.errorInput}
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email",
              },
            })}
            placeholder="Email address"
          />
        </label>

        {errors.email && (
          <span className={classes.errorEdit}>{errors.email?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.labelEdit}>
          New password
          <input
            className={errors.password && classes.errorInput}
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password needs to be at least 6 characters",
              },
              maxLength: {
                value: 40,
                message: "Password must not exceed 40 characters",
              },
            })}
            placeholder="New password"
          />
        </label>

        {errors.password && (
          <span className={classes.errorEdit}>{errors.password?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.labelEdit}>
          Avatar image (url)
          <input
            className={errors.avatar && classes.errorInput}
            type="text"
            {...register("avatar", {
              required: "Avatar image is required",
              pattern: {
                value: /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi,
                message: "Invalid url",
              },
            })}
            placeholder="Avatar image"
          />
        </label>

        {errors.avatar && (
          <span className={classes.errorEdit}>{errors.avatar?.message || "Errors, please reconnect page"}</span>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
