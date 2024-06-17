import React from "react";
import fetchImages from "../../api/fetchImages";
import { useQuery } from "@tanstack/react-query";

const GalleryPage = () => {
  const imagesQuery = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    
  });

  if (imagesQuery.isLoading) return <h2>Loading...</h2>;

  if (imagesQuery.isError) return <h2>Error occured</h2>;

  //console.log(imagesQuery.data?.photos);
  return (
    <div>
      {imagesQuery.data?.photos.map((image) => (
        <img key={image.id} src={image?.img_src} />
      ))}
    </div>
  );
};

export default GalleryPage;
