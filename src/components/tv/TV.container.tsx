import React from 'react'
import { useWindowSize } from '../../hooks/useDimensions'
import { mockedTv } from '../../static/mocked-tv'

export const TVContainer: React.FC = () => {
  const chanels = mockedTv

  const { width: windowWidth } = useWindowSize()

  const width = windowWidth > 1260 ? 1260 : windowWidth

  return (
    <div className={`flex w-[50%] justify-center pt-[24px]`}>
      <ul
        className={`flex h-[698px] w-full max-w-[1180px] snap-y snap-mandatory flex-col items-center gap-[16px] overflow-scroll px-[10px]`}
      >
        {chanels.map((chanel, i) => (
          <li
            key={i}
            className={`flex min-h-[162px] w-full max-w-[1180px] snap-start items-center gap-[2px] rounded-[8px] bg-gray6`}
          >
            <div
              className={`flex w-full min-w-[90px] max-w-[390px] shrink flex-col items-center justify-center gap-[10px] px-[5px]`}
            >
              <img
                src={chanel.image}
                className={`${width >= 700 ? `h-[60px]} ` : `h-[30px]`} `}
              />
              {width >= 700 || (
                <li
                  className={`mb-[6px] mt-[6px] flex  cursor-pointer flex-wrap justify-center text-center text-[12.5px] font-[500] tracking-[0.35px] text-gray1`}
                >
                  {chanel.title}
                </li>
              )}
            </div>
            <div
              className={`${width < 950 && `w-full flex-grow-[10]`}  pr-[10px]`}
            >
              <ul className={`flex flex-col gap-[7px] `}>
                {width >= 700 && (
                  <li
                    className={`mb-[6px] mt-[6px] cursor-pointer text-[19.5px] font-[500] tracking-[0.35px] text-gray1`}
                  >
                    {chanel.title}
                  </li>
                )}
                {chanel.shedule.map((program, i) => (
                  <li
                    key={program.time}
                    className={`flex gap-[20px] ${`${
                      width <= 600 && `text-[10px]`
                    }`}`}
                  >
                    <span className={`${i || `text-navred`}`}>
                      {program.time}
                    </span>
                    <span className={`${i || `text-navred`}`}>
                      {program.program}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
