import Image from 'next/image';
import { FaSpotify } from "react-icons/fa";

const HeroSection = ({onLogin}) => {

  const handleClick = () => {
    onLogin("");
  };


  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-12 col-sm-12 col-lg-6">
          <Image
            src="/assets/PNG/musicfile2-09.png"
            className="d-block mx-lg-auto img-fluid"
            alt="Bootstrap Themes"
            width="700"
            height="500"
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
          Your soundtrack in data
          </h1>
          <p className="lead">
          Explore the magic of music in a whole new way with our chart generation system based on the songs you love on Spotify <FaSpotify />. Discover surprising insights about your personal soundtrack and dive into the stories your music data tells.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <a onClick={handleClick} type="button" className="btn btn-primary btn-lg px-4 me-md-2">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;


