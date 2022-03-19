import React, { useEffect, useRef, useState } from 'react'
import { IMovie } from '../../App'
import useElementSize from '../../hooks/useElementSize'
import useOnScreen from '../../hooks/useOnScreen'
import { MoviesArrow } from './Movies.arrow'
import { MoviesCard } from './Movies.card'
import './noscrollbar.css'

interface IProps {
  width: number
  filter: string
  movies: IMovie[]
  openMovie: (movie: number) => void
}

export const MoviesSection: React.FC<IProps> = ({
  width,
  filter,
  movies,
  openMovie,
}) => {
  const ref: any = useRef<HTMLElement>(null)

  const movieCards = movies.filter((movie) => {
    if (!filter) {
      return movie
    } else {
      if (movie.title.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
        return movie
      }
    }
  })

  let columnWidth =
    width >= 1050
      ? (width - 20 * 3 - 80) / 4
      : width > 700
      ? (width - 20 * 2 - 80) / 3
      : width > 450
      ? 280
      : width - 45

  let snap =
    width >= 1050
      ? `snap-start`
      : width > 700
      ? `snap-center`
      : width > 450
      ? `snap-none`
      : `snap-center`

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
      (width >= 1050
        ? (width - 20 * 3 - 80) / 4
        : width > 700
        ? (width - 20 * 2 - 80) / 3
        : width > 450
        ? 280
        : width - 45)
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
        className={` mt-[-8px] box-content flex w-full flex-col items-stretch justify-between align-top`}
        ref={ref2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {width > 700 && movieCards.length > 3 && (
          <MoviesArrow
            onClick={handleLeftArrow}
            disabled={startOnScreen || !hover}
            height={divHeight}
            pt={-20}
            width={width}
          />
        )}
        {!!movieCards.length || (
          <div
            className={` w-full py-[20px] text-center text-[20px] text-gray1`}
          >
            По вашему запросу ничего не найдено
          </div>
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
            gridTemplateColumns: `repeat(9, ${columnWidth}px) `,
          }}
          ref={ref}
        >
          <li className={`h-full ${snap} `} ref={startRef}>
            {movieCards.length > 0 && (
              <MoviesCard
                key={0}
                title={movieCards[0].title}
                description={movieCards[0].description}
                image={movieCards[0].image}
                onClick={() => openMovie(0)}
              />
            )}
          </li>

          {movieCards
            .filter((_, i) => i > 0 && i !== movieCards.length - 1)
            .map((movies, i) => (
              <li key={i} className={`h-full ${snap} `}>
                <MoviesCard
                  title={movies.title}
                  description={movies.description}
                  image={movies.image}
                  onClick={() => openMovie(i + 1)}
                />
              </li>
            ))}

          {movieCards.length > 1 && (
            <li className={`h-full ${snap} `} ref={endRef}>
              <MoviesCard
                key={200}
                title={movieCards[movieCards.length - 1].title}
                description={movieCards[movieCards.length - 1].description}
                image={movieCards[movieCards.length - 1].image}
                onClick={() => openMovie(movieCards.length - 1)}
              />
            </li>
          )}
        </ul>
        {width > 700 && movieCards.length > 3 && (
          <MoviesArrow
            onClick={handleRightArrow}
            right
            first
            disabled={endOnScreen || !hover}
            height={divHeight}
            pt={-20}
            width={width}
          />
        )}
      </div>
    </>
  )
}
