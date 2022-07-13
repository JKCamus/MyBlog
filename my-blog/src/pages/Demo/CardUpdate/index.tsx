import React, { useEffect, useState } from "react";
import NoticeCard from "./components/NoticeContainer";
import classNames from "classnames";
import { Msg } from "./type";
import { Button } from "antd";

interface IProps {
  className?: string;
}
const Notice: React.FC<IProps> = ({ className }) => {
  const cls = classNames(className);
  const [currentMsg, setCurrentMsg] = useState<Msg>();
  const [fakeMsg, setFakeMsg] = useState<Msg[]>([]);
  const [msg, setMsg] = useState<Msg[]>([]);
  const [count, setCount] = useState([{ id: 0 }]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCounter(1);
    }, 1000);
  }, []);

  useEffect(() => {
    setMsg((pre) => [currentMsg, ...pre]);
  }, [currentMsg]);

  const getData = (count: number) => {
    const data = {
      id: count++,
      name: `${count}-name`,
      count: count++,
    };
    return data;
  };

  const closeCard = () => {};

  const moveTop = () => {};
  const replaceTop = () => {};
  function throttle(func, delay = 300) {
    let flag = true;
    return (...args) => {
      if (!flag) return;
      flag = false;
      setTimeout(() => {
        func.apply(this, args);
        flag = true;
      }, delay);
    };
  }
  // let timeHandle = null;
  const startTest = () => {
    let ids = count[count.length - 1].id;

    setCount((pre) => [...pre, { id: (ids += 1) }]);
  };
  console.log("count", count);
  return (
    <div>
      <Button onClick={throttle(startTest)}>Start</Button>

      {count.map((item) => item.id + "---")}
    </div>
  );
};
export default Notice;
