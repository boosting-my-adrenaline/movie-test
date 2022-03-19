import React, { useState } from 'react'
import useElementSize from '../../hooks/useElementSize'

interface IProps {
  title: string
  description: string
  image: string
  onClick: () => void
}

export const MoviesCard: React.FC<IProps> = ({
  title,
  description,
  image,
  onClick,
}) => {
  const [hover, setHover] = useState(false)

  // const images = [g16, g15, g14, g13, g12, g11, g10, g9, g8, g7, g6]
  const [parentRef, { width }] = useElementSize()

  return (
    <div
      className={`font-UI  h-[100%] w-[100%] cursor-pointer px-[15p]`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={parentRef}
      onClick={onClick}
    >
      <div
        className={`relative z-[1] flex w-full overflow-hidden rounded-[8px] bg-black  transition-[background] duration-1000 ease-in`}
      >
        <img
          alt=""
          src={image}
          className={`aspect-[0.753] h-auto w-full rounded-[8px] object-cover transition duration-200 ease-in ${
            hover && `scale-[1.02] rounded-[10px] opacity-40`
          } `}
        />
        <div
          className={`absolute w-full  p-[16px] ${
            hover ? `opacity-100` : `opacity-0`
          } transition duration-300 ease-in-out`}
        >
          {' '}
          <span className={`text-[16px] font-[300] text-gray6`}>
            {description}
          </span>
        </div>
      </div>

      <div className={`pt-[17px]`}>
        <h2
          className={`text-[19.5px] leading-[26px] tracking-[0.15px] text-gray1`}
        >
          {title}
        </h2>
      </div>
    </div>
  )
}
