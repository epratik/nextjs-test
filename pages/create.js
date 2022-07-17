import { Amplify, Auth, Hub } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import Render from "./render";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useCallback } from "react";
import { getIdentityPoolSubId, getSub } from "../services/TokenService";
import Cropper from "react-easy-crop";
import CropDialogue from "../components/CropDialogue";
import { putdata, checkIfSiteAvailable } from "../services/dynamoDbPut";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

const Create = (props) => {
  const [image, setImage] = useState(null);
  const [webData, setWebData] = useState(null);
  const [fileUploaderName, setFileUploaderName] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(props.url);
  const [croppedImgPath, setCroppedImgPath] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [shape, setShape] = useState("rect");
  const [coverPicCrop, setCoverPicCrop] = useState(null);
  const [profilePicCrop, setProfilePicCrop] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [showStatusModal, setStatusModal] = useState(false);
  const [saveSpinner, setSaveSpinner] = useState(false);

  const setSize = async (event) => {};

  const setFields = async (event) => {
    if (!webData) {
      const obj = {};
      obj[event.target.name] = event.target.value;
      setWebData(obj);
    } else {
      webData[event.target.name] = event.target.value;
    }
  };

  const clearState = () => {};

  const uploadCoverToServer = async (event) => {
    setSaveSpinner(true);
    setSaveStatus("");
    if (!(await checkIfSiteAvailable(webData.site_name))) {
      setStatusModal(true);
      setSaveSpinner(false);
      setSaveStatus(
        "This subdomain name is already taken, please provide a different name"
      );
      return;
    }

    const coverPath = (await getIdentityPoolSubId()) + "/" + "cover.jpg";
    const profilePath = (await getIdentityPoolSubId()) + "/" + "profile.jpg";

    await Storage.put(coverPath, coverPicCrop, {
      contentType: "image/png",
    });

    await Storage.put(profilePath, profilePicCrop, {
      contentType: "image/png",
    });

    webData.sub_id = await getIdentityPoolSubId();
    webData.cover_pic =
      "https://nx-dev-demo-s3.s3.us-west-2.amazonaws.com/public/" +
      webData.sub_id +
      "/cover.jpg";
    webData.profile_pic =
      "https://nx-dev-demo-s3.s3.us-west-2.amazonaws.com/public/" +
      webData.sub_id +
      "/profile.jpg";

    console.log(webData);
    await putdata(webData);
    setSaveStatus(
      "Site is generated, please visit " +
        "www." +
        webData.site_name +
        ".contenhub.com"
    );
    setStatusModal(true);
    setSaveSpinner(false);
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
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
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

          <div>
            {/* <img src={profilePicCrop} /> */}

            <h1 className="display-4">Fill up the details for your web page</h1>
            <br />
            <label htmlFor="business_name" className="form-label">
              Your name or business name, this appears below the profile picture
            </label>
            <input
              type="text"
              className="form-control"
              name="business_name"
              onChange={(event) => setFields(event)}
            ></input>
            <br />
            <div>
              <label className="form-label" htmlFor="file">
                {" "}
                Choose a file for cover picture{" "}
              </label>
              <input
                type="file"
                className="form-control"
                name="coverPic"
                onChange={uploadCoverToClient}
              />
            </div>
            <br />
            <div>
              <label className="form-label" htmlFor="file">
                {" "}
                Choose a file for profile picture{" "}
              </label>
              <input
                type="file"
                className="form-control"
                name="profilePic"
                onChange={uploadCoverToClient}
              />
            </div>
            <br />
            <label htmlFor="header_2" className="form-label">
              Header for first text block (ex. About Me)
            </label>
            <input
              type="text"
              className="form-control"
              name="header_2"
              onChange={(event) => setFields(event)}
            ></input>
            <br />
            <label htmlFor="abt_me" className="form-label">
              Describe your self, site or business, this appears after the
              header above (upto 700 characters)
            </label>
            <div className="input-group">
              <textarea
                name="abt_me"
                className="form-control"
                aria-label="With textarea"
                onChange={(event) => setFields(event)}
                cols="90"
                rows="9"
                maxLength={700}
              ></textarea>
            </div>
            <br />
            <label htmlFor="header_3" className="form-label">
              Header for second text block (ex. Other details)
            </label>
            <input
              type="text"
              className="form-control"
              name="header_3"
              onChange={(event) => setFields(event)}
            ></input>
            <br />
            <label htmlFor="other_det" className="form-label">
              Based on the header above, provide description (upto 700
              characters)
            </label>
            <div className="input-group">
              <textarea
                name="other_det"
                className="form-control"
                aria-label="With textarea"
                onChange={(event) => setFields(event)}
                cols="90"
                rows="9"
                maxLength={700}
              ></textarea>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Facebook Profile Link</span>
              <input
                className="form-control"
                name="fb_link"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Linkedin Profile Link</span>
              <input
                className="form-control"
                name="linkedin_link"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Youtube Profile Link</span>
              <input
                className="form-control"
                name="youtube_link"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Twitter Profile Link</span>
              <input
                className="form-control"
                name="youtube_link"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Instagram Profile Link</span>
              <input
                className="form-control"
                name="insta_link"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <label htmlFor="other_det" className="form-label">
              Provide 4 links from your youtube channel, we will add previews of
              these to your page
            </label>
            <div className="input-group">
              <span className="input-group-text">Youtube Link 1</span>
              <input
                className="form-control"
                name="youtube_link1"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Youtube Link 2</span>
              <input
                className="form-control"
                name="youtube_link2"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Youtube Link 3</span>
              <input
                className="form-control"
                name="youtube_link3"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Youtube Link 4</span>
              <input
                className="form-control"
                name="youtube_link4"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Contact Email</span>
              <input
                className="form-control"
                name="contact_email"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Contact Phone</span>
              <input
                className="form-control"
                name="contact_phone"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <div className="input-group">
              <span className="input-group-text">Contact Address</span>
              <input
                className="form-control"
                name="contact_address"
                onChange={(event) => setFields(event)}
              ></input>
            </div>
            <br />
            <label htmlFor="other_det" className="form-label">
              Provide the subdomain for your website. Remember this subdomain
              value, you will need to provide the same value everytime you
              modify this site.
            </label>
            <div className="input-group">
              <span className="input-group-text">www.</span>
              <input
                className="form-control"
                name="site_name"
                onChange={(event) => setFields(event)}
              ></input>
              <span className="input-group-text">.contenhub.com</span>
            </div>
            <br />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={uploadCoverToServer}
            >
              {saveSpinner && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              )}
              Generate Web Page
            </button>
          </div>
        </div>
      </div>
      <Modal
        centered
        size="sm"
        backdrop="true"
        show={showStatusModal}
        onExit={() => setStatusModal(false)}
        onHide={clearState}
      >
        <ModalBody>{saveStatus}</ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setStatusModal(false);
            }}
            className="btn-sm btn-primary"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Create;
