import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "./Calender";
import '../Component/Style/AboutMahal.css';

const AboutMahal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cookiesData = Cookies.get("tokenName");

  const [responseData, setResponseData] = useState([]);


  const handleConfirm = async () => {
   
    const userId = cookiesData; 
    const selectedDate = location.state.date;

    if (!userId || !selectedDate) {
      console.error("User ID or selected date is missing.");
      return; 
    }

    try {
      const response = await axios.post("http://localhost:8082/booking", {
        MahalName: responseData.MahalName,
        UserName: userId,
        Date: selectedDate,
      });

      console.log("Booking response:", response.data);

    } catch (error) {
      console.error("Error booking Mahal:", error);
    }
  }

  useEffect(() => {
    if (!cookiesData) {
      console.log("no user");
      alert("login and try again...");
      return navigate("/login");
    }
    const id = location.state.id;
    const date = location.state.date;
    if (!id) {
      navigate("/home");
    } 
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8082/about`, {
          id,
        });
        console.log(response.data);
        console.log(date);
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
            <span className="mahalName">
              Mahal Name : {responseData.MahalName}
            </span>
            {/* <br /> */}
          </div>
          <div>
            <span>Seat Capacity : {responseData.NumberOfSeat}</span>
          </div>
          {/* <br /> */}
          <div>
            <span>Rooms : {responseData.Rooms}</span>
          </div>{" "}
          {/* <br /> */}
          <div>
            <span>MahalType : {responseData.MahalType}</span> <br />
          </div>
          <div>
            <span>Amount : {responseData.Amount}</span> <br />
          </div>
          <div>
            <span>Parking : {responseData.Parking}</span> <br />
          </div>{" "}
          {/* <br /> */}
          <div>
            {" "}
            <span>Place: {responseData.Place}</span>
            <br />
          </div>
          <div>
            <span> About : {responseData.About}</span>
          </div>
          {/* <button onClick={handleConfirm}>Confirm</button> */}
          <Calendar />
        </div>
      )}
    </>
  );
};

export default AboutMahal;
