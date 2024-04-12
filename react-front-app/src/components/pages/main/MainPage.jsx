import { useState, useEffect } from "react";

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
      <img src={"/react-logo.svg"} alt="react-logo" height={100} />
      <h3>Здарова, ребята</h3>
      <span>Время сейчас: {now.toLocaleTimeString()}</span>
    </>
  );
}
