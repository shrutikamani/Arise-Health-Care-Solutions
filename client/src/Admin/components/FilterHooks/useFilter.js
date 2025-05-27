// import { useState, useEffect } from "react";

// const useFilter = (data = [], keys = []) => {
//   const [filteredData, setFilteredData] = useState(data);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (!searchTerm) {
//       setFilteredData(data);
//     } else {
//       const lower = searchTerm.toLowerCase();
//       const result = data.filter(item =>
//         keys.some(key =>
//           String(item[key]).toLowerCase().includes(lower)
//         )
//       );
//       setFilteredData(result);
//     }
//   }, [searchTerm, data, keys]);

//   return { filteredData, setSearchTerm };
// };

// export default useFilter;
