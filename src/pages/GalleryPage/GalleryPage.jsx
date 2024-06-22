import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import styles from "./GalleryPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

async function fetchImagesPerPage(page, apiKey) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${page}&api_key=${apiKey}`;
  const response = await axios.get(url);
  return response.data.photos;
}

const GalleryPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [page, setPage] = useState(1);

  const imagesQuery = useQuery({
    queryKey: ["images", page],
    queryFn: () => fetchImagesPerPage(page, apiKey),
    keepPreviousData: true,
  });

  console.log(imagesQuery.data);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  if (imagesQuery.isLoading)
    return (
      <Circles
        height="80"
        width="80"
        color="#818589"
        ariaLabel="circles-loading"
        wrapperStyle={{ position: "relative", top: "48vh", left: "48vw" }}
        wrapperClass=""
        visible={true}
      />
    );

  if (imagesQuery.isError) return <h2>Error occured</h2>;

  //console.log(imagesQuery.data);
  return (
    <>
      <Navbar nextPage={handleNextPage} prevPage={handlePrevPage} />
      <div className={styles["gallery-container"]}>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1100: 4 }}
        >
          <Masonry columnsCount={4} gutter="2rem">
            {imagesQuery.data?.map((image) => (
              <Link to={`/imagePage/${image.id}`} key={image.id}>
                <img src={image?.img_src} className={styles["gallery-item"]} />
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default GalleryPage;
