import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";
import { getSiteData } from "../services/dynamoDbPut";
import contactus from "../public/contactus.jpg";
import Head from "next/head";

export async function getServerSideProps({ req }) {
  const subdomain = req.headers.host.split(".")[0];
  const siteData = await getSiteData(subdomain);

  return {
    props: siteData,
  };
}

const Render = (props) => {
  return (
    <div className="container col-sm-6">
      <Head>
        <meta charSet="utf-8" />
        <title>{props.Item.headers.header1}</title>
        <link rel="icon" href={props.Item.pics.pic2} />
        <meta name="description" content={props.Item.descriptions.desc1} />

        <meta name="theme-color" content="#000000" />

        <meta name="og:type" content="website" />
        <meta name="og:title" content={props.Item.headers.header1} />

        <meta
          name="og:url"
          content={"www." + props.Item.site_name + ".stogly.com"}
        />
        <meta name="og:description" content={props.Item.descriptions.desc1} />
        <meta name="og:image" content={props.Item.pics.pic2} />
      </Head>

      <div className="row">
        <div className="">
          <div className="card">
            <img
              src={props.Item.pics.pic2}
              className="rounded-circle"
              style={{
                position: "absolute",
                top: "90%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "20vh",
                height: "20vh",
              }}
            ></img>
            <img
              style={{ height: "40vh", width: "100%" }}
              src={props.Item.pics.pic1}
            ></img>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="d-flex">
        <h4>{props.Item.headers.header1}</h4>
      </div>
      <div className="d-flex">
        <a
          href={props.Item.socialLinks.instagramLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className=""
            src="/instagram.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a
          href={props.Item.socialLinks.linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="ms-1"
            src="/linkedin.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a
          href={props.Item.socialLinks.facebookLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="ms-1"
            src="/facebook.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a
          href={props.Item.socialLinks.twitterLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="ms-1"
            src="/twitter.png"
            style={{ height: "50px", width: "50px" }}
          ></img>
        </a>

        <a
          href={props.Item.socialLinks.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
        >
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
            <h5 className="card-title">{props.Item.headers.header2}</h5>
            <p className="card-text fst-italic">
              {props.Item.descriptions.desc1}
            </p>
          </div>
        </div>
      </div>
      <br />
      {props.Item.previews && (
        <div className="d-flex">
          <div className="card">
            <img
              src={props.Item.previews.youtubeLink1.image}
              style={{ width: "100%", height: "100%" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {props.Item.previews.youtubeLink1.title}
              </h5>
              <p className="card-text">
                {props.Item.previews.youtubeLink1.description}
              </p>
              <a
                href={props.Item.previews.youtubeLink1.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>
      )}
      <br />
      {props.Item.previews && (
        <div className="card-group">
          <div className="card">
            <img
              src={props.Item.previews.youtubeLink2.image}
              style={{ width: "100%", height: "auto" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {props.Item.previews.youtubeLink2.title}
              </h5>
              <p className="card-text">
                {props.Item.previews.youtubeLink2.description}
              </p>
            </div>
            <div className="card-footer bg-white border-0 text-center">
              <a
                href={props.Item.previews.youtubeLink2.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Now
              </a>
            </div>
          </div>
          <div className="card ms-1">
            <img
              src={props.Item.previews.youtubeLink3.image}
              className=""
              style={{ width: "100%", height: "auto" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {props.Item.previews.youtubeLink3.title}
              </h5>
              <p className="card-text">
                {props.Item.previews.youtubeLink3.description}
              </p>
            </div>
            <div className="card-footer bg-white border-0  text-center">
              <a
                href={props.Item.previews.youtubeLink3.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Now
              </a>
            </div>
          </div>
          <div className="card  ms-1">
            <img
              src={props.Item.previews.youtubeLink4.image}
              style={{ width: "100%", height: "auto" }}
            />
            <div className="card-body">
              <h5 className="card-title">
                {props.Item.previews.youtubeLink4.title}
              </h5>
              <p className="card-text">
                {props.Item.previews.youtubeLink4.description}
              </p>
            </div>
            <div className="card-footer bg-white border-0  text-center">
              <a
                href={props.Item.previews.youtubeLink4.url}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Now
              </a>
            </div>
          </div>
        </div>
      )}
      <br />
      <div className="d-flex">
        <div className="card ">
          <div className="card-body">
            <h5 className="card-title"> {props.Item.headers.header3}</h5>
            {props.Item.descriptions.desc2}
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
                Email: {props.Item.contactInfo.email} <br />
                Phone: {props.Item.contactInfo.primaryPhone} <br />
                Address: {props.Item.contactInfo.addressLine1} <br />
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
