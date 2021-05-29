import React from "react";
export default function Photo({
  urls: { regular, full },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
  openImage,
  id,
}) {
  return (
    <article className="photo" onClick={() => openImage(id)}>
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt="" className="user-img" />
        </a>
      </div>
    </article>
  );
}
