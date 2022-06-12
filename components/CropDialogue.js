import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const CropDialogue = (props) => {
  const [crop, setCrop] = useState({ x: 100, y: 100 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  function getRadianAngle(degreeValue) {
      return (degreeValue * Math.PI) / 180;
    }

  const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        resolve(file);
      }, "image/jpeg");
    });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const setCroppedUrl = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        props.imageUrl,
        croppedAreaPixels
      );

      props.setImageUrl(null)
      props.setCroppedImgPath(croppedImage);
      console.log(croppedImage)
      props.setCroppedUrls(props.fileUploaderName, croppedImage)
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <div>
      {/* {props.imageUrl && ( */}
      <div>
        <div className="crop-container">
          <Cropper
            image={props.imageUrl}
            crop={crop}
            aspect={props.aspectRatio}
            cropShape={props.shape}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="controls">
          <div className="button-area">
            <button onClick={setCroppedUrl}>Crop</button>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default CropDialogue;
