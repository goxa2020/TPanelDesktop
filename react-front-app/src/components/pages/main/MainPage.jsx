import { useState, useEffect } from "react";
import logo from "../../../logo.svg";

export default function MainPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <img src={logo} alt="logo" height={100} />
      <h3>Здарова, петушары</h3>
      <span>Время сейчас: {now.toLocaleTimeString()}</span>
    </>
  );
}
