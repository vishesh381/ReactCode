import { useState } from "react";
import ChildUser from './ChildUser';

export default function ParentUser() {
  const [data, setData] = useState([]);

  const handleUserData = (newData) => {
    setData([...data, newData]); // ✅ corrected
  };

  return (
    <>
      <div>User data received from Child:</div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre>  */}
      <ul>
  {data.map((user, index) => (
    <li key={index}>
      {Object.entries(user).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
    </li>
  ))}
</ul>

      <ChildUser onSubmitData={handleUserData} />
    </>
  );
}
