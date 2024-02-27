"use client";

import { useAppSelector } from "../store";

const SignOutPage = () => {
  const authData = useAppSelector((state) => state.auth);

  return (
    <main className="flex justify-center pt-24 gap-2">
      <h1>SignOut Page</h1>
      {authData?.roleId === 3 ? <span>Role: advogado</span> : null}
    </main>
  );
};

export default SignOutPage;
