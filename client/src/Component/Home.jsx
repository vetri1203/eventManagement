import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import Cookies from "js-cookie";
import "./Style/Home.css";
import MainImage from "../Component/Images/homeimage1.png";

const Home = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("idle");

  const cookiesData = Cookies.get("tokenName");

  useEffect(() => {
    if (!cookiesData) {
      console.log("home");
      alert("Login and try again..");
      navigate("/login");
    } else {
      console.log(decode(cookiesData).Email);
    }
  }, [navigate, cookiesData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRequestStatus("loading");

    try {
      const response = await axios.post("http://localhost:8082/search", {
        Mahal: searchQuery,
      });

      const { data } = response;

      if (data) {
        setSearchResults(data);
        setIsLoading(false);
        setRequestStatus("success");
        setError(null);
      } else {
        setIsLoading(false);
        setRequestStatus("error");
        console.log(response);
        setSearchResults([]);
        setError("No Mahals found.");
      }
    } catch (error) {
      setIsLoading(false);
      setRequestStatus("error");
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    }
  };

  const viewCard = (id) => {
    console.log(id);
    navigate("/about", { state: { id } });
  };

  return (
    <>
      <div className="headerSectionMain">
        <div className="headerSectionLow">
          <h1 className="nameHead">PERFECT PLANNERS</h1>
        </div>
      </div>
      <div className="mainpage1">
        <div className="imageContainer">
          <img src={MainImage} alt="mainimg" className="imagecontainer" />
        </div>
        <div className="aboutContainer">
          <div className="aboutContent">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
              expedita, officia, ut facere quisquam quibusdam voluptas tempore,
              fugit velit eveniet accusantium distinctio. Doloribus id
              consequatur a incidunt maxime nihil aliquam.
            </p>
          </div>
          <div className="buttonAbout">
            <button className="AboutUsBtn">About Us</button>
          </div>
        </div>
      </div>

      {cookiesData && (
        <div className="searchContainer">
          <div className="HomeContaier">
            <form
              action="post"
              onSubmit={handleSearchSubmit}
              className="formSearch"
            >
              <input
                className="SearchMahal"
                type="text"
                placeholder="Search Marriage Mahal"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="searchbtn" disabled={isLoading}>
                Search
              </button>
            </form>

            {requestStatus === "loading" && (
              <p className="loading-message">Loading...</p>
            )}
            {requestStatus === "error" && (
              <p className="error-message">{error}</p>
            )}
            {requestStatus === "success" && (
              <div className="listContainer">
                {searchResults.map((data, i) => (
                  <div key={i}>
                    <span className="mahalname">
                      <b>{data.MahalName}</b> <br />
                    </span>
                    <span className="mahalamount">Price: {data.Amount}</span>{" "}
                    <br />
                    <span className="mahalSeats">
                      Seat: {data.NumberOfSeat}
                    </span>
                    <button
                      onClick={() => viewCard(data.Id)}
                      className="viewmorebtn"
                    >
                      View more
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
