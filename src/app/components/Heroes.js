import Image from 'next/image';


//import  image from "./assets/PNG/musicfile2-09.png"

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
          Sua trilha sonora em dados
          </h1>
          <p className="lead">
          Explore a magia da música de forma totalmente nova com nosso sistema de geração de gráficos a partir das músicas que você ama no Spotify. Descubra insights surpreendentes sobre sua trilha sonora pessoal e mergulhe nas histórias que seus dados musicais contam.
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


