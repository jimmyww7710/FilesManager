import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Popup from './Popup';
import { MdOutlineRemoveCircleOutline, MdPlayCircleFilled, MdOutlineSubject  } from 'react-icons/md';

const ListItem = ({item, deleteItemHandler}) => {
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState({id: null ,title: "", summary: ""});
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupId, setPopupId] = useState(null);

    useEffect(() => {

    }, []);

    const closePopup = () => setPopupOpen(false);

    const handleNavigateToDetails = (id) => {
        navigate(`/Details?id=${id}`);
      }
    
      const confirmPopup = async (id) => {
        setPopupOpen(true);
        setPopupId(id);
      };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/data");
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

  return (
    <div>
        <div key={item.id} className="bg-white mb-5 flex flex-wrap justify-between items-center p-4 rounded-lg shadow-sm shadow border">
            <div className="w-full flex justify-between mb-2">
            <span className="text-gray-700" >{item.date}</span>
            <div className="icons">
                <button
                className="text-blue-500 hover:text-blue-600 transition mr-2"
                >
                <MdPlayCircleFilled size={25}/>
                </button>
                <button
                onClick={() => handleNavigateToDetails(item.id)}
                className="text-blue-500 hover:text-blue-600 transition mr-2"
                >
                <MdOutlineSubject size={25}/>
                </button>
                <button
                onClick={() => confirmPopup(item.id)}
                className="text-red-500 hover:text-red-600 transition"
                >
                <MdOutlineRemoveCircleOutline size={25}/>
                </button>
            </div>
            </div>
            <div className="post-content">
            <p className="text-gray-700 text-xl font-bold">{item.content.title}</p>
            <span className="text-gray-700 text-base">{item.content.summary}</span>
            </div>
        </div>
        <Popup isOpen={isPopupOpen} popupId={popupId} closePopup={closePopup} callBack={deleteItemHandler} title={'Confirm to delete this item?'} />
    </div>
  );
};

export default ListItem;
