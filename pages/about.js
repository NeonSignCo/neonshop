import CustomLink from "../components/CustomLink";
import FollowSection from "../components/sections/FollowSection";
import NewsLetterSection from "../components/sections/NewsLetterSection";
import Head from 'next/head';

const About = () => {
    return (
      <div className=" pt-20">
        <Head>
          <title>About | NeonSignCo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="max-w-4xl mx-auto px-5 lg:px-20">
          <h1 className="text-4xl sm:text-5xl text-center uppercase font-semibold">
            our story
          </h1>
          <div className="grid gap-10 text-lg  mt-20 text-center md:text-left">
            <p>
              NeonSignCo was co-founded in 2015 by two friends with one vision -
              to light up people’s lives by creating lasting impressions.
            </p>
            <p>
              From humble beginnings in Geelong, Australia, Ash and Tash came to
              meet hundreds of miles/kilometers away from where their own
              individual stories began.
            </p>
            <p>
              Ash originally owned a drone business, while Tash had her roots
              grounded in photography. Thank the Neon stars, that in a
              bitter-sweet twist of fate, Ash’s drone business literally crashed
              and burned. And soon after from the embers, the NeonSignCo
              partnership was founded. The rest, as they say, is history.
            </p>
            <p>
              Now, 6 years on, NeonSignCo has built up a global team of
              extraordinary individuals - each an expert in their own areas.
              Some are LED neon artisans and epic customer experience managers,
              while others are design geniuses...and more! All, however, work
              magic and are (as we like to say) wizards.{" "}
            </p>
            <p>
              Through your journey with NeonSignCo bringing your vision to life,
              you’ll get to experience this magic first hand!{" "}
            </p>
            <p>
              Our team works with you to design and create beautifully bright
              custom LED Neon lights and signage for your events, business and
              home.
            </p>
            <p>
              Made with love, packaged with care, delivered from our door to
              yours.
            </p>
            <p>
              Ready to get started?{" "}
              <CustomLink
                href="/custom-neon-sign"
                className="font-semibold hover:underline capitalize"
                text="click here"
              />{" "}
              to design your very own custom neon sign, or get in touch with our
              team directly{" "}
              <CustomLink
                href="/contact"
                className="font-semibold hover:underline capitalize"
                text="here"
              />
              .
            </p>
          </div>
          <img
            src="/img/about-us.png"
            alt="neon store story"
            className="mt-20 mx-auto"
          />
          <CustomLink
            href="/shop"
            text="shop now"
            className="max-w-max px-10 sm:px-20 py-4 flex items-center justify-center bg-black text-white uppercase mx-auto my-10  text-2xl"
          />
        </div>
        <NewsLetterSection />
        <FollowSection />
      </div>
    );
}

export default About
