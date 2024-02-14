import { Font } from "../../types";
import "./SinglePage.scss";
import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/footer/Footer";

const SinglePage = () => {
  const { familyId } = useParams();
  const [font, setFont] = useState<Font>();
  const [words, setWords] = useState("");
  const [fontSize, setFontSize] = useState(48);

  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB6vBlaKb8w4Xy8-GG8_nZvXLM0l9zhn-s&family=${familyId}`
      );
      setFont(data?.items[0]);
    };

    fn();
  }, [familyId]);

  const handleFontSize = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    setFontSize(value);
  };

  const createFontFace = (font: Font) => {
    const fontStyles = Object.keys(font.files).map((style) => {
      const fontUrl = font.files[style];
      const fontWeight = style.includes("regular") ? "normal" : "bold"; // Regular stili uchun normal, aks holda bold
      const fontStyle = style.includes("italic") ? "italic" : "normal"; // Italic stili uchun italic, aks holda normal
      return `
      @font-face {
        font-family: "${font.family}";
        font-style: ${fontStyle}; // Turli stil uchun turli font-style
        font-weight: ${fontWeight}; // Turli stil uchun turli font-weight
        src: url("${fontUrl}");
      }
    `;
    });
    return fontStyles.join("\n");
  };
  const generateOptions = () => {
    const options = [];
    for (let i = 8; i <= 300; i += 4) {
      options.push(
        <option key={i} value={i}>
          {i ? i : fontSize}
        </option>
      );
    }
    return options;
  };
  useEffect(() => {
    if (font && font.files) {
      const style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(createFontFace(font)));
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [font]);

  const handleFontCode = (font: any) => {
    console.log(font);
  };

  return (
    <div className="single__page">
      <h1 className="google__fonts">{font?.family}</h1>
      <p>Designet by Christian Robertson</p>
      <h2 className="item">
        Whereas disregard and contempt for human rights have resulted
      </h2>
      <h3 className="item2">Styles</h3>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Type here to preview text"
          className="input__font-single"
          onChange={(e) => setWords(e.target.value)}
        />
        <div className="input__select">
          <select
            className="input__select-single"
            value={fontSize}
            onChange={handleFontSize}
          >
            {generateOptions()}
          </select>
          <input
            value={fontSize}
            onChange={handleFontSize}
            type="range"
            min={8}
            max={300}
            className="input__range-single"
          />
        </div>
      </div>
      <div className="line3"></div>
      {font &&
        Object.keys(font.files)
          .sort((a, b) => {
            const aWeight = parseInt(a.match(/\d+/g)?.[0] || "0");
            const bWeight = parseInt(b.match(/\d+/g)?.[0] || "0");
            if (aWeight !== bWeight) {
              return aWeight - bWeight;
            }
            if (a.includes("italic") && !b.includes("italic")) {
              return 1;
            } else if (!a.includes("italic") && b.includes("italic")) {
              return -1;
            }
            return 0;
          })
          .map((style) => (
            <div key={style} className="font__preview">
              <p className="font__style">
                {style.includes("100" || "100italic") ? "Thin" : null}
                {style.includes("200" || "200italic") ? "Extra light" : null}
                {style.includes("300" || "300italic") ? "Light" : null}
                {style.includes("400" || "400italic") ? "Normal" : null}
                {style.includes("500" || "500italic") ? "Medium" : null}
                {style.includes("600" || "600italic") ? "Semi bold" : null}
                {style.includes("700" || "700italic") ? "Bold" : null}
                {style.includes("800" || "800italic") ? "Extra bold" : null}
                {style.includes("900" || "900italic") ? "Black" : null}
                {style.includes("regular") ? "Regular" : null}
                {style.includes("italic") ? "Italic" : null}
              </p>
              <div className="font__preview-wrapper">
                <h1
                  className="font__title"
                  key={style}
                  style={{
                    fontFamily: font.family.includes("Roboto")
                      ? "Roboto, sans-serif"
                      : font.family,
                    fontWeight: style.includes("100")
                      ? 100
                      : style.includes("200")
                      ? 200
                      : style.includes("300")
                      ? 300
                      : style.includes("400")
                      ? 400
                      : style.includes("500")
                      ? 500
                      : style.includes("600")
                      ? 600
                      : style.includes("700")
                      ? 700
                      : style.includes("800")
                      ? 800
                      : style.includes("900")
                      ? 900
                      : style.includes("regular")
                      ? 400
                      : style.includes("100italic")
                      ? 100 + " italic"
                      : style.includes("200italic")
                      ? 200 + " italic"
                      : style.includes("300italic")
                      ? 300 + " italic"
                      : style.includes("400italic")
                      ? 400 + " italic"
                      : style.includes("500italic")
                      ? 500 + "italic"
                      : style.includes("600italic")
                      ? 600 + " italic"
                      : style.includes("700italic")
                      ? 700 + " italic"
                      : style.includes("800italic")
                      ? 800 + " italic"
                      : style.includes("900italic")
                      ? 900 + " italic"
                      : 400,
                    fontStyle: style.includes("italic") ? "italic" : "normal",
                    fontSize: `${fontSize}px`,
                  }}
                >
                  {words
                    ? words
                    : "Whereas recognition of the inherent dignity"}
                </h1>
                <p className="font__add" onClick={() => handleFontCode(style)}>
                  Select Medium {style} +{" "}
                </p>
              </div>
              <div className="line3"></div>
            </div>
          ))}
      <Footer />
    </div>
  );
};

export default SinglePage;
