'use client';
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";
import { actions } from "../store/auth/auth-slice";

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const loadState = (): any | undefined => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
    return undefined;
  }
};

const About = () => {
  const authData = useAppSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const persistedState = loadState();
    if (persistedState) {
    }
  }, [dispatch]);

  function handleButton() {
    const userData = {
      name: "Rogerio Sergio",
      email: "rogerio@sergio.com",
      token: "1234567890",
    };


    saveState(userData);
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
