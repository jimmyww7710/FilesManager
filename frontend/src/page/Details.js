import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


const Details = () => {
   const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // replace 'paramName' with the actual query param name
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/data/${id}`);
      console.log(response.data)
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const UpdateData = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/data/${id}`, data);
      if (response.status === 200) {
        alert('updated successfully');
        setIsEdit(false);
      }
      else {
        alert('update process is not completed');
      }
      
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const getFileInfo = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/fileInfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response from backend
      console.log(response.data); // File path and name can be included in the response
      if (response.status === 200) {
        setData((preData) => ({...preData, 
          content: {
            ...preData.content,
            filePath: response.data.filePath,
            fileName: response.data.fileName
          }
        }));
      }
      else {
        alert('getInfo is not completed');
      }
      
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleTitleChange = (e) => {
    setData((preData) => ({...preData, 
      content: {
        ...preData.content,
        title: e.target.value
      }
    }));
  }

  const handleSummaryChange = (e) => {
    setData((preData) => ({...preData, 
      content: {
        ...preData.content,
        summary: e.target.value
      }
    }));
  }

  const handleDescriptionChange = (e) => {
    setData((preData) => ({...preData, 
      content: {
        ...preData.content,
        description: e.target.value
      }
    }));
  }

  const handleFilePathChange = async(e) => {
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append('file', file);
    getFileInfo(formData);
  }

  const handleSave = () => {
    UpdateData();
  }
 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-5 items-center">
      <div className="w-[60%]">
      <div className="flex">
            {!isEdit && <>
              <button
            className="mr-2 mb-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
            PLAY
            </button>
            <button
            onClick={() => {setIsEdit(true)}}
            className="mr-2 mb-5 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-300"
            >
            EDIT
            </button>
            <button
            onClick={() => {navigate(`/`)}}
            className="mr-2 mb-5 border-2 border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
            Back To List
            </button>
            </>}
      </div>
      
        {data?.imgUrl && <img 
          src={data?.content?.imgUrl || ''}
          alt="Placeholder Image" 
          className="w-40 h-40 rounded-full shadow-lg" 
        />}


        {isEdit && <input
          value={data?.content?.title || ''}
          type="text"
          onChange={handleTitleChange}
          className="w-full h-16 mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="img url"
        />}

        {!isEdit && <p className="mb-5">{data?.content?.title || ''}</p>}

        {isEdit && <textarea
          value={data?.content?.summary || ''}
          onChange={handleSummaryChange}
          placeholder="Add Summary"
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        </textarea>}

        {!isEdit && <div className="mb-5">{data?.content?.summary || ''}</div>}


        {isEdit && <textarea
          value={data?.content?.description || ''}
          onChange={handleDescriptionChange}
          placeholder="Add Description"
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
        </textarea>}

        {!isEdit && <div className="mb-5">{data?.content?.description || ''}</div>}

        {/* <input type="file" id="fileInput"></input> */}

        {isEdit && <input
          type="file" 
          value={data?.content?.filePath || ''}
          onChange={handleFilePathChange}
          placeholder="select file path"
          className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />}

        {!isEdit && <div className="mb-5">{data?.content?.filePath || ''}</div>}

        <p>Selected file: {data?.content?.fileName}</p>
     
        <div className="flex justify-center">
          {isEdit && 
            <>
            <button 
            onClick={handleSave}
            className="mr-2 mb-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
              SAVE
            </button>
            <button 
            onClick={() => {setIsEdit(false)}}
            className="mr-2 mb-5 border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:border-red-700 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-300">
              CANCEL
            </button>
            </>
          }
        </div>

        
        </div>
    </div>
  );
};

export default Details;
