import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const AboutMahal = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cookiesData = Cookies.get("tokenName");

  const [responseData, setResponseData] = useState({});
  const [bookingStatus, setBookingStatus] = useState(null);
  const selectedDate = new Date(location.state.date).toISOString();
  const selectedDistrict = location.state.district;

  const handleConfirm = async () => {
    const userId = decode(cookiesData).Email;
    const mahalId = location.state.id;

    if (!userId || !selectedDate || !mahalId) {
      console.error("User ID, selected date, or Mahal ID is missing.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8082/booking", {
        MahalId: mahalId,
        UserName: userId,
        SelectedDate: selectedDate,
      });

      console.log("Booking response:", response.data);
      setBookingStatus("Booking Successful!");
    } catch (error) {
      console.error("Error booking Mahal:", error);
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
    if (!cookiesData) {
      console.log("no user");
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
          <div>
            <span className="mahalName">
              Mahal Name: {responseData.MahalName}
            </span>
          </div>
          <div>
            <span>Seat Capacity: {responseData.NumberOfSeat}</span>
          </div>
          <div>
            <span>Rooms: {responseData.Rooms}</span>
          </div>
          <div>
            <span>Mahal Type: {responseData.MahalType}</span>
          </div>
          <div>
            <span>Amount: {responseData.Amount}</span>
          </div>
          <div>
            <span>Parking: {responseData.Parking}</span>
          </div>
          <div>
            <span>Place: {responseData.Place}</span>
          </div>
          <div>
            <span>About: {responseData.About}</span>
          </div>
          {bookingStatus && <p>{bookingStatus}</p>}

          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </>
  );
};

export default AboutMahal;
