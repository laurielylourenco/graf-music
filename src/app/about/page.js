
import Link from 'next/link';
import About from '../components/About';

const AboutSection = () => {

  return (
    <>
      <nav className="navbar" aria-label="First navbar example">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">GrafMusic</Link>
        </div>
      </nav>
      <About />
    </>
  );
};

export default AboutSection;