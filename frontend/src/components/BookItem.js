import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";

const BookItem = ({
  id,
  title,
  subtitle,
  isbn,
  published,
  publisher,
  pages,
  description,
  website,
  author,
}) => {
  return (
    <div className="book-item">
      <div className="book-item__content">
        <Link to={`/books/${id}`}>
          {" "}
          <h3 className="book-item__title">{title}</h3>
        </Link>
        <h4 className="book-item__subtitle">{subtitle}</h4>
        <h4 className="book-item__subtitle">{author}</h4>

        <p className="book-item__date">{showFormattedDate(published)}</p>

        <p className="book-item__body">{description}</p>
        <p className="book-item__body">ISBN: {isbn}</p>
        <p className="book-item__body">Pages: {pages}</p>
        <p className="book-item__body">Published by: {publisher}</p>

        <p className="book-item__body">
          <a href={website}>{website}</a>
        </p>
      </div>
    </div>
  );
};

export default BookItem;
