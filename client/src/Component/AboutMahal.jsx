import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AboutMahal = () => {
  const location = useLocation();
  console.log(location.state.id);
  const id = location.state.id;

  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
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
  }, [id]);

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default AboutMahal;
