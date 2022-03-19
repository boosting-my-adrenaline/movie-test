import React, { useEffect, useRef, useState } from 'react'
import { useWindowSize } from '../../hooks/useDimensions'
import useElementSize from '../../hooks/useElementSize'
import useOnScreen from '../../hooks/useOnScreen'
import { genresArray } from '../../static/genresArray'
import { GenreCard } from './Genre.card'
import { MoviesArrow } from './Movies.arrow'
import './noscrollbar.css'

interface IProps {
  width: number
}

export const GenresSection: React.FC<IProps> = ({ width }) => {
  const ref: any = useRef<HTMLElement>(null)

  const genres = genresArray

  let columnWidth =
    width >= 1100
      ? (width - 20 * 3 - 80) / 4
      : width > 900
      ? (width - 20 * 2 - 80) / 3
      : width > 450
      ? 200
      : (width - 50) / 2

  let snap =
    width >= 1050
      ? `snap-start`
      : width > 900
      ? `snap-center`
      : width > 450
      ? `snap-none`
      : `snap-start`

  const scroll = (offset: number) => {
    ref.current.scrollLeft += offset
  }

  const handleLeftArrow = () => {
    scroll(-width)
  }

  const handleRightArrow = () => {
    scroll(width)
  }

  useEffect(() => {
    scroll(-width * 3)
  }, [width >= 450])

  const [ref2, { height: divHeight }] = useElementSize()
  const startRef: any = useRef()
  const endRef: any = useRef()

  const startOnScreen: boolean = useOnScreen<HTMLDivElement>(
    startRef,
    `${
      -0.8 *
      (width >= 1100
        ? (width - 20 * 3 - 80) / 4
        : width > 900
        ? (width - 20 * 2 - 80) / 3
        : width > 450
        ? 200
        : (width - 50) / 2)
    }px`
  )
  const endOnScreen: boolean = useOnScreen<HTMLDivElement>(
    endRef,
    `${
      -0.8 *
      (width >= 1050
        ? (width - 20 * 3 - 80) / 4
        : width > 700
        ? (width - 20 * 2 - 80) / 3
        : width > 450
        ? 280
        : width - 45)
    }px`
  )

  useEffect(() => {
    scroll(-width * 3)
  }, [width >= 450])

  const [hover, setHover] = useState(false)

  return (
    <>
      <div
        style={{ width: width }}
        className={` mt-[-8px] box-content flex w-full  items-stretch justify-between align-top`}
        ref={ref2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {width > 700 && (
          <MoviesArrow
            onClick={handleLeftArrow}
            disabled={startOnScreen || !hover}
            height={divHeight}
            pt={-8}
            width={width}
          />
        )}
        <ul
          className={`no-scrollbar grid h-full w-full snap-x snap-mandatory ${
            width > 700
              ? `scroll-pl-[40px] scroll-pr-[40px] pl-[40px]`
              : `scroll-pl-[20px] scroll-pr-[20px] pl-[20px]`
          } overflow-x-scroll scroll-smooth pt-[20px] pb-[30px] ${
            width < 700
          } ${
            width > 700 ? `pr-[40px]` : ` pr-[150px]`
          } transition duration-300 ease-in ${
            width >= 450 ? `gap-[20px]` : `gap-[10px]`
          }`}
          style={{
            gridTemplateColumns: `repeat(8, ${columnWidth}px) `,
          }}
          ref={ref}
        >
          <li className={`h-full ${snap} `} ref={startRef}>
            <GenreCard
              title={genres[0].genre}
              emoji={genres[0].emoji}
              background={genres[0].background}
              shadow={genres[0].shadow}
            />
          </li>

          {genres
            .filter((_, i) => i > 0 && i !== genres.length - 1)
            .map((genres, i) => (
              <li key={i} className={`h-full ${snap} `}>
                <GenreCard
                  title={genres.genre}
                  emoji={genres.emoji}
                  background={genres.background}
                  shadow={genres.shadow}
                />
              </li>
            ))}

          <li className={`h-full ${snap} `} ref={endRef}>
            <GenreCard
              key={200}
              title={genres[genres.length - 1].genre}
              emoji={genres[genres.length - 1].emoji}
              background={genres[genres.length - 1].background}
              shadow={genres[genres.length - 1].shadow}
            />
          </li>
        </ul>
        {width > 700 && (
          <MoviesArrow
            onClick={handleRightArrow}
            right
            first
            disabled={endOnScreen || !hover}
            height={divHeight}
            pt={-8}
            width={width}
          />
        )}
      </div>
    </>
  )
}
