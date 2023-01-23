import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";

import BookAppHeader from "./components/BookAppHeader";
import { LocaleProvider } from "./contexts/LocaleContext";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getUserLogged, putAccessToken, logout } from "./utils/network-data2";
import Home from "./pages/Home";
import BukuForm from "./pages/BukuForm";
import BookDetail from "./pages/BookDetail";

export default class BookApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      theme: localStorage.getItem("theme") || "light",
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === "light" ? "dark" : "light";

          localStorage.setItem("theme", newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogut = this.onLogut.bind(this);
  }

  async onLoginSuccess(accessToken) {
    putAccessToken(accessToken);

    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  async componentDidMount() {
    document.documentElement.setAttribute("data-theme", this.state.theme);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute("data-theme", this.state.theme);
    }
  }

  onLogut() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });
    logout();
    putAccessToken("");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <div className="app-container">
            <header>
              <h1>
                <Link to={"/"}>Books</Link>
              </h1>
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<Login loginSuccess={this.onLoginSuccess} />}
                />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      );
    }

    return (
      <LocaleProvider value={this.state.localeContext}>
        <div className="app-container ">
          <ThemeProvider value={this.state}>
            <BookAppHeader
              logout={this.onLogut}
              name={this.state?.authedUser?.name}
            />
          </ThemeProvider>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/books/:id/edit" element={<BukuForm />} />
              <Route path="/tambah-buku" element={<BukuForm />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  }
}
