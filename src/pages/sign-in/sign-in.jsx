import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authUser } from "../../redux/slices/user";
import classes from "../sign-up/sign-up.module.scss";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, error } = useSelector((state) => state.saveUser);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      navigate("/", { replace: true });
    }

    if (error) {
      setError("password", {
        type: "server",
        message: "Email or password is invalid",
      });
    }
  }, [token, error]);

  const onSubmit = async (date) => {
    const { email, password } = date;

    if (date) {
      dispatch(authUser({ user: { email, password } }));
      reset();
    }
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.wr} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={classes.title}>Sign In</h2>

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

        <button type="submit">Login</button>

        <p className={classes.textParagraph}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
