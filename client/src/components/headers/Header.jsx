// import { useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addUser } from "../Redux/Userslice";

export const Header = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.credentials.isLogged);
  console.log("Checking whether the user is logged in or not", isLogged);

  const logoutFunction = async (req, res) => {
    await axios.get("http://localhost:3000/api/v1/user/logout");
    localStorage.clear();
    dispatch(addUser({ isLogged: false, isAdmin: false }));
  };

  return (
    <div>
      <div className="px-20 mt-5 py-5 flex justify-between border-b-2 shadow-inherit">
        <div className="text-4xl font-extrabold cursor-pointer">30DC SHOP</div>
        <div className="flex ">
          <div className="mx-10 font-normal cursor-pointer">PRODUCTS</div>
          {isLogged ? (
            <button className="mx-10 cursor-pointer flex flex-col">CART</button>
          ) : (
            <button className="mx-10 cursor-pointer flex flex-col">
              LOGIN
            </button>
          )}
          <button className="flex flex-col" onClick={logoutFunction}>
            LOGOUT
          </button>
        </div>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
