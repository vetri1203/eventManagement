import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
import Cookies from "js-cookie";


const Home = () => {
  const navigate = useNavigate()
  const location = useLocation();

const cookiesData = Cookies.get('tokenName');
  console.log(decode(cookiesData).Email);
  // const token = location.state.id;
  // console.log(decode(token).Email);


// console.log(location.state.id);
  const [Mahal, setMahal] = useState("");
  const [listOfMahal, setList] = useState([]);
  const [error, setError] = useState(null);


  const SearchSubmit = async (e) => {
    e.preventDefault();
    console.log(Mahal);
    try {
      const response = await axios.post(`http://localhost:8081/search`, {
        Mahal,
      });

      if (response.data) {
        setList(response.data);
        setError(null);
      } else {
        console.log(response);
        setList([]);
        setError("No Mahals found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    }
  };

  const handleSearch = (e) => {
    setMahal(e.target.value);
  };

  const VewCard =(id)=>{
    console.log(id);
    navigate('/about',{state:{id}})
  }

  return (
    <>
      <div className="HomeContaier">
        <form action="post" onSubmit={SearchSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={Mahal}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>

        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="listContainer">
            {listOfMahal.map((data, i) => (
              <div key={i}>
                <span >
                  <b>{data.MahalName}</b> <br />
                </span>
                <span >
                 Price : {data.Amount}
                </span > <br />
                <span >
                  Seat : {data.NumberOfSeat}
                </span> 

                <button   onClick={()=>VewCard(data.Id)}>View more</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
