import "./Filter.scss";
import Cross from "../../images/cross2.svg";
import ResetLogo from "../../images/res.svg";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Brush from "../../images/brush.svg";
import Circuit from "../../images/circuit.svg";

interface FilterProps {
  isOpen: boolean;
  toggleFilter: () => void;
  setWords: Dispatch<SetStateAction<string>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  setSubStyle: Dispatch<SetStateAction<string>>;
  setNumberStyle: Dispatch<SetStateAction<number>>;
}

const Filter: FC<FilterProps> = ({
  isOpen,
  toggleFilter,
  setWords,
  setFontSize,
  fontSize,
  setSubStyle,
  setNumberStyle,
}: FilterProps) => {
  const handleFontSize = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    setFontSize(value);
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
  //@ts-ignore
  const onNumberStyle = (e) => {
    const value = Number(e.target.value);
    setNumberStyle(value);
  };

  const PrettoSlider = styled(Slider)({
    color: "#1a73e8",
    height: 8,
    "& .MuiSlider-track": { border: "none" },
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&::before": { display: "none" },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#1a73e8",
      color: "#fff",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&::before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": { transform: "rotate(45deg)" },
    },
  });
  const handleReset = () => {
    setWords("");
    setFontSize(40);
    setSubStyle("");
    setNumberStyle(0);
  };

  return (
    <div className={`Filter ${isOpen ? "" : "closed"}`}>
      <div className="Filter__header2">
        <div className="reset" onClick={() => handleReset()}>
          <img className="reset__img" src={ResetLogo} alt="" />
          <p className={"reset__text"}>Reset all</p>
        </div>
        <div className="Filter__close" onClick={toggleFilter}>
          <img className="close-logo" src={Cross} alt="" />
        </div>
      </div>
      <h2 className="Filter__title">Preview</h2>
      <input
        className="Filter__input"
        type="text"
        placeholder="Type something..."
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setWords(event.target.value)
        }
      />
      <div className="slider-container">
        <select value={fontSize} onChange={handleFontSize} className="select">
          {generateOptions()}
        </select>
        <input
          type="range"
          min={8}
          max={300}
          value={fontSize}
          onChange={handleFontSize}
          className="slider"
        />
      </div>
      <div className="line2"></div>
      <div className="stroke">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              <img width={24} height={24} src={Brush} alt="" /> Decorative
              stroke
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="stroke__wrapper">
                <button
                  className="stroke__btn"
                  onChange={() => setSubStyle("serif")}
                >
                  Serif
                </button>
                <button
                  className="stroke__btn"
                  onChange={() => setSubStyle("slab serif")}
                >
                  Slab Serif
                </button>
                <br />
                <button
                  className="stroke__btn"
                  onChange={() => setSubStyle("sans serif")}
                >
                  Sans Serif
                </button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="Properties">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>
              <img
                width={24}
                height={24}
                style={{ marginRight: "10px" }}
                src={Circuit}
                alt=""
              />
              Properties
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div className="stroke__wrapper">
                <Typography gutterBottom>Number of styles</Typography>
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={1}
                  min={1}
                  max={18}
                  onChange={onNumberStyle}
                />
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Filter;
