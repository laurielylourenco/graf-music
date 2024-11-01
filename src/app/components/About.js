import Link from 'next/link';


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
          <h1>Quem criou?</h1>
          <p>
            Meu nome é Lauriely, tenho 22 anos. 
            Sou uma desenvolvedora web apaixonada por tecnologia e estou sempre procurando maneiras de melhorar minhas habilidades com temas que gosto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;