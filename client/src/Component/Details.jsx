import axios from "axios";
import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Details = () => {

  const navigate = useNavigate();
  const [district, setDistrict] = useState("");
  const [date, setDate] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [status, setStatus] = useState();

  const [searchFailed, setSearchFailed] = useState(false); 
  const cookiesData = Cookies.get("tokenName");

  const [Data, setData] = useState({
    isLoading: false,
    isData: undefined,
  });
const VewCard = (id) => {
  console.log(id);
  navigate("/about", { state: { id,date }, });
};

useEffect(() => {
  if (!cookiesData) {
    console.log("home");
    alert("login and try again..");
    navigate("/login");
    return;
  } else {
    console.log(decode(cookiesData).Email);
  }

  if (setData.isLoading) {
    setStatus("Loading.....");
  } else {
    setStatus("");
  }
}, [navigate, cookiesData, setData.isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(district);
    try {
      const response = await axios.post(`http://localhost:8082/new`, {
        district,date
      });

      console.log(response.data);

      if (
        response.data &&
        response.data !== "No Mahal" &&
        response.data.length > 0
      ) {
        console.log(response.data);
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
      <form action="" onSubmit={handleSubmit}>
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
          // required
          onChange={(e) => setDate(e.target.value)}
        />
        <button>Search</button>
      </form>

      {searchFailed ? (
        <p>No Mahal found</p>
      ) : searchResult.length > 0 ? (
        <div>
          <h2>Available Mahals:</h2>
          <ul>
            {searchResult.map((data, i) => (
              <div key={i}>
                {
                  <>
                    <span>{data.MahalName}</span>
                    <span>Price : {data.Amount}</span>
                    <span>Seats : {data.NumberOfSeat}</span>
                  </>
                }
                <button
                  onClick={() => VewCard(data.Id)}
                  className="viewmorebtn"
                >
                  View more
                </button>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Search for Mahals</p>
      )}
    </>
  );
};

export default Details;
