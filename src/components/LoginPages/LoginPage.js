import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function LoginPage({ handleSignIn, handleRegister }) {
  const [isNewUser, setNewUser] = useState(false);

  const handleChangeLoginPage = () => {
    setNewUser((cur) => !cur);
  };

  return (
    <>
      {isNewUser ? (
        <SignUp
          handleRegister={handleRegister}
          handleChangeLoginPage={handleChangeLoginPage}
        />
      ) : (
        <SignIn
          handleSignIn={handleSignIn}
          handleChangeLoginPage={handleChangeLoginPage}
        />
      )}
    </>
  );
}
