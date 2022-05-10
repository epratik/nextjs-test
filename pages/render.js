import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";
import { LinkPreviewService } from "../services/LinkPreviewService";

export async function getServerSideProps() {
  // console.log('calling***********')
  const previewService = await new LinkPreviewService();
  const val = await previewService.getMetaData("https://www.youtube.com/watch?v=_6M4rX-PYzs")
  console.log(val);
  
  return {
    props: {
      coverImgUrl: "",
      profileImgUrl: "",
      aboutMe: "",
      box1Urls: ["https://www.youtube.com/watch?v=_6M4rX-PYzs", "https://www.youtube.com/watch?v=_xVi4j5A-go"
      ,"https://www.youtube.com/watch?v=j9VOQZX5btA"],
      box2Urls: [],
      otherDetails: "",
      linkedIn: "",
      youTube: "",
      instagram: "",
      twitter: "",
      facebook: "",
    },
  };
}

const Render = (props) => {
  return (
    <div className="container col-sm-6">
      <div className="row">
        <div className="">
          <div className="card">
            <img
              src="http://www.goodmorningimagesdownload.com/wp-content/uploads/2021/07/1080p-New-Cool-Whatsapp-Dp-Profile-Images-pictures-hd-1-300x300.jpg"
              className="rounded-circle"
              style={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "200px",
                height: "200px",
              }}
            ></img>
            <img
              style={{ height: "23vw", width: "100%" }}
              src="https://i.pinimg.com/originals/30/5c/5a/305c5a457807ba421ed67495c93198d3.jpg"
            ></img>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex">
        <h4>Pratik Pednekar</h4>
      </div>
      <div className="d-flex">
        <img
          className=""
          src="/instagram.png"
          style={{ height: "50px", width: "50px" }}
        ></img>

        <img
          className="ms-1"
          src="/linkedin.png"
          style={{ height: "50px", width: "50px" }}
        ></img>
        <img
          className="ms-1"
          src="/facebook.png"
          style={{ height: "50px", width: "50px" }}
        ></img>
        <img
          className="ms-1"
          src="/twitter.png"
          style={{ height: "50px", width: "50px" }}
        ></img>
        <img
          className="ms-1 rounded"
          src="/youtube.png"
          style={{ height: "50px", width: "50px" }}
        ></img>
      </div>
      <br />
      <div className="d-flex">
        <div className="card ">
          <div className="card-body">
            <h5 className="card-title">About Me</h5>
            My background is from mechanical and renewable energy engineering
            since I did my masters college degree in that. But my passion lies
            in the fields of Economics and Political Science in which I studied
            for a second bachelors degree. And yes, I also really really love
            travelling. No promotion for products and services which can have
            significantly adverse impact on human health, ecology or social well
            being in society such as alcohol, tobacco, gambling etc. A lot of
            people write to me about their personal problems or complaints.
            Please realise that I cannot respond and provide help for every
            personal problem, I suggest reaching out to a therapist for that.
            For complaints, report them to suitable authorities.
          </div>
        </div>
      </div>
      <br/>
      <div className="d-flex">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        <div className="card ms-1">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        <div className="card  ms-1">
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex">
        <div className="card ">
          <div className="card-body">
            <h5 className="card-title">Contact Us</h5>
            My background is from mechanical and renewable energy engineering
            since I did my masters college degree in that. But my passion lies
            in the fields of Economics and Political Science in which I studied
            for a second bachelors degree. And yes, I also really really love
            travelling. No promotion for products and services which can have
            significantly adverse impact on human health, ecology or social well
            being in society such as alcohol, tobacco, gambling etc. A lot of
            people write to me about their personal problems or complaints.
            Please realise that I cannot respond and provide help for every
            personal problem, I suggest reaching out to a therapist for that.
            For complaints, report them to suitable authorities.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Render;
