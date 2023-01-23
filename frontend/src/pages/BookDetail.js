import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line, RiEdit2Fill } from "react-icons/ri";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import { deleteBook, getBook } from "../utils/network-data2";

const BookDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getBook(id).then((data) => {
      setData(data.data);
      console.log("dataa ", data);
      setLoading(false);
    });
  }, [id]);

  async function onDeleteBookHandler(id) {
    await deleteBook(id);

    navigate("/");
  }

  if (data?.error) {
    return <p>Data tidak tersedia</p>;
  }

  if (loading === true) {
    return (
      <div className="detail-page">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {data?.message ? (
        <p>{data?.message}</p>
      ) : (
        <>
          <h1 className="detail-page__title">{data?.title}</h1>
          <h2 className="">{data?.subtitle}</h2>

          <p className="detail-page__body">{data?.author}</p>
          <p className="detail-page__body">{data?.description}</p>
          <p className="detail-page__detail">
            Published {showFormattedDate(data?.published)} by {data?.publisher}
          </p>
          <p className="detail-page__detail">{data?.pages} pages</p>
          <p className="detail-page__detail">ISBN {data?.isbn}</p>
          <a
            href={data?.website}
            target="_blank"
            rel="noreferrer"
            className="detail-page__detail"
            style={{ wordWrap: "break-word" }}
          >
            {data?.website}
          </a>
          <div className="detail-page__action">
            <div className="action" onClick={() => onDeleteBookHandler(id)}>
              <RiDeleteBin2Line />
            </div>
            <Link to={`/books/${data?.id}/edit`}>
              <div className="action">
                <RiEdit2Fill />
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default BookDetail;
