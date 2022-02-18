/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-09-17 16:06:56
 * @LastEditors: camus
 * @LastEditTime: 2022-02-12 11:02:02
 */
import { RedoOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { VerifyWrapper } from "./styles";
import { IVerifyProp } from "./types";
import { getRandomNumberByRange, square, sum } from "./utils";

const Verify: React.FC<IVerifyProp> = ({
  width = 320,
  height = 160,
  l = 42,
  r = 9,
  imgUrl,
  text,
  refreshIcon = "http://yourimgsite/icon.png",
  visible = true,
  onSuccess,
  onFail,
  onRefresh,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [sliderLeft, setSliderLeft] = useState(0);
  const [sliderClass, setSliderClass] = useState("sliderContainer");
  const [textTip, setTextTip] = useState(text);
  const canvasRef = useRef<any>(null);
  const blockRef = useRef<any>(null);
  const imgRef = useRef<any>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const trailRef = useRef<number[]>([]);
  const originXRef = useRef<number>(0);
  const originYRef = useRef<number>(0);
  const xRef = useRef<number>(0);
  const yRef = useRef<number>(0);
  const PI = Math.PI;
  const L = l + r * 2 + 3; // 滑块实际边长

  // eslint-disable-next-line
  const drawPath = (ctx: any, x: number, y: number, operation: "fill" | "clip") => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
    ctx.lineTo(x + l, y);
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
    ctx.lineTo(x + l, y + l);
    ctx.lineTo(x, y + l);
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.stroke();
    ctx.globalCompositeOperation = "destination-over";
    operation === "fill" ? ctx.fill() : ctx.clip();
  };

  const getRandomImgSrc = () => {
    return (
      imgUrl || `https://picsum.photos/id/${getRandomNumberByRange(0, 1084)}/${width}/${height}`
    );
  };
  const createImg = (onload: () => void) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = onload;
    img.onerror = () => {
      (img as any).setSrc(getRandomImgSrc()); // 图片加载失败的时候重新加载其他图片
    };

    (img as any).setSrc = (src: string) => {
      const isIE = window.navigator.userAgent.indexOf("Trident") > -1;
      if (isIE) {
        // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
        const xhr = new XMLHttpRequest();
        xhr.onloadend = function (e: any) {
          const file = new FileReader(); // FileReader仅支持IE10+
          file.readAsDataURL(e.target.response);
          file.onloadend = function (e) {
            img.src = e?.target?.result as string;
          };
        };
        xhr.open("GET", src);
        xhr.responseType = "blob";
        xhr.send();
      } else img.src = src;
    };

    (img as any).setSrc(getRandomImgSrc());
    return img;
  };

  const draw = (img: HTMLImageElement) => {
    const canvasCtx = !!canvasRef && canvasRef.current.getContext("2d");
    const blockCtx = !!blockRef && blockRef.current.getContext("2d");

    // 随机位置创建拼图形状
    xRef.current = getRandomNumberByRange(L + 10, width - (L + 10));
    yRef.current = getRandomNumberByRange(10 + r * 2, height - (L + 10));
    drawPath(canvasCtx, xRef.current, yRef.current, "fill");
    drawPath(blockCtx, xRef.current, yRef.current, "clip");

    // 画入图片
    canvasCtx.drawImage(img, 0, 0, width, height);
    blockCtx.drawImage(img, 0, 0, width, height);

    // 提取滑块并放到最左边
    const y1 = yRef.current - r * 2 - 1;
    const ImageData = blockCtx.getImageData(xRef.current - 3, y1, L, L);
    blockRef.current.width = L;
    blockCtx.putImageData(ImageData, 0, y1);
  };

  const initImg = () => {
    const img = createImg(() => {
      setLoading(false);
      draw(img);
    });
    imgRef.current = img;
  };

  const reset = () => {
    const canvasCtx = canvasRef.current.getContext("2d");
    const blockCtx = blockRef.current.getContext("2d");
    // 重置样式
    setSliderLeft(0);
    setSliderClass("sliderContainer");
    blockRef.current.width = width;
    blockRef.current.style.left = 0 + "px";

    // 清空画布
    canvasCtx.clearRect(0, 0, width, height);
    blockCtx.clearRect(0, 0, width, height);

    // 重新加载图片
    setLoading(true);
    imgRef.current.setSrc(getRandomImgSrc());
  };

  const handleRefresh = () => {
    reset();
    typeof onRefresh === "function" && onRefresh();
  };

  const verify = () => {
    const arr = trailRef.current; // 拖动时y轴的移动距离
    const average = arr.reduce(sum) / arr.length;
    const deviations = arr.map((x) => x - average);
    const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);

    const left = parseInt(blockRef?.current?.style?.left, 10);
    return {
      spliced: Math.abs(left - xRef.current) < 10,
      verified: stddev !== 0, // 简单验证拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
    };
  };

  const handleDragStart = function (e: any) {
    originXRef.current = e.clientX || e.touches[0].clientX;
    originYRef.current = e.clientY || e.touches[0].clientY;
    isMouseDownRef.current = true;
  };

  const handleDragMove = (e: any) => {
    if (!isMouseDownRef.current) return false;
    e.preventDefault();
    const eventX = e.clientX || e.touches[0].clientX;
    const eventY = e.clientY || e.touches[0].clientY;
    const moveX = eventX - originXRef.current;
    const moveY = eventY - originYRef.current;
    if (moveX < 0 || moveX + 38 >= width) return false;
    setSliderLeft(moveX);
    const blockLeft = ((width - 40 - 20) / (width - 40)) * moveX;
    blockRef.current.style.left = blockLeft + "px";

    setSliderClass("sliderContainer sliderContainer_active");
    trailRef.current.push(moveY);
  };

  const handleDragEnd = (e: any) => {
    if (!isMouseDownRef.current) return false;
    isMouseDownRef.current = false;
    const eventX = e.clientX || e.changedTouches[0].clientX;
    if (eventX === originXRef.current) return false;
    setSliderClass("sliderContainer");
    const { spliced, verified } = verify();
    if (spliced) {
      if (verified) {
        setSliderClass("sliderContainer sliderContainer_success");
        typeof onSuccess === "function" && onSuccess();
      } else {
        reset();
        setSliderClass("sliderContainer sliderContainer_fail");
        setTextTip("请再试一次");
      }
    } else {
      setSliderClass("sliderContainer sliderContainer_fail");
      typeof onFail === "function" && onFail();
      setTimeout(() => {
        reset();
      }, 1000);
    }
  };

  useEffect(() => {
    if (visible) {
      imgRef.current ? reset() : initImg();
    }
  }, [visible]);

  return (
    <VerifyWrapper
      className="vertifyWrap"
      style={{
        width: width + "px",
        margin: "0 auto",
        display: visible ? "" : "none",
      }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="canvasArea">
        <canvas ref={canvasRef} width={width} height={height} />
        <canvas
          ref={blockRef}
          className="block"
          width={width}
          height={height}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
      </div>
      <div
        className={sliderClass}
        style={{
          pointerEvents: isLoading ? "none" : "auto",
          width: width + "px",
        }}
      >
        <div className="sliderMask" style={{ width: sliderLeft + "px" }}>
          <div
            className="slider"
            style={{ left: sliderLeft + "px" }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            <div className="sliderIcon">&rarr;</div>
          </div>
        </div>
        <div className="sliderText">{textTip}</div>
      </div>
      {/* <RedoOutlined onClick={handleRefresh} /> */}
      <div
        className="refreshIcon"
        onClick={handleRefresh}
        style={{ backgroundImage: `url(${refreshIcon})` }}
      />
      <div
        className="loadingContainer"
        style={{
          width: width + "px",
          height: height + "px",
          display: isLoading ? "" : "none",
        }}
      >
        <div className="loadingIcon" />
        <span>加载中...</span>
      </div>
    </VerifyWrapper>
  );
};

export default Verify;
