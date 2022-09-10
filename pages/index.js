import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";
import { getSiteData } from "../services/dynamoDbPut";
import contactus from "../public/contactus.jpg";
// import landing from "../public/landing.jpg";
// import landing6 from "../public/landing6.jpg";

export async function getServerSideProps({ req }) {
  const subdomain = req.headers.host.split(".")[0];

  const siteData = await getSiteData(subdomain);

  console.log('************************');
  console.log(siteData)
  // const previewService = await new LinkPreviewService();
  // const pre1 = previewService.getMetaData(siteData.Item.previews.youtube_link1)
  // const pre2 = previewService.getMetaData(siteData.Item.previews.youtube_link2)
  // const pre3 = previewService.getMetaData(siteData.Item.previews.youtube_link3)
  // const pre4 = previewService.getMetaData(siteData.Item.previews.youtube_link4)

  // const previews = await Promise.all([pre1,pre2,pre3,pre4])

  // siteData.previews = previews;
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
            <p className="card-text fst-italic">{props.Item.abt_me}</p>
          </div>
        </div>
      </div>
      <br />
      {props.Item.previews && 
      <div className="d-flex">
        <div className="card">
          <img src={props.Item.previews.youtube_link1.image} />
          <div className="card-body">
            <h5 className="card-title">{props.Item.previews.youtube_link1.title}</h5>
            <p className="card-text">{props.Item.previews.youtube_link1.description}</p>
            <a href={props.Item.previews.youtube_link1.url} className="btn btn-primary">
              Watch Now
            </a>
          </div>
        </div>
      </div>}
      <br />
      {props.Item.previews && 
      <div className="card-group">
        <div className="card">
          <img src={props.Item.previews.youtube_link2.image} />
          <div className="card-body">
            <h5 className="card-title">{props.Item.previews.youtube_link2.title}</h5>
            <p className="card-text">{props.Item.previews.youtube_link2.description}</p>
            <a href={props.Item.previews.youtube_link2.url} className="btn btn-primary">
            Watch Now
            </a>
          </div>
        </div>
        <div className="card ms-1">
          <img src={props.Item.previews.youtube_link3.image} />
          <div className="card-body">
            <h5 className="card-title">{props.Item.previews.youtube_link3.title}</h5>
            <p className="card-text">{props.Item.previews.youtube_link3.description}</p>
            <a href={props.Item.previews.youtube_link3.url} className="btn btn-primary">
            Watch Now
            </a>
          </div>
        </div>
        <div className="card  ms-1">
          <img src={props.Item.previews.youtube_link4.image} />
          <div className="card-body">
            <h5 className="card-title">{props.Item.previews.youtube_link4.title}</h5>
            <p className="card-text">{props.Item.previews.youtube_link4.description}</p>
            <a href={props.Item.previews.youtube_link4.url} className="btn btn-primary">
            Watch Now
            </a>
          </div>
        </div>
      </div>}
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
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="../contactus.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Contact Us</h5>
              <p className="card-text fst-italic">
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
