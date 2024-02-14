import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Font } from "../../types";
import "./Header.scss";
import Filter__logo from "../../images/filter.svg";
import Tooltip from "../../images/tooltip.svg";
import ArrowLogo from "../../images/arrow.png";
import Cross from "../../images/cross.svg";

interface HeaderProps {
  search: string;
  isFilterOpen: boolean;
  toggleFilter: () => void;
  words: string;
  fontSize: number;
  sort: string;
  subStyle: string;
  styles: number;
}

const Header: React.FC<HeaderProps> = ({
  search,
  isFilterOpen,
  toggleFilter,
  words,
  fontSize,
  sort,
  styles,
}: HeaderProps) => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB6vBlaKb8w4Xy8-GG8_nZvXLM0l9zhn-s&sort=${sort}`
      );
      const filteredFonts = data?.items.filter(
        (font: Font) => Object.keys(font.files).length >= styles
      );
      setFonts(filteredFonts);
    };
    fn();
  }, [sort, styles]);

  const createFontFace = (font: Font) => {
    const fontStyles = Object.keys(font.menu).map((style) => {
      const fontUrl = font.menu;
      return `
        @font-face {
          font-family: "${font.family}";
          font-style: ${style};
          src: url("${fontUrl}");
        }
      `;
    });
    return fontStyles.join("\n");
  };

  useEffect(() => {
    const fontStyles = fonts.map(createFontFace).join("\n");
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(fontStyles));
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scrollTop > (containerRef.current?.offsetTop || 0);
    setShowButton(isScrollingDown);
  };

  const handleButtonClick = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="google-fonts__header">
      <div className="container">
        <button
          className={isFilterOpen ? "filter__btn-open" : "filter__btn"}
          style={isFilterOpen ? { marginLeft: "300px" } : { marginLeft: "0" }}
          onClick={toggleFilter}
        >
          <img
            className="filter-logo"
            src={isFilterOpen ? Cross : Filter__logo}
            style={isFilterOpen ? { width: "13px" } : {}}
            alt=""
          />
          Filters
        </button>
        {showButton && (
          <button className="scroll-to-top" onClick={handleButtonClick}>
            <img width={25} src={ArrowLogo} alt="" />
          </button>
        )}
        {
          <div
            className="header__items-texts"
            style={isFilterOpen ? { marginLeft: "300px" } : { marginLeft: "0" }}
          >
            <p className="header__texts1">
              {search.length} of {fonts.length} families
            </p>
            <div className="header__texts2">
              <p className="texts2__wrapper">About these results</p>
              <img className="texts2-logo" src={Tooltip} alt="" />
              <p className="texts2__item">
                Search results are based on font and font designer names which
                most closely match your query, and are ranked using the
                following factors: (1) web usage of the font family; (2) trend
                in web usage of the font family; (3) the number of styles in the
                font family; (4) the date the font family was added to Google
                Fonts; and/or (5) how applicable the font family is to the
                dominant language(s) in your country (based on your location and
                settings). The relative weight given to each factor is
                determined by the sorting method you choose—for example, the
                date the font family was added to Google Fonts will play a
                bigger role if you choose to sort by "Newest".
              </p>
            </div>
          </div>
        }
        {fonts
          ?.filter((font) => {
            if (search !== "")
              return font.family.toLowerCase().includes(search.toLowerCase());
            return font;
          })
          ?.map((font, index) => (
            <div
              style={
                isFilterOpen ? { marginLeft: "300px" } : { display: "block" }
              }
              key={index}
              className="header__fonts"
            >
              <Link to={`/specimen/${font.family}`} className="font">
                <div className="font__items">
                  <p className="font__name">{font.family}</p>
                  <p className="fonst__stayles">
                    {Object.keys(font.files).length}styles
                  </p>
                  <div className="hr2"></div>
                  <p className="font__des">Christian Robertson</p>
                </div>
                <h1
                  className="font__text"
                  style={{
                    fontFamily: font.family.includes("Roboto")
                      ? "sans-serif"
                      : font.family,
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {words === ""
                    ? "Whereas disregard and contempt for human rights have resulted: the right to bear arms"
                    : words}
                </h1>
                <div className="shadow"></div>
                <div className="line"></div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
