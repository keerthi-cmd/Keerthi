import React from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import style from "./styles/modules/app.module.scss";
import { Toaster } from "react-hot-toast";
import logo from "./assets/logo.jpg";

function App() {
  return (
    <>
      <div className="container">
        <nav className={style.app__bg}>
          <img src={logo} alt="Todo" />
          <PageTitle>MY TODO APP</PageTitle>
        </nav>
        <div className={style.app__wrapper}>
          <AppHeader />
        </div>
        <div className={style.app__content_bgimg}></div>
        <AppContent />
      </div>
      <footer className={style.footer}>Developed by Keerthi Appasani</footer>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      ></Toaster>
    </>
  );
}

export default App;
