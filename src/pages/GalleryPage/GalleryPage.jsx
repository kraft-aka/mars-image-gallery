import React from "react";
import { Link } from "react-router-dom";
import fetchImages from "../../api/fetchImages";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import styles from "./GalleryPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GalleryPage = () => {
  const imagesQuery = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

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
      <Navbar />
      <div className={styles["gallery-container"]}>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1100: 4 }}
        >
          <Masonry columnsCount={4} gutter="2rem">
            {imagesQuery.data?.photos.map((image) => (
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
