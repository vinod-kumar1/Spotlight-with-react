import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { BrowserRouter, Route, Routes, Link } from "react-router";
// import links from "./navlinks";
import navlinks from "./navlinks";

export default function App() {
  let [state, setState] = useState(false);
  let [links, setLinks] = useState([...navlinks]);
  let inputs = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      function handler(e) {
        if (e.key == "k") {
          setState(true);
          console.log("object");
          document.addEventListener("click", (e) => {
            console.log(e.target.parentNode);
            if (
              !["popup-container", "popup"].includes(
                e.target.parentNode?.className
              )
            ) {
              setState(false);
              setLinks(navlinks);
            }
          });
        }
        document.removeEventListener("keydown", handler);
      }

      if (e.key == "Meta" || e.key == "Ctrl") {
        document.addEventListener("keydown", handler);
      }
    });
  }, [state]);

  function About() {
    return <h2 key="about">About</h2>;
  }

  function Home() {
    return <h2 key="home">Home</h2>;
  }

  function Blog() {
    return <h2 key="blog">Blog</h2>;
  }

  useEffect(() => {
    if (state == true) inputs.current.focus();
  }, [state]);

  function searchRoute(e) {
    setLinks((p) => {
      let res = [...navlinks];
      res = res.filter((link) =>
        link.name.toLowerCase().includes(e.target.value)
      );
      if (res.length == 0) res.push({ name: "No Results found", link: "/" });
      return res;
    });
  }

  function ListRoutes() {
    return (
      <div className="routes">
        {links.map((link) => {
          return (
            <>
              <Link style={{ color: "white" }} key={link.name} to={link.link}>
                {link.name}
              </Link>
              <hr />
            </>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="container" style={{ filter: `blur(${state ? 5 : 0}px)` }}>
        <h1>Command Palette</h1>
        <p>Read the description to start solving the problem. 💯</p>
        <p className="desc">
          <span>CMD + k / Ctrl + k</span> should open a Search Modal to navigate
          through website pages.
        </p>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
        </Routes>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          minWidth: "40%",
          width: "60%",
          minHeight: "40%",
        }}
        className="popup-container"
      >
        {state && (
          <div className="popup">
            <input
              ref={inputs}
              type="text"
              placeholder="Search for the route here..."
              onChange={searchRoute}
            />
            <hr />
            <ListRoutes />
          </div>
        )}{" "}
      </div>
    </>
  );
}
