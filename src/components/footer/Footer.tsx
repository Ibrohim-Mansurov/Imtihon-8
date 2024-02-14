import "./Footer.scss";
import Type1 from "../../images/type1.svg";
import Type2 from "../../images/type2.svg";
import FooterLogo from "../../images/footerLogo.webp";
import FooterLogo2 from "../../images/footer logo2.png";
import FooterLogo3 from "../../images/footerLogo3.svg";
import FooterLogo4 from "../../images/footerLogo4.svg";
import FooterLogo5 from "../../images/footerLogo5.png";

const Footer = () => {
  return (
    <footer>
      <div className="Choosing__type">
        <div className="type__wrapper">
          <h2 className="type__item">Choosing type</h2>
          <button className="view__btn">View all articles</button>
        </div>
        <p className="type__text">
          When you have some text, how can you choose a typeface? Many
          people—professional designers included—go through an app's font menu
          until we find one we like. But the aim of this Google Fonts Knowledge
          module is to show that there are many considerations that can improve
          our type choices. By setting some useful constraints to aid our type
          selection, we can also develop a critical eye for analyzing type along
          the way
        </p>
        <div className="type__cards">
          <div className="type__card">
            <img className="type__img" src={Type1} alt="" />
            <p className="type__text2">A checklist for choosing type</p>
          </div>
          <div className="type__card">
            <img className="type__img" src={Type2} alt="" />
            <p className="type__text2">
              Emotive considerations for choosing typefaces
            </p>
          </div>
        </div>
      </div>
      <div className="google__fonts">
        <div>
          <h3 className="google__fonts-title">Google Fonts</h3>
          <p className="google__fonts-text">
            Google Fonts makes it easy to bring personality and performance to
            your websites and products. Our robust catalog of open-source fonts
            and icons makes it easy to integrate expressive type and icons
            seamlessly — no matter where you are in the world.
          </p>
        </div>
        <div className="footer__item2">
          <div className="footer-1">
            <div className="item2__wrapper">
              <img className="footer__logo1" src={FooterLogo} alt="" />
              <div className="item2__text-wrapper">
                <h4 className="item2__text1">About us</h4>
                <p className="item2__text2">
                  Making the web more beautiful, fast, and open through great
                  typography & icons
                </p>
              </div>
            </div>
            <div className="item2__wrapper">
              <img className="footer__logo1" src={FooterLogo2} alt="" />
              <div className="item2__text-wrapper">
                <h4 className="item2__text1">Fonts GitHub</h4>
                <p className="item2__text2">
                  This repository contains the binary font files served by
                  Google Fonts
                </p>
              </div>
            </div>
            <div className="item2__wrapper">
              <img className="footer__logo1" src={FooterLogo2} alt="" />
              <div className="item2__text-wrapper">
                <h4 className="item2__text1">Icons GitHub</h4>
                <p className="item2__text2">
                  This repository contains the binary font files served by
                  Google Fonts
                </p>
              </div>
            </div>
          </div>
          <div className="footer-1">
            <div className="item2__wrapper">
              <img className="footer__logo1" src={FooterLogo4} alt="" />
              <div className="item2__text-wrapper">
                <h4 className="item2__text1">Fonts blog</h4>
                <p className="item2__text2">
                  This blog has stories about how different fonts were designed
                  for various languages and scripts
                </p>
              </div>
            </div>
            <div className="item2__wrapper">
              <img className="footer__logo1" src={FooterLogo3} alt="" />
              <div className="item2__text-wrapper">
                <h4 className="item2__text1">Material Design</h4>
                <p className="item2__text2">
                  A cross-platform design system for creating high-quality
                  digital experiences
                </p>
              </div>
            </div>
            <div className="item2__wrapper">
              <img className="footer__logo1" src={FooterLogo5} alt="" />
              <div className="item2__text-wrapper">
                <h4 className="item2__text1">Google Design</h4>
                <p className="item2__text2">
                  Google Design highlights the breadth and craft of design and
                  fonts from speculation, to work-in-progress, to finished
                  product
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__next-items">
        <img width={40} height={40} src={FooterLogo} alt="" />
        <div className="footer__next-items-texts">
          <p>Privacy</p>
          <p> Terms of service </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
