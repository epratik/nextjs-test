import { Auth } from "aws-amplify";
import React from "react";
import Image from "next/image";
import l1 from "../public/landing1.jpg"
import l6 from "../public/landing6.jpg"

const Landing = (props) => {
  const callSignIn = () => {
    Auth.federatedSignIn();
  };

  return (
    <div className="container py-4">
      {/* <header className="pb-3 mb-4 border-bottom">
          <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fill-rule="evenodd" clip-rule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
            <span className="fs-4">GREPIN</span>
          </a>
        </header> */}

      <div
        className="row align-items-md-stretch "
        style={{ "max-height": "100vh" }}
      >
        <div className="col-md-6 p-5 border rounded-3 blur" style={{"position":"relative"}}>
          <Image
            src={l1}
            layout="fill"
            objectFit="cover"
            className="bgWrap"
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="py-5">
            <h1 className="display-5 fw-bold  text-white ">
              Website for your youtube channel in 3 steps
            </h1>
            <button
              onClick={callSignIn}
              className="btn btn-primary btn-lg"
              style={{"display":"inline-block",
                "position":"relative"}}
              type="button"
            >
              Sign Up Now
            </button>
          </div>
        </div>
        <div className="col-md-6 p-5 border rounded-3 blur" style={{"position":"relative"}}>
          <Image
            src={l6}
            layout="fill"
            objectFit="cover"
          />

          {/* <div
          className="col-md-6 p-5 border rounded-3 blur "
          style={{
            backgroundColor: "#E4E4E4",
            height: "100vh",
            color: "#FFFFFF",
            backgroundImage: `url(${landing6img})`,
            backgroundSize: "cover",
          }}
        > */}
          {/* <h1 className="title text-dark display-5 fw-bold">3 easy steps</h1> */}
          {/* <br/> */}
          <div
            className="card display-6 text-left text-white bg-secondary mb-3"
          >
            <div className="card-body">
              {/* <h5 className="card-title">Step 1</h5> */}
              <p className="card-text">1. Fill up a short form.</p>
            </div>
          </div>

          <div
            className="card display-6 text-center text-white bg-dark mb-3 ms-5"
          >
            <div className="card-body">
              {/* <h5 className="card-title">Step 2</h5> */}
              <p className="card-text">2. Choose a sub-domain</p>
            </div>
          </div>

          <div
            className="card display-6 text-left text-white bg-secondary"
          >
            <div className="card-body">
              {/* <h5 className="card-title">Step 3</h5> */}
              <p className="card-text">3. Click submit</p>
            </div>
          </div>
          <br />

          <div
            className="card fs-3 text-white bg-dark"
          >
            <div className="card-body">
              <h5 className=" text-center fs-1 card-title">Why Us?</h5>
              <ul>
                <li>No hassel to maintain a domain</li>
                <li>1 month free</li>
                <li>Better SEO performance</li>
                <li>
                  Do not have to pay or spend time to create a custom site
                </li>
              </ul>
              Contact us at <em className="text-white">stogly.help@gmail.com</em>
            </div>
          </div>

          {/* <div className="list-group">
            <a
              className="list-group-item list-group-item-action active"
              aria-current="true"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="display-6">Why Content Hub?</h5>
              </div>
            </a>
            <a className="list-group-item list-group-item-action list-group-item-light">
              <div className="d-flex w-100 justify-content-between">
                <p className="fs-5">No hassel of buying and maintaining a domain</p>
              </div>
            </a>
            <a className="list-group-item list-group-item-action list-group-item-warning">
              <div className="d-flex w-100 justify-content-between">
                <p className="fs-5">
                  Increase traffic to your channel with a few clicks
                </p>
              </div>
            </a>
            <a className="list-group-item list-group-item-action list-group-item-light">
              <div className="d-flex w-100 justify-content-between">
                <p className="fs-5">
                  Do not have to pay or spend time to create a custom site
                </p>
              </div>
            </a>
            <a className="list-group-item list-group-item-action list-group-item-warning">
              <div className="d-flex w-100 justify-content-between">
                <p className="fs-5">Better SEO performance</p>
              </div>
            </a>
            <a className="list-group-item list-group-item-action list-group-item-light">
              <div className="d-flex w-100 justify-content-between">
                <p className="fs-5">Free for the first 6 months</p>
              </div>
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// export default Landing
export default Landing;
