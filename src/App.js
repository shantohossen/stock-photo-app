import React, { useState, useEffect } from "react";
import Photo from "./Photo";
import ImageModal from "./Imagemodal";
import { FaSearch } from "react-icons/fa";

function App() {
  const clientId = `?client_id=${process.env.REACT_APP_SECRET_KEY}`;
  const mainUrl = "https://api.unsplash.com/photos/";
  const searchUrl = "https://api.unsplash.com/search/photos/";
  // Hoocks
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);

  // Featch Data Functions
  const featchData = async () => {
    setLoading(true);
    const nextPageUrl = `&page=${page}`;
    const queryUrl = `&query=${query}`;
    let url;

    if (query) {
      url = `${searchUrl}${clientId}${nextPageUrl}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientId}${nextPageUrl}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setData((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    featchData();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener(
      "scroll",
      () => {
        let innerHeight = window.innerHeight;
        let scrollY = window.scrollY;
        let PageHeight = document.body.scrollHeight;
        if (!loading && innerHeight + scrollY >= PageHeight - 2) {
          featchData();
          setPage((prev) => {
            return prev + 1;
          });
        }
      },
      []
    );

    return () => window.removeEventListener("scroll", event);
  }, []);

  const openImage = (id) => {
    const imageWithId = data.find((img) => {
      return img.id === id;
    });
    setImage(imageWithId);
    setImageModal(true);
    console.log(imageWithId);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const closeModal = () => {
    setImage(null);
    setImageModal(false);
    console.log("hello");
  };

  const changeImage = (val) => {
    console.log(val);
  };

  return (
    <main>
      {imageModal ? (
        <ImageModal
          {...image}
          changeImage={changeImage}
          closeModal={closeModal}
        />
      ) : null}

      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search Your Photo"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn" onClick={handelSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {data.map((image, index) => {
            return (
              <Photo
                openImage={openImage}
                key={`${image.id}${index}`}
                {...image}
              />
            );
          })}
        </div>
        {loading ? <h4 className="loading">Loading...</h4> : null}
      </section>
    </main>
  );
}

export default App;
