import React from "react";
import fetchImages from "../../api/fetchImages";
import { useQuery } from "@tanstack/react-query";
import styles from "./GalleryPage.module.css";
import Navbar from "../../components/Navbar/Navbar";

const GalleryPage = () => {
  const imagesQuery = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  if (imagesQuery.isLoading) return <h2>Loading...</h2>;

  if (imagesQuery.isError) return <h2>Error occured</h2>;

  //console.log(imagesQuery.data?.photos);
  return (
    <>
      <Navbar />
      <div className={styles["gallery-container"]}>
        {imagesQuery.data?.photos.map((image) => (
          <img key={image.id} src={image?.img_src} />
        ))}
      </div>
    </>
  );
};

export default GalleryPage;
