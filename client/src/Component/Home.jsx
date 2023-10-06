import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import Cookies from "js-cookie";
import './Style/Home.css';
import MainImage from '../Component/Images/homeimage1.png';

const Home = () => {
  const navigate = useNavigate();

  const [Mahal, setMahal] = useState("");
  const [listOfMahal, setList] = useState([]);
  const [error, setError] = useState(null);
  const [status,setStatus] = useState();
  const [Data, setData] = useState({
    isLoading: false,
    isData: undefined,
  });

  const cookiesData = Cookies.get("tokenName");

  useEffect(() => {
    if (!cookiesData) {

      console.log("home");
      alert("login and try again..");
      navigate("/login");
      return;
    } else {
      console.log(decode(cookiesData).Email);
    }

    if(setData.isLoading)
    {
      setStatus('Loading.....')
    }
    else{
      setStatus('');
    }
  }, [navigate, cookiesData,setData.isLoading]);
  const SearchSubmit = async (e) => {
    e.preventDefault();
    console.log(Mahal);
    setData((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await axios.post(`http://localhost:8081/search`, {
        Mahal,
      });

      if (response.data) {
        setData((prev) => ({
          ...prev,
          isLoading: false,
          isData: response.data,
        }));

        setList(response.data);
        setError(null);
      } else {
        setData((prev) => ({ ...prev, isLoading: false }));
        console.log(response);
        setList([]);

        setError("No Mahals found.");
        return (
          <>
            <span>{Data}</span>
          </>
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    }
  };

  const handleSearch = (e) => {
    setMahal(e.target.value);
  };

  const VewCard = (id) => {
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
        <img src={MainImage} alt="mainimg" className="imagecontainer"/>
      </div>
      <div className="aboutContainer">
        <div className="aboutContent">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea expedita, officia, ut facere quisquam quibusdam voluptas tempore, fugit velit eveniet accusantium distinctio. Doloribus id consequatur a incidunt maxime nihil aliquam.</p>
        </div>
        <div className="buttonAbout">
          <button className="AboutUsBtn">About Us</button>
        </div>
      </div>
    </div>

      {cookiesData && (
      <div className="searchContainer">
        <div className="HomeContaier">
          <form action="post" onSubmit={SearchSubmit} className="formSearch">
            <input
              type="text"
              placeholder="Search Marriage Mahal"
              value={Mahal}
              onChange={handleSearch}
            />
            <button type="submit" className="searchbtn">Search</button>
          </form>

          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="listContainer">
              {listOfMahal.map((data, i) => (
                <div key={i}>
                  <span className="mahalname">
                    <b>{data.MahalName}</b> <br />
                  </span>
                  <span className="mahalamount">Price : {data.Amount}</span> <br />
                  <span className="mahalSeats">Seat : {data.NumberOfSeat}</span>
                  <button onClick={() => VewCard(data.Id)} className="viewmorebtn">View more</button>
                </div>
              ))}
            </div>
          )}

          <div>
            <span>{error}</span>
            <span>{status}</span>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default Home;


