import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import profile from  './Images/profilelogo.png'; 
import party from './Images/party3.jpg';
// import decode from "jwt-decode";

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
      // console.log(e);
      setSearchFailed(true);
    }
  };
  // const updatePage =()=>{
  //   Navigate('/UpdateUser');
  // }

  return (
    <>
      <div className="div-homepage">
        <div className="main-bar-design">
          <p className="para-class-nav">PERFECT PLANNERS</p>
          <img  src={profile} alt="profile-logo"  className="image-profile"/>
        </div>
        
        <div className="image-div">
          <p className="para-contemt">Let's Plan Your Event With Us</p>
          <img src={party} alt="party-img" className="part-img"/>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="from-search-mahals">
        <input
        className="input-district"
          type="text"
          required
          placeholder="Enter District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
        <input
        className="input-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {searchFailed ? (
        <p className="para-no-found">No Mahal found</p>
      ) : searchResult.length > 0 ? (
        <div className="displaying-mahal-details">
          <h2 className="h2-display-availabe-head">Available Mahals:</h2>
          <ul className="span-contents">
            {searchResult.map((data, i) => (
              <div key={i}>
                <>
                  <span className="mahal-detail">{data.MahalName}</span>
                  <span className="mahal-detail">Price: {data.Amount}</span>
                  <span className="mahal-detail">Seats: {data.NumberOfSeat}</span>
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
        <p className="search-para">search the mahal</p>
      )}
    </>
  );
};

export default Home;
