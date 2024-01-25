'use client';

import { useAppDispatch, useAppSelector } from "@/state_management/hooks";
// import { toggleTheme } from "@/state_management/slices/themeSlice";

export default function About() {
  // const currentTheme = useAppSelector(state => state.theme.currentTheme)
  // const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      {/*<h1 style={{ textAlign: 'center', marginTop: 50 }}>About Page</h1>*/}
      {/*<br />*/}
      {/*<br />*/}
      {/*<br />*/}

      {/*<p>Current theme: {currentTheme}</p>*/}

      {/*<button onClick={() => dispatch(toggleTheme())}>Toggle theme</button>*/}
    </div>
  )
}
