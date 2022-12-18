import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataConsumer = createContext();

export default function DataProvider(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://quran-api-id.vercel.app/surahs")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <DataConsumer.Provider value={[data, setData]}>
      {props.children}
    </DataConsumer.Provider>
  );
}
