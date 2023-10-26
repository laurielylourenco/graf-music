import Link from 'next/link';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Head from "next/head";

const AboutSection = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <About />
    </>
  );
};

export default AboutSection;