import { Amplify, Auth, Hub } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import Render from "./render";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import { getSub } from "../services/TokenService";
import Cropper from "react-easy-crop";
import CropDialogue from "../components/CropDialogue";

const Create = (props) => {
  const [image, setImage] = useState(null);
  const [webData, setWebData] = useState(null)
  const [fileUploaderName, setFileUploaderName] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(props.url);
  const [croppedImgPath, setCroppedImgPath] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [shape, setShape] = useState("rect");
  const [coverPicCrop, setCoverPicCrop] = useState(null);
  const [profilePicCrop, setProfilePicCrop] = useState(null);

  const setSize = async (event) => {};

  const setFields = async(event) =>{
    if(!webData){
      const obj ={}
      obj[event.target.name]=event.target.value;
      setWebData(obj);
    }else{
      webData[event.target.name]=event.target.value;
    }
  }

  const uploadCoverToServer = async (event) => {
    const coverPath = (await getSub()) + "/" + "cover.jpg";
    const profilePath = (await getSub()) + "/" + "profile.jpg";

    await Storage.put(coverPath, coverPicCrop, {
      contentType: "image/png",
    });

    await Storage.put(profilePath, profilePicCrop, {
      contentType: "image/png",
    });
  };

  const setCroppedUrls = async (name, url) => {
    if (name == "coverPic") {
      setCoverPicCrop(url);
    } else {
      setProfilePicCrop(url);
    }
  };

  const setAspectAndShape = async (name) => {
    if (name == "coverPic") {
      setAspectRatio(16 / 9);
      setShape("rect");
    } else {
      setAspectRatio(1);
      setShape("round");
    }
  };

  const uploadCoverToClient = (event) => {
    setFileUploaderName(event.target.name);

    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const img = new Image();

      img.onload = function () {
        // alert(this.width + "x" + this.height);
        if (
          event.target.name == "coverPic" &&
          (this.width < 820 || this.height < 312)
        ) {
          alert("Cover pic should be atleast 820 by 312 pixels.");
          event.target.value = null;
        } else if (
          event.target.name == "profilePic" &&
          (this.width < 170 || this.height < 170)
        ) {
          alert("Profile pic should be atleast 170 by 170 pixels.");
          event.target.value = null;
        } else {
          setAspectAndShape(event.target.name);
          setImage(i);
          setCreateObjectURL(URL.createObjectURL(i));
        }
      };

      if (i) {
        console.log("create file");
        var fr = new FileReader();
        fr.onload = function () {
          console.log("inside file onload");
          img.src = fr.result;
        };
        fr.readAsDataURL(i);
      }
    }
  };

  return (
    <div>
      {createObjectURL && (
        <CropDialogue
          setCroppedImgPath={setCroppedImgPath}
          imageUrl={createObjectURL}
          setImageUrl={setCreateObjectURL}
          fileUploaderName={fileUploaderName}
          setCroppedUrls={setCroppedUrls}
          aspectRatio={aspectRatio}
          shape={shape}
        />
      )}

      <div align="center">
        {/* <img src={profilePicCrop} /> */}
        <h4>Fill up the details for your web page</h4>
        <div>
          <label className="me-2" for="file">
            {" "}
           Choose a file for cover picture{" "}
          </label>
          <input type="file" name="coverPic" onChange={uploadCoverToClient} />
        </div>
        <br />
        <div>
          <label className="me-2" for="file">
            {" "}
          Choose a file for profile picture{" "}
          </label>
          <input type="file" name="profilePic" onChange={uploadCoverToClient} />
        </div>
        <br />
        <br />
        <label for="abtMe">
          {" "}
          Write a few lines about yourself (upto 700 characters){" "}
        </label>
        <br />
        <textarea name="abtMe" onChange={event => setFields(event)} cols="90" rows="9" maxLength={700}></textarea>
        <br />
        <label for="otherDet">
          {" "}
          Write any other details you want people to know (upto 700 characters){" "}
        </label>
        <br />
        <textarea
          name="otherDet"
          onChange={event => setFields(event)}
          cols="90"
          rows="9"
          maxLength={700}
        ></textarea>
        <br />
        <label for="fbLink"> Set facebook profile link </label>
        <br />
        <input type="text" name="fbLink" onChange={event => setFields(event)}></input>
        <br/>
        <br />
        <label for="instaLink"> Set instagram profile link </label>
        <br />
        <input type="text" name="instaLink" onChange={event => setFields(event)}></input>
        <br/>
        <br />
        <label for="youtubeLink"> Set youtube profile link </label>
        <br />
        <input type="text" name="youtubeLink" onChange={event => setFields(event)}></input>
        <br/>
        <br />
        <label for="linkedinLink"> Set linkedin profile link </label>
        <br />
        <input type="text" name="linkedinLink" onChange={event => setFields(event)}></input>
        <br/>
        <br />
        <label for="twitterLink"> Set twitter profile link </label>
        <br />
        <input type="text" name="twitterLink" onChange={event => setFields(event)}></input>
        <br/>
        <br/>
        <label for="youtubeLink1"> Set upto 4 of your youtube video links </label>
        <br />
        <input type="text" name="youtubeLink1" onChange={event => setFields(event)}></input>
        <br />
        <br/>
        <input type="text" name="youtubeLink2" onChange={event => setFields(event)}></input>
        <br />
        <br/>
        <input type="text" name="youtubeLink3" onChange={event => setFields(event)}></input>
        <br />
        <br/>
        <input type="text" name="youtubeLink4" onChange={event => setFields(event)}></input>
        <br />
        <br/>
        <label for="webSiteName"> Your website name www.contenhub. </label>
        <input type="text" name="webSiteName" onChange={event => setFields(event)}></input>.com
        <br/>
        <br/>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadCoverToServer}
        >
          Generate Web Page
        </button>
      </div>
    </div>
  );
};

export default Create;
