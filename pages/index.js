import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Render.module.css";
import Home from './home'
import Ritz from './ritz'
import Navtara from './navtara'


export async function getServerSideProps({ req }) {

  console.log('*****************************')
  console.log(req.headers.host)
  
  let subdomain = req.headers.host.split(".")[0];
  if (subdomain.toLowerCase() == "www") {
    // Split the hostname by dots and take the second part
    const parts = req.headers.host.split(".");
    if (parts.length >= 3) {
      subdomain = parts[1];
    } else {
      // Handle the case where there is no valid subdomain
      subdomain = "";
    }
  }

  const data = {
    subdomain : subdomain
  }

  return {
    props: data,
  };
}

const Render = (props) => {

    const subdomain = props.subdomain

    if (subdomain.toLowerCase() == "ritz") {
      return <Ritz />;
    } else if (subdomain.toLowerCase() == "navtara") {
      return <Navtara />;
    } else {
      return <Home />;
    }

};

export default Render;
