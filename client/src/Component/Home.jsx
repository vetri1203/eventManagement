import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Home = () => {
  const navigate = useNavigate();
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchFailed, setSearchFailed] = useState(false);
  const cookiesData = Cookies.get("tokenName");

  const ViewCard = (id) => {
    navigate("/about", { state: { id, date, district } });
  };

  useEffect(() => {
    if (!cookiesData) {
      alert("Login and try again.");
      navigate("/login");
    }
  }, [navigate, cookiesData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8082/new`, {
        district,
        date,
      });

      if (response.data && response.data.length > 0) {
        setSearchResult(response.data);
        setSearchFailed(false);
      } else {
        setSearchResult([]);
        setSearchFailed(true);
      }
    } catch (e) {
      console.log(e);
      setSearchFailed(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {searchFailed ? (
        <p>No Mahal found</p>
      ) : searchResult.length > 0 ? (
        <div>
          <h2>Available Mahals:</h2>
          <ul>
            {searchResult.map((data, i) => (
              <div key={i}>
                <>
                  <span>{data.MahalName}</span>
                  <span>Price: {data.Amount}</span>
                  <span>Seats: {data.NumberOfSeat}</span>
                </>
                <button
                  onClick={() => ViewCard(data.Id)}
                  className="viewmorebtn"
                >
                  View more
                </button>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>search the mahal</p>
      )}
    </>
  );
};

export default Home;
