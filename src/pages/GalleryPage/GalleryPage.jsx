import React from "react";
import { Link } from "react-router-dom";
import fetchImages from "../../api/fetchImages";
import { useQuery } from "@tanstack/react-query";
import styles from "./GalleryPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const GalleryPage = () => {
  const imagesQuery = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  if (imagesQuery.isLoading) return <h2>Loading...</h2>;

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
              <Link to={`/imagePage/${image.id}`}>
                <img
                  key={image.id}
                  src={image?.img_src}
                  className={styles["gallery-item"]}
                />
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default GalleryPage;
