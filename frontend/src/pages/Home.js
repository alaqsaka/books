import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useSearchParams } from "react-router-dom";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { getBooks } from "../utils/network-data2";

const Home = () => {
  const [books, setBooks] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }
  const filteredBooks = books?.data?.data.filter((books) => {
    return books.title.toLowerCase().includes(keyword.toLowerCase());
  });

  useEffect(() => {
    setLoading(true);
    getBooks(currentPage).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, [currentPage]);

  const pageSize = 15;
  const countBooks = books?.data?.total;

  const numOfPages = Math.ceil(countBooks / pageSize);

  const pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  return (
    <div>
      <Link
        className="button__base"
        to={"/tambah-buku"}
        style={{
          width: "200px",
          textDecoration: "none",
          marginBottom: "20px",
        }}
      >
        <AiOutlinePlus /> Tambah buku
      </Link>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>Daftar Bukumu</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {books?.data?.data.length > 0 ? (
            <BookList books={filteredBooks} />
          ) : (
            <p className="books-list__empty-message">Buku tidak tersedia</p>
          )}
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        {pages.map((page) => (
          <div
            className={`pagination ${
              currentPage === page && "pagination__selected"
            }`}
            key={page}
            style={{
              margin: "5px",
              cursor: "pointer",
              padding: "10px",
            }}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
