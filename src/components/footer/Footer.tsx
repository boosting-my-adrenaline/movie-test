import React from 'react'
const Vector2 = require('../../static/Vector2.png')

export const Footer: React.FC = () => {
  return (
    <div className={`mt-[40px] flex  w-full justify-center bg-gray6`}>
      <footer className={`flex w-full max-w-[1400px] justify-center  p-[20px]`}>
        <div className={`flex w-full max-w-[1180px] gap-[40px]`}>
          <a className={`mt-[10px]`}>
            <img alt="htc-cs.ru" src={Vector2} />
          </a>
          <div
            className={`text-[15.5px] font-[300] tracking-[0.42px] text-gray1 `}
          >
            <p className={` `}>
              426057, Россия, Удмуртская Республика, г. Ижевск, ул. Карла
              Маркса, 246 (ДК «Металлург»)
            </p>
            <p>+7 (3412) 93-88-61, 43-29-29</p>
            <div className={`mt-[6px]`}>
              <a className={` font-[500] text-[#1F4766]`}>htc-cs.ru</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
