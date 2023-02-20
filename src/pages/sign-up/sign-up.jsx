import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAddNewUserMutation } from "../../redux/get-api";

import classes from "./sign-up.module.scss";

const SignUp = () => {
  const navigate = useNavigate();
  const [addUser, { error, data }] = useAddNewUserMutation();
  const {
    register,
    setError,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (error?.data?.errors?.email) {
      setError("email", {
        type: "server",
        message: "Email is already taken.",
      });
    }

    if (error?.data?.errors?.username) {
      setError("username", {
        type: "server",
        message: "Username is already taken.",
      });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      navigate("/sign-in", { replace: true });
    }
  }, [data]);

  const onSubmit = async (date) => {
    const { username, email, password } = date;

    if (date) {
      await addUser({ user: { username, email, password } }).unwrap();
      reset();
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.wr} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.title}>Create new account</h2>

        <label className={classes.label}>
          Username
          <input
            className={errors.username && classes.inputError}
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
          <span className={classes.error}>{errors.username?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.label}>
          Email address
          <input
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
          <span className={classes.error}>{errors.email?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.label}>
          Password
          <input
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
            placeholder="Password"
          />
        </label>

        {errors.password && (
          <span className={classes.error}>{errors.password?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.label}>
          Repeat Password
          <input
            type="password"
            {...register("repeatPassword", {
              required: "Confirm password is required",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords should match!";
                },
              },
            })}
            placeholder="Password"
          />
        </label>

        {errors.repeatPassword && (
          <span className={classes.error}>{errors.repeatPassword?.message || "Errors, please reconnect page"}</span>
        )}

        <label className={classes.lastLabel}>
          <input
            {...register("agreement", {
              required: "You must agree to the terms",
            })}
            type="checkbox"
          />
          <span className={classes.checkText}>I agree to the processing of my personal information</span>
        </label>

        {errors.agreement && <div className={classes.error}>{errors.agreement.message}</div>}

        <button type="submit">Create</button>

        <p className={classes.textParagraph}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
