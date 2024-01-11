"use client";
import React from "react";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { actions } from "../store/auth/auth-slice";

const About = () => {
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  function handleButton() {
    dispatch(actions.logIn());
  }

  return (
    <div className="flex flex-col">
      <h1>Quem somos</h1>

      <h2>{JSON.stringify(authData)}</h2>
      <button onClick={handleButton}>login</button>
    </div>
  );
};

export default About;
