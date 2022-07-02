import Link from "next/link";
import { useRef, useState } from "react";

export default function Form({ data }) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const handleChangeFrom = (e) => {
    setFrom(e.target.value);
  };
  const handleChangeTo = (e) => {
    setTo(e.target.value);
  };

  return (
    <div>
      <form action="">
        <div>From: </div>
        <input onChange={handleChangeFrom} type="text" />
        <div>To: </div>
        <input onChange={handleChangeTo} type="text" />
        <Link href={`/${from}&${to}`}>
          <button>Submit</button>
        </Link>
      </form>
      <div>{data}</div>
    </div>
  );
}
