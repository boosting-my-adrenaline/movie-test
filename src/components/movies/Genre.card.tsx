import React, { useState } from 'react'
import { useWindowSize } from '../../hooks/useDimensions'
import useElementSize from '../../hooks/useElementSize'

interface IProps {
  title: string
  background: string
  shadow: string
  emoji: string
}

export const GenreCard: React.FC<IProps> = ({
  title,
  background,
  shadow,
  emoji,
}) => {
  const [hover, setHover] = useState(false)

  const { width } = useWindowSize()

  return (
    <div
      className={`  h-[100%] w-[100%] cursor-pointer px-[15p]`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`relative z-[1] flex w-full overflow-hidden rounded-[6px] bg-black  transition-[background] duration-1000 ease-in`}
      >
        <img
          alt=""
          src=""
          className={`aspect-[1.3373] h-auto w-full rounded-[6px] object-cover transition duration-200 ease-in ${
            hover && `scale-[1.02] rounded-[10px] opacity-40`
          } `}
        />

        <div
          className={`absolute flex h-full w-full flex-col items-center ${
            width >= 1170 ? `pt-[16px]` : width >= 900 ? `pt-[5px]` : `pt-[3px]`
          } transition duration-300 ease-in-out`}
          style={{
            background: background,
            boxShadow: shadow,
          }}
        >
          <h1
            className={`${
              width >= 1170
                ? `pt-[55px]`
                : width >= 500
                ? `pt-[12%]`
                : `pt-[1%px]`
            } text-[48px]`}
          >
            {emoji}
          </h1>
          <div
            className={` ${
              width >= 1170
                ? `pt-[17px]`
                : width >= 900
                ? `pt-[5px]`
                : `pt-[3px]`
            }`}
          >
            <h1
              className={`text-[19.5px] leading-[26px] tracking-[0.15px] text-white`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
