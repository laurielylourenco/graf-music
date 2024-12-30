const About = () => {
  return (

    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1>About the Project</h1>
          <p>
            In my house, I’ve always listened to various types of music, from Samba to Rock.
            I love searching for and listening to different kinds of music.
            I wanted to create a project with a music theme, and I’m trying to focus on this one.
          </p>
        </div>
        <div className="col-md-6">
          <h1>Who am I?</h1>
          <p>
            My name is Lauriely, I’m 22 years old.
            I’m a web developer passionate about technology and always looking for ways to improve my skills through topics I enjoy.
          </p>

          <a href="https://www.linkedin.com/in/laurielylourenco" className="btn btn-info me-2"> Linkedin </a>
          <a href="https://github.com/laurielylourenco" className="btn btn-dark me-2">Github</a>
        </div>
      </div>
    </div>
  );
};

export default About;