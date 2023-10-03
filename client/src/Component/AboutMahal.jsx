import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "./Calender";

const AboutMahal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cookiesData = Cookies.get("tokenName");

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    if (!cookiesData) {
      console.log("no user");
      alert("login and try again...");
      return navigate("/login");
    }
    const id = location.state.id;
    if (!id) {
      navigate("/home");
    }
    console.log("user");
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8081/about`, {
          id,
        });
        console.log(response.data);
        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cookiesData, navigate, location.state]);

  return (
    <>
      {cookiesData && (
        <div className="Container">
          <div>
            <span>Mahal Name :</span>
            {responseData.MahalName} <br />
          </div>
          <div>
            <span>Seat Capacity :</span> {responseData.NumberOfSeat}
          </div>
          <br />
          <div>
            <span>Rooms :</span> {responseData.Rooms}
          </div>{" "}
          <br />
          <div>
            <span>MahalType :</span>
            {responseData.MahalType} <br />
          </div>
          <div>
            <span>Amount :</span> {responseData.Amount} <br />
          </div>
          <div>
            <span>Parking :</span> {responseData.Parking} <br />
          </div>{" "}
          <br />
          <div>
            {" "}
            <span>Place:</span>
            {responseData.Place} <br />
          </div>
          <div>
            <span> About :</span> {responseData.About}
          </div>
          <Calendar />
        </div>
      )}
    </>
  );
};

export default AboutMahal;
