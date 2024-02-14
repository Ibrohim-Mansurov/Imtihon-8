import "./Nav.scss";
import Logo from "../../images/font logo.png";
import Search from "../../images/search logo.svg";
import View from "../../images/view.svg";
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import Close from "../../images/cross2.svg";
import Bag from "../../images/bag.svg";

interface NavProps {
  setSearch: Dispatch<SetStateAction<string>>;
  isOpen: boolean;
  search: string;
  setSort: Dispatch<SetStateAction<string>>;
  sort: string;
}

const Nav: FC<NavProps> = ({ search, isOpen, setSearch, setSort, sort }: NavProps) => {
  const [isViewClicked, setIsViewClicked] = useState<boolean>(false);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);
  const handleViewClick = () => setIsViewClicked(!isViewClicked);
  const handleChange = (event: SelectChangeEvent) => setSort(event.target.value as string);

  return (
    <div
      className="nav"
      style={
        isOpen
          ? { position: "fixed", top: "0", width: "100%", backgroundColor: "white", zIndex: 999, boxShadow: "0 0 10px 15px #fff" }
          : { position: "fixed", top: "0", width: "1500px", backgroundColor: "white", marginLeft: "0", zIndex: 999, boxShadow: "0 0 10px 15px #fff" }
      }
    >
      <nav style={{ maxWidth: isOpen ? "100%" : "80%", position: "absolute", left: "50%", transform: isOpen ? "translateX(-50%)" : "translateX(-57%)", marginLeft: isOpen ? "50px" : "0", transition: "0.3s" }}>
        <img className="logo" src={Logo} alt="" />
        <div className="search" style={{ maxWidth: isOpen ? "60%" : "1015px" && isViewClicked ? "40%" : "1015px", transition: "0.3s", marginRight: isViewClicked ? "30px" : "15px" }}>
          <img className="search__logo" src={Search} alt="" />
          <input value={search} onChange={handleSearch} className="search-input" type="text" placeholder="Search fonts" />
          <div className="hr"></div>
          <div className="sort">
            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Sort by:{}</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={sort} label="Age" onChange={handleChange}>
                  <MenuItem value={"popularity"}>Most popular</MenuItem>
                  <MenuItem value={"date"}>Newest</MenuItem>
                  <MenuItem value={"alpha"}>Name</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="view" style={{ marginRight: isViewClicked ? "260px" : "0" }} onClick={handleViewClick}>
          <img className="view-logo" src={isViewClicked ? Bag : View} alt="" />
          <div className="view-text">View selected families</div>
        </div>
        {isViewClicked && (
          <div className="bag" style={{ transform: isViewClicked ? "translateX(0)" : "translateX(-300px)", transition: "3s", zIndex: 999 }}>
            <div className="close-view">
              <h2 className="close-view__title">Selected family</h2>
              <div className="Filter__close" onClick={handleViewClick}>
                <img width={15} height={15} style={{ cursor: "pointer" }} src={Close} alt="" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Nav;
