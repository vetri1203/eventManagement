import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import './Style/AboutMahal.css';

const AboutMahal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cookiesData = Cookies.get("tokenName");

  const [responseData, setResponseData] = useState({});
  const [bookingStatus, setBookingStatus] = useState(null);
  const selectedDate = new Date(location.state.date).toISOString();
  const selectedDistrict = location.state.district;

  const handleConfirm = async (MahalName) => {
    const userId = decode(cookiesData).Email;
    const mahalId = location.state.id;
    const mahalName = MahalName;
    if (!userId || !selectedDate || !mahalId) {
      // console.error("User ID, selected date, or Mahal ID is missing.");
      alert("something went worng..")
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/booking", {
        MahalId: mahalId,
        UserName: userId,
        SelectedDate: selectedDate,
        MahalName:mahalName,
      });

      // console.log("Booking response:", response.data);
      setBookingStatus("Booking Successful!");
    } catch (error) {
      // console.error("Error booking Mahal:", error);
      setBookingStatus("Booking Failed. Please try again.");
    }
  };

  const searchAvailableMahals = async () => {
    try {
      const response = await axios.post("http://localhost:8082/new", {
        date: selectedDate,
        district: selectedDistrict,
      });

      if (response.data.message) {
        console.log(response.data.message);
        // Handle the case when no Mahal is available
      } else {
        const availableMahals = response.data;
        // Handle the case when there are available Mahals
        console.log("Available Mahals:", availableMahals);
      }
    } catch (error) {
      console.error("Error searching for Mahals:", error);
      // Handle errors
    }
  };

  useEffect(() => {

    setBookingStatus("");
    if (!cookiesData) {
      // console.log("no user");
      alert("Login and try again...");
      navigate("/login");
    }

    const id = location.state.id;

    if (!id) {
      navigate("/home");
    }

    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8082/about`, {
          id,
        });

        setResponseData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Call the searchAvailableMahals function to find available Mahals
    searchAvailableMahals();
  }, [cookiesData, navigate, location.state, selectedDate, selectedDistrict]);

  return (
    <>
      {cookiesData && (
        <div className="Container">
          <div className="1">
            <span className="mahalName" id="span-color">
              Mahal Name: {responseData.MahalName}
            </span>
          </div>
          <div className="1">
            <span className="seat-capacity" id="span-color">Seat Capacity: {responseData.NumberOfSeat}</span>
          </div>
          <div className="2">
            <span className="rooms" id="span-color">Rooms: {responseData.Rooms}</span>
          </div>
          <div className="3">
            <span className="mahaltype" id="span-color">Mahal Type: {responseData.MahalType}</span>
          </div>
          <div className="4">
            <span className="amount" id="span-color">Amount: {responseData.Amount}</span>
          </div>
          <div className="5">
            <span className="parking" id="span-color">Parking: {responseData.Parking}</span>
          </div>
          <div className="6">
            <span className="place" id="span-color">Place: {responseData.Place}</span>
          </div>
          <div className="7">
            <span className="about" id="span-color">About: {responseData.About}</span>
          </div>
          {bookingStatus && <p className="para-booking-success">{bookingStatus}</p>}

          <button onClick={()=>handleConfirm(responseData.MahalName)} className="button-booking">Confirm</button>
        </div>
      )}
    </>
  );
};

export default AboutMahal;
