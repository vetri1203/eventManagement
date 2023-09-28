import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import Cookies from "js-cookie";

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
      alert("login and try again..")
      navigate("/login");
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
      {cookiesData && (
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
                  <span>
                    <b>{data.MahalName}</b> <br />
                  </span>
                  <span>Price : {data.Amount}</span> <br />
                  <span>Seat : {data.NumberOfSeat}</span>
                  <button onClick={() => VewCard(data.Id)}>View more</button>
                </div>
              ))}
            </div>
          )}

          <div>
            <span>{error}</span>
            <span>{status}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
