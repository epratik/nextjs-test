import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";

export async function getServerSideProps() {
  return {
    props: {
      coverImgUrl: "",
      profileImgUrl: "",
      aboutMe: "",
      box1Urls: [],
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

const Render = () => {
  return (
    <div className="container col-sm-6">
      <div class="row">
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
          <div class="card-body">
            <h5 class="card-title">About Me</h5>
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
