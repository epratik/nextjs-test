import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";
import { LinkPreviewService } from "../services/LinkPreviewService";
import { getSiteData } from "../services/dynamoDbPut";
import contactus from "../public/contactus.jpg";

export async function getServerSideProps({ req }) {
  const subdomain = req.headers.host.split(".")[0];

  const siteData = await getSiteData(subdomain);

  console.log(siteData);
  const previewService = await new LinkPreviewService();
  const pre1 = previewService.getMetaData(siteData.Item.youtube_link1)
  const pre2 = previewService.getMetaData(siteData.Item.youtube_link2)
  const pre3 = previewService.getMetaData(siteData.Item.youtube_link3)
  const pre4 = previewService.getMetaData(siteData.Item.youtube_link4)

  const previews = await Promise.all([pre1,pre2,pre3,pre4])

  siteData.previews = previews;
  // previews.push(await previewService.getMetaData("https://www.youtube.com/watch?v=_6M4rX-PYzs"))
  // previews.push(await previewService.getMetaData("https://www.youtube.com/watch?v=_6M4rX-PYzs"))

  return {
    props: siteData,
  };
}

const Render = (props) => {
  return (
    <div className="container col-sm-6">
      <div className="row">
        <div className="">
          <div className="card">
            <img
              src={props.Item.profile_pic}
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
              src={props.Item.cover_pic}
            ></img>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex">
        <h4>{props.Item.header_1}</h4>
      </div>
      <div className="d-flex">
        <a href={props.Item.instagram_link}>
          <img
            className=""
            src="/instagram.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a href={props.Item.linkedin_link}>
          <img
            className="ms-1"
            src="/linkedin.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a href={props.Item.facebook_link}>
          <img
            className="ms-1"
            src="/facebook.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a href={props.Item.twitter_link}>
          <img
            className="ms-1"
            src="/twitter.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a href={props.Item.youtube_link}>
          <img
            className="ms-1 rounded"
            src="/youtube.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>
      </div>
      <br />
      <div className="d-flex">
        <div className="card ">
          <div className="card-body">
            <h5 className="card-title">{props.Item.header_2}</h5>
            <p class="card-text fst-italic">{props.Item.abt_me}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex">
        <div className="card">
          <img src={props.previews[0].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[0].title}</h5>
            <p className="card-text">{props.previews[0].description}</p>
            <a href={props.previews[0].url} className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="card-group">
        <div className="card">
          <img src={props.previews[1].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[1].title}</h5>
            <p className="card-text">{props.previews[1].description}</p>
            <a href={props.previews[1].url} className="btn btn-primary">
            Watch Now
            </a>
          </div>
        </div>
        <div className="card ms-1">
          <img src={props.previews[2].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[2].title}</h5>
            <p className="card-text">{props.previews[2].description}</p>
            <a href={props.previews[2].url} className="btn btn-primary">
            Watch Now
            </a>
          </div>
        </div>
        <div className="card  ms-1">
          <img src={props.previews[3].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[3].title}</h5>
            <p className="card-text">{props.previews[3].description}</p>
            <a href={props.previews[3].url} className="btn btn-primary">
            Watch Now
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="d-flex">
        <div className="card ">
          <div className="card-body">
            <h5 className="card-title"> {props.Item.header_3}</h5>
            {props.Item.other_det}
          </div>
        </div>
      </div>
      <br />
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="../contactus.jpg"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Contact Us</h5>
              <p class="card-text fst-italic">
                Email: {props.Item.contact_email} <br />
                Phone: {props.Item.contact_phone} <br />
                Address: {props.Item.contact_address} <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card">
        <img src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Colorful-Circle-Simple-Background-Image-1.jpg"/>
        <div className="card-body">
          <h5 className="card-title">Contact Us</h5>
          Email: e_pratik@yahoo.co.in <br />
          Phone: 9538550218 <br />
          Address: xxxxxxxxxxxxxxxxxx <br />
        </div>
      </div> */}
    </div>
  );
};

export default Render;
