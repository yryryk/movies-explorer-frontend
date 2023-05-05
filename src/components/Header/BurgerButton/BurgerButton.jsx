import './BurgerButton.css';
import { useState, useEffect, useRef } from 'react';
import ArrData1 from '../../../utils/constants/BurgerButtonArrData1';
import ArrData2 from '../../../utils/constants/BurgerButtonArrData2';

function BurgerButton({ width, height }) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [imageData, setImageData] = useState(null);
  const frameRate = 60;
  const headerAutorized = document.querySelector(".header-autorized");
  const headerOverlay = document.querySelector(".header-autorized__overlay");

  useEffect(() => {
    const canvas = canvasRef.current;
    setCtx(canvas.getContext('2d', { willReadFrequently: true }));
  }, []);

  useEffect(() => {
    ctx&&setImageData(ctx.getImageData(0, 0, width, height));
  }, [ctx, height, width]);

  useEffect(() => {
    if(imageData) {
      const data = imageData.data;
      data.fill(255);
      ArrData1[ArrData1.length-1].forEach((item)=>{
        const color = {r: 0, g: 0, b: 0};
        data[item] = color.r;
        data[item+1] = color.g;
        data[item+2] = color.b;
        data[item+3] = 255;
      })
      ctx.putImageData(imageData, 0, 0);
    }
  }, [ctx, imageData]);

  let countData = 0;
  function actionDraw(data, rate, ArrData) {
    setTimeout(()=> {
      if(ArrData.length > countData && action) {
        data.fill(255);
        ArrData[countData].forEach((item)=>{
          const color = {r: 0, g: 0, b: 0};
          data[item] = color.r;
          data[item+1] = color.g;
          data[item+2] = color.b;
          data[item+3] = 255;
        })
        countData++;
        ctx.putImageData(imageData, 0, 0);
        actionDraw(data, rate, ArrData)
      }else{
        countData = 0;
      }
    },1000/rate)
  }

  let action = false;
  let on = false;
  function handleActionClick() {
    const data = imageData.data;
    action = false;
    if(!on) {
      setTimeout(()=> {
        headerAutorized.classList.add("header-autorized_active");
        headerOverlay.classList.add("header-autorized__overlay_active");
        action = true;
        on = true;
        actionDraw(data, frameRate, ArrData2);
      },1000/frameRate)
    }else{
      setTimeout(()=> {
        headerAutorized.classList.remove("header-autorized_active");
        headerOverlay.classList.remove("header-autorized__overlay_active");
        action = true;
        on = false;
        actionDraw(data, frameRate, ArrData1);
      },1000/frameRate)
    }
  }

  return (
    <>
      <button aria-label="меню" type="button" className="burger-button" onClick={handleActionClick} >
        <canvas ref={canvasRef} width={width} height={height} />
      </button>
    </>
  );
}

export default BurgerButton;
