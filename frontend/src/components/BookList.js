import React from "react";
import BookItem from "./BookItem";
import PropTypes from "prop-types";

function BookList({ books, onDelete, onArchive }) {
  return (
    <div className="books-list">
      {books.map((book) => (
        <BookItem id={book.id} key={book.id} {...book} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
};

export default BookList;
