'use client'

import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "@/state_management/slices/authSlice";
import Link from "next/link";
// import { isAuth } from "@/app/utils/auth_helpers";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  const welcome = user ? `Welcome ${user.first_name}!` : 'Welcome!';
  // const tokenAbbr = `${token.slice(0, 9)}...`;

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      {/*<p>Token: {tokenAbbr}</p>*/}
      <p><Link href='/users'>Go to Users list</Link></p>
    </section>
  );

  return content;
}

export default Welcome;
