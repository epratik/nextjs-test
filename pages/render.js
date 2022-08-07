import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";
import { LinkPreviewService } from "../services/LinkPreviewService";
import { getSiteData } from "../services/dynamoDbPut";
const contactus = "/contactus.jpg";

export async function getServerSideProps({ req }) {

  const subdomain = req.headers.host.split('.')[0];

  const siteData = await getSiteData(subdomain)

  const previewService = await new LinkPreviewService();
  const previews = [];
  previews.push(
    await previewService.getMetaData(
      siteData.Item.youtube_link1
    )
  );
  previews.push(
    await previewService.getMetaData(
      siteData.Item.youtube_link2
    )
  );
  previews.push(
    await previewService.getMetaData(
      siteData.Item.youtube_link3
    )
  );
  previews.push(
    await previewService.getMetaData(
      siteData.Item.youtube_link4
    )
  );

  siteData.previews = previews
  // previews.push(await previewService.getMetaData("https://www.youtube.com/watch?v=_6M4rX-PYzs"))
  // previews.push(await previewService.getMetaData("https://www.youtube.com/watch?v=_6M4rX-PYzs"))

  return {
    props: siteData
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
            <p className="card-text fst-italic">
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
            </p>
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
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="card-group">
        <div className="card">
          <img src={props.previews[0].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[0].title}</h5>
            <p className="card-text">{props.previews[0].description}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        <div className="card ms-1">
          <img src={props.previews[0].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[0].title}</h5>
            <p className="card-text">{props.previews[0].description}</p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
        <div className="card  ms-1">
          <img src={props.previews[0].image} />
          <div className="card-body">
            <h5 className="card-title">{props.previews[0].title}</h5>
            <p className="card-text">{props.previews[0].description}</p>
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
            <h5 className="card-title">More on me</h5>
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
      <br />
      <div className="card mb-3" >
        <div className="row g-0">
          <div className="col-md-4">
            <img src="contactus" className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Contact Us</h5>
              <p className="card-text fst-italic">
                Email: e_pratik@yahoo.co.in <br />
                Phone: 9538550218 <br />
                Address: xxxxxxxxxxxxxxxxxx <br />
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
