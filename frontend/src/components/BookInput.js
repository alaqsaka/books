import React, { Component } from "react";

import { addBook, getBook, updateBook } from "../utils/network-data2";
import TextArea from "./TextArea";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "./TextField";
import { formatDate } from "../utils";

const BookInputWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onUpdateBookHandler = async ({
    isbn,
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website,
    id,
  }) => {
    const { error } = await updateBook({
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website,
      id,
    });

    if (error) {
      alert(error);
    } else {
      navigate("/");
    }
  };

  const onAddBookHandler = async ({
    isbn,
    title,
    subtitle,
    author,
    published,
    publisher,
    pages,
    description,
    website,
  }) => {
    const { error } = await addBook({
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description,
      website,
    });

    if (error) {
      alert(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <BookInput
        addBook={onAddBookHandler}
        id={id}
        updateBook={onUpdateBookHandler}
      />
    </div>
  );
};

class BookInput extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;

    this.state = {
      title: "",
      body: "",
      isbn: "",
      subtitle: "",
      author: "",
      published: "",
      publisher: "",
      pages: "",
      description: "",
      website: "",
    };

    this.onIsbnChangeEventHandler = this.onIsbnChangeEventHandler.bind(this);
    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onSubtitleChangeEventHandler =
      this.onSubtitleChangeEventHandler.bind(this);
    this.onAuthorChangeEventHandler =
      this.onAuthorChangeEventHandler.bind(this);
    this.onPublishedChangeEventHandler =
      this.onPublishedChangeEventHandler.bind(this);
    this.onPublisherChangeEventHandler =
      this.onPublisherChangeEventHandler.bind(this);
    this.onPagesChangeEventHandler = this.onPagesChangeEventHandler.bind(this);
    this.onDescriptionChangeEventHandler =
      this.onDescriptionChangeEventHandler.bind(this);
    this.onWebsiteChangeEventHandler =
      this.onWebsiteChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  async componentDidMount() {
    if (this.props.id) {
      const data = await getBook(this.props.id);

      this.setState(() => {
        return {
          isbn: data.data.isbn,
          title: data.data.title,
          subtitle: data.data.subtitle,
          author: data.data.author,
          published: formatDate(data.data.published),
          publisher: data.data.publisher,
          pages: data.data.pages,
          website: data.data.website,
          description: data.data.description,
        };
      });
    }
  }

  onIsbnChangeEventHandler(event) {
    this.setState(() => {
      return {
        isbn: event.target.value,
      };
    });
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onSubtitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        subtitle: event.target.value,
      };
    });
  }

  onAuthorChangeEventHandler(event) {
    this.setState(() => {
      return {
        author: event.target.value,
      };
    });
  }

  onPublishedChangeEventHandler(event) {
    this.setState(() => {
      return {
        published: event.target.value,
      };
    });
  }

  onPublisherChangeEventHandler(event) {
    this.setState(() => {
      return {
        publisher: event.target.value,
      };
    });
  }

  onPagesChangeEventHandler(event) {
    this.setState(() => {
      return {
        pages: event.target.value,
      };
    });
  }

  onDescriptionChangeEventHandler(event) {
    this.setState(() => {
      return {
        description: event.target.value,
      };
    });
  }

  onWebsiteChangeEventHandler(event) {
    this.setState(() => {
      return {
        website: event.target.value,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    const title = this.state.title;

    const isbn = this.state.isbn;
    const subtitle = this.state.subtitle;
    const author = this.state.author;
    const published = this.state.published;
    const publisher = this.state.publisher;
    const pages = this.state.pages;
    const description = this.state.description;
    const website = this.state.website;
    const id = this.props.id;

    if (this.props.id) {
      this.props.updateBook({
        title,
        isbn,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website,
        id,
      });
    } else {
      this.props.addBook({
        title,
        isbn,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website,
      });
    }
  }

  render() {
    return (
      <div className="book-input">
        <div className="book-input__body">
          <h3>{this.id ? "Update buku" : "Buat buku"}</h3>

          <form onSubmit={this.onSubmitEventHandler}>
            <TextField
              type="number"
              placeholder="ISBN Buku"
              value={this.state.isbn}
              required
              onChange={this.onIsbnChangeEventHandler}
            />
            <TextField
              type="text"
              placeholder="Ini adalah judul"
              value={this.state.title}
              required
              onChange={this.onTitleChangeEventHandler}
            />
            <TextField
              type="text"
              placeholder="Subtitle Buku"
              value={this.state.subtitle}
              required
              onChange={this.onSubtitleChangeEventHandler}
            />
            <TextField
              type="text"
              placeholder="Author (penulis) Buku"
              value={this.state.author}
              required
              onChange={this.onAuthorChangeEventHandler}
            />
            <TextField
              type="date"
              placeholder="Published"
              value={this.state.published}
              required
              onChange={this.onPublishedChangeEventHandler}
            />
            <TextField
              type="text"
              placeholder="Publisher"
              value={this.state.publisher}
              required
              onChange={this.onPublisherChangeEventHandler}
            />
            <TextField
              type="number"
              placeholder="Pages"
              value={this.state.pages}
              required
              onChange={this.onPagesChangeEventHandler}
            />

            <TextArea
              placeholder="Tuliskan deskripsi disini"
              value={this.state.description}
              required
              onChange={this.onDescriptionChangeEventHandler}
            />
            <TextField
              type="text"
              placeholder="Website"
              value={this.state.website}
              required
              onChange={this.onWebsiteChangeEventHandler}
            />
            <button type="submit">
              {this.id ? "Update Buku" : "Buat Buku Baru"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

BookInput.propTypes = {
  addbook: PropTypes.func.isRequired,
};

export default BookInputWrapper;
