import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";
import fetchImages from "../../api/fetchImages";
import styles from "./ImagePage.module.css";

const ImagePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageQuery = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  if (imageQuery.isLoading)
    return (
      <Circles
        height="80"
        width="80"
        color="#818589"
        ariaLabel="circles-loading"
        wrapperStyle={{ position: "relative", top: "48vh", left: "48vw" }}
        visible={true}
      />
    );
  if (imageQuery.isError) return <h1>Error occured</h1>;

  const imageData = imageQuery?.data?.photos.find((el) => el.id == id);

  const imgSrc = imageData?.img_src;

  console.log(imageData);
  //console.log(id)

  const downloadImage = async (src, id, forceDownload = false) => {
    if (!forceDownload) {
      const link = document.createElement("a");
      link.href = src;
      link.download = "image" + "/" + id;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    const imageBlob = await fetch(imgSrc, { mode: "no-cors" })
      .then((response) => response.arrayBuffer())
      .then((buffer) => new Blob([buffer], { type: "image/png" }))
      .catch((err) => console.err("Error:", err));

    const link = document.createElement("a");
    link.href = URL.createObjectURL(imageBlob);
    link.download = "image" + "/" + id;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //TODO: -> FIX THIS DOWNLOADIMAGE FUNCTION

  return (
    <main className={styles["image-container"]}>
      <section className={styles["image-section"]}>
        <img src={imgSrc} alt="Image of Mars" className={styles["image"]} />
      </section>
      <section className={styles["description-section"]}>
        <header className={styles["description-header"]}>
          <h1 className={styles["rover-title"]}>
            {imageData?.camera?.full_name}
          </h1>
        </header>
        <ul className={styles["description-data"]}>
          <li className="description-data--item">
            {" "}
            name: <span>{imageData?.rover?.name}</span>{" "}
          </li>
          <li className="description-data--item">
            {" "}
            image taken date: <span>{imageData?.earth_date}</span>{" "}
          </li>
          <li className="description-data--item">
            {" "}
            landing date: <span>{imageData?.rover?.landing_date}</span>{" "}
          </li>
          <li className="description-data--item">
            {" "}
            launche date: <span>{imageData?.rover?.launch_date}</span>{" "}
          </li>
          <li className="description-data--item">
            {" "}
            number of photos: <span>{imageData?.rover?.total_photos}</span>{" "}
          </li>
          <li className="description-data--item">{imageData?.rover?.status}</li>
        </ul>
        <div className={styles["image-cta"]}>
          <button
            onClick={() => downloadImage(imgSrc, imageData?.id)}
            className={styles["image-btn"]}
          >
            Save
          </button>
          <button onClick={() => navigate(-1)} className={styles["image-btn"]}>
            Back
          </button>
        </div>
      </section>
    </main>
  );
};

export default ImagePage;
