import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';
import { MdOutlineRemoveCircleOutline, MdPlayCircleFilled, MdOutlineSubject  } from 'react-icons/md';
import axios from "axios";
import { backendDomain } from '../util/variables';

const ListItem = ({item, deleteItemHandler}) => {
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState({id: null ,title: "", summary: ""});
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [popupId, setPopupId] = useState(null);

    useEffect(() => {

    }, []);

    const closePopup = () => setPopupOpen(false);

    const run = async (filePath) => {
      try {
        const response = await axios.post(`${backendDomain}api/run`, {filePath: filePath});
  
        // Handle response from backend
        console.log(response.data); // File path and name can be included in the response
        if (response.status === 200) {
         console.log('run filePath');
        }
        else {
          alert('run is not completed');
        }
        
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
  

    const handleNavigateToDetails = (id) => {
      navigate(`/Details?id=${id}`);
    }
    
    const confirmPopup = async (id) => {
      setPopupOpen(true);
      setPopupId(id);
    };

    const handleRunApp = (filePath = "") => {
      if (!filePath) {
        return;
      }
      run(filePath);
    }

  return (
    <div>
        <div key={item.id} className="bg-white mb-5 flex flex-wrap justify-between items-center p-4 rounded-lg shadow-sm shadow border">
            <div className="w-full flex justify-between mb-2">
            <span className="text-gray-700" >{item.date}</span>
            <div className="icons">
                <button
                onClick={() => handleRunApp(item.content?.fileTypeInfo?.script[0]?.filePath)}
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
            <div className="post-content flex gap-2">
              <div className="flex-shrink-0">
                {item?.content?.fileTypeInfo?.images[0]?.fileGenerateName && (
                  <img 
                    src={`${backendDomain}images/${item?.content?.fileTypeInfo?.images[0]?.fileGenerateName}`} 
                    alt="Dynamic Image"
                    className="mb-2 w-[300px] h-auto"
                  />
                )}
              </div>
              <div>
                <p className="text-gray-700 text-xl font-bold">{item.content.title}</p>
                <span className="text-gray-700 text-base overflow-hidden line-clamp-5">{item.content.summary}</span>
              </div>
            </div>
        </div>
        <Popup isOpen={isPopupOpen} popupId={popupId} closePopup={closePopup} callBack={deleteItemHandler} title={'Confirm to delete this item?'} />
    </div>
  );
};

export default ListItem;
