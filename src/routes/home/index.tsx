import Header from "../../components/header/Header";
import Filter from "../../components/filter/Filter.tsx";
import Nav from "../../components/nav/Nav.tsx";
import { useState } from "react";

const Home = () => {
  const [search, setSearch] = useState("");
  const [fontSize, setFontSize] = useState(40);
  const [words, setWords] = useState(
    "Whereas disregard and contempt for human rights have resulted: the right to bear arms"
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState("trending");
  const [subStyle, setSubStyle] = useState("serif");
  const [numberStyle, setNumberStyle] = useState(1);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div>
      <Filter
        setNumberStyle={setNumberStyle}
        setSubStyle={setSubStyle}
        isOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        setWords={setWords}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <Header
        subStyle={subStyle}
        sort={sort}
        search={search}
        isFilterOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        words={words}
        fontSize={fontSize}
        styles={numberStyle}
      />
      <Nav
        sort={sort}
        setSearch={setSearch}
        isOpen={true}
        search={search}
        setSort={setSort}
      />
    </div>
  );
};

export default Home;
