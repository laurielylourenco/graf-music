const About = () => {
  return (

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1>Sobre o Projeto</h1>
          <p>
            Na minha casa sempre escutei diversos tipos de musicas desde Samba ao Rock.
            Adoro, buscar e escutar musicas diferentes.
            Queria fazer um projeto com tema de musica é estou tentando focar neste daqui.
          </p>
        </div>
        <div className="col-md-6">
          <h1>Quem sou eu?</h1>
          <p>
            Meu nome é Lauriely, tenho 22 anos.
            Sou uma desenvolvedora web apaixonada por tecnologia e estou sempre procurando maneiras de melhorar minhas habilidades com temas que gosto.
          </p>

          <a href="https://www.linkedin.com/in/laurielylourenco" className="btn btn-info me-2"> Linkedin </a>
          <a href="https://github.com/laurielylourenco" className="btn btn-dark me-2">Github</a>
        </div>
      </div>
    </div>
  );
};

export default About;