import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from "axios";
import { MdOutlineAddCircleOutline  } from 'react-icons/md';

import ListItem from '../component/ListItem';

const App = () => {
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [newItem, setNewItem] = useState({title: "", summary: ""});
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const addItem = async () => {
    const id = Date.now().toString(); // Simple unique ID
    try {
      const currentDate = getFormattedDate();
      const response = await axios.post("http://localhost:5000/api/data", { id, content: newItem, date: currentDate });
      setData([...data, response.data]);
      setNewItem("");
    } catch (error) {
      console.error("Error adding item", error);
    }

    function getFormattedDate() {
      const now = new Date();

      // 取得年份、月份、日期
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以要 +1
      const date = String(now.getDate()).padStart(2, '0');

      // 取得小時和分鐘
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');

      // AM/PM 判斷
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12; // 將 24 小時制轉為 12 小時制，且避免 0 點顯示為 0

      // 格式化時間字串
      return `${year}-${month}-${date} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/data/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleTitleChange = (event) => {
    setNewItem(preItem => ({...preItem, title: event.target.value}));
  };

  const handleSummaryChange = (event) => {
    setNewItem(preItem => ({...preItem, summary: event.target.value}));
  };

  return (
      <div className="min-h-screen bg-gray-100 flex flex-col p-5 items-center" >
        <h1 className="text-3xl font-bold text-gray-800 mb-5">Files Manager</h1>
        <section className="w-[60%]">
          <div className="flex space-x-3 mb-5">
            <div className="basic-post-settings w-[80%]">
              <input
                value={newItem.title || ''}
                type="text"
                onChange={handleTitleChange}
                className="w-full h-16 mb-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Add Title"
              />
              <textarea
                value={newItem.summary || ''}
                onChange={handleSummaryChange}
                placeholder="Add Summary"
                className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
              </textarea>
            </div>
            <button
              onClick={addItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition flex-grow flex justify-center items-center"
            >
              <MdOutlineAddCircleOutline size={30} />
            </button>
          </div>
          <label htmlFor="">filter: </label>
          <input
            type="text"
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="keyword"
            className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-300"
          />
          <div className="w-full mt-5 divide-gray-200">
            {data.filter(item => {
              return item?.content?.title.includes(filterText) || item?.content?.title.includes(filterText) || filterText === ""
            }).map((item, index) => (
              <ListItem key={index} item={item} deleteItemHandler={deleteItem}/>
            ))}
          </div>
        </section>
      </div>
  );
};

export default App;
