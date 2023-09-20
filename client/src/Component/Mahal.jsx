import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  const [Mahal, setMahal] = useState("");
  const [listOfMahal, setList] = useState([]);
  const [error, setError] = useState(null);

  const SearchSubmit = async (e) => {
    e.preventDefault();
    console.log(Mahal);
    try {
      const response = await axios.post(`http://localhost:8082/search`,{Mahal});

      if ( response.data) {
        setList(response.data);
        setError(null); 
      } else {
        console.log(response);
        setList([]);
        setError("No Mahals found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    }
  };

  const handleSearch = (e) => {
    setMahal(e.target.value);
  };

  return (
    <>
      <div className="HomeContaier">
        <form action="post" onSubmit={SearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={Mahal}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>

        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="listContainer">
            {listOfMahal.map((data, i) => (
              <span key={i}>{data.MahalName}  <br /></span>
            ))} 
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
