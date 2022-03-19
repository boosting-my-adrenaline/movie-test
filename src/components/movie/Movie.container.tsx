import React, { useState } from 'react'
import { IMovie } from '../../App'

interface IMovieProps {
  movie: IMovie | null
  width: number
  closeMovie: () => void
  coms: { author: string; text: string }[] | null
  addComment: (text: string) => void
  deleteComment: (i: number) => void
}

export const MovieContainer: React.FC<IMovieProps> = ({
  movie,
  width,
  closeMovie,
  coms,
  addComment,
  deleteComment,
}) => {
  const [inputValue, setInputValue] = useState(``)

  const submit = () => {
    addComment(inputValue)
    setInputValue('')
  }
  if (movie && coms) {
    return (
      <div className={`flex w-[50%] shrink-0 flex-col items-center pt-[40px]`}>
        <div className={`flex w-full  pt-[10px]`}>
          <div
            className={`mt-[-2px] flex h-[40px] w-full  flex-shrink items-center justify-center bg-white ${
              width >= 1200
                ? `max-w-[230px] p-[0_8px_0_45px]`
                : `max-w-[50px] p-[0_5px_0_7px]`
            } pt-[8px]`}
          >
            <button onClick={closeMovie}>
              <svg
                className={`rotate-[-180deg] stroke-navred`}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                // height="9"
                width="32"
              >
                <path
                  style={{
                    fill: '#fff',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeWidth: 44,
                  }}
                  d="M174.02 91.26 338.5 255.74l-165 165"
                />
              </svg>
            </button>
          </div>

          <div
            className={`relative z-[1] flex w-full ${
              width >= 1200
                ? `max-h-[370px]  max-w-[280px]`
                : width >= 900
                ? `max-h-[310px]  max-w-[200px]`
                : `max-h-[240px] max-w-[160px]`
            }  flex-shrink-0 overflow-hidden rounded-[8px]  bg-black transition-[background] duration-1000 ease-in`}
          >
            <img
              alt=""
              src={movie?.image}
              className={`aspect-[0.753] h-auto w-full rounded-[8px] object-cover`}
            />
          </div>

          <div
            className={`flex w-full flex-grow flex-col gap-[10px]  ${
              width >= 1200
                ? `p-[0_240px_0_120px]`
                : width >= 900
                ? `p-[0_70px]`
                : `p-[0_20px]`
            } text-[15.5px] tracking-[0.4px] text-gray1`}
          >
            <div
              className={` items-center ${
                width >= 600
                  ? `grid grid-cols-[100px_auto]`
                  : `flex flex-col text-center `
              }`}
            >
              <span className={``}>Название:</span>{' '}
              <span
                className={`${
                  width >= 600 ? `text-[19.5px] ` : `text-[16px]`
                } font-[500]`}
              >
                {movie?.title}
              </span>
            </div>

            <div
              className={` items-center ${
                width >= 600
                  ? `grid grid-cols-[100px_auto]`
                  : `flex flex-col text-center `
              }`}
            >
              <span className={``}>Страна:</span>{' '}
              <span className={width >= 600 ? `text-[19.5px] ` : `text-[16px]`}>
                {movie?.country}
              </span>
            </div>

            <div
              className={` items-center ${
                width >= 600
                  ? `grid grid-cols-[100px_auto]`
                  : `flex flex-col text-center`
              }`}
            >
              <span className={``}>Жанр:</span>{' '}
              <span className={width >= 600 ? `text-[19.5px] ` : `text-[16px]`}>
                {movie?.genre}
              </span>
            </div>
            {width >= 600 && (
              <div className={`mt-[8px]`}>
                <span>{movie?.description}</span>
              </div>
            )}
          </div>
        </div>
        {width >= 600 || (
          <div className={`mt-[18px] px-[20px] text-[12px] font-[300]`}>
            <span>{movie?.description}</span>
          </div>
        )}

        <div>
          <h1 className={`mt-[47px] text-[20px] font-[500] text-gray1`}>
            Комментарии
          </h1>
        </div>

        <div
          className={`mt-[22px] ${
            width >= 1200 ? `grid grid-cols-nav` : `flex flex-col items-end`
          }  items-start gap-[16px] px-[10px]`}
        >
          {width >= 1200 && <div />}
          <div
            className={` w-full max-w-[780px] flex-grow`}
            style={{ width: width >= 780 ? 780 : width - 20 }}
          >
            <textarea
              className={`w-full resize-none rounded-[8px] bg-navred/[.15] p-[16px] text-gray1 outline-none placeholder:text-navred`}
              value={inputValue}
              placeholder={`Введите комментарий...`}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <button
            className={`rounded-[4px] bg-navred p-[7px_33.5px] text-[15.5px] font-[500] text-white`}
            onClick={submit}
          >
            Опубликовать
          </button>
        </div>
        <ul
          className={`mt-[16px] flex w-full flex-col items-center gap-[16px] px-[10px]`}
        >
          {coms?.map((com, i) => (
            <li
              key={i}
              className={`flex w-full max-w-[780px]  flex-col rounded-[8px] bg-gray6  p-[16px] text-[15.5px] leading-[19px] tracking-[0.4px] text-gray1`}
            >
              <div className={`flex w-full font-[500]`}>
                <span className={`w-full `}>{com.author}</span>{' '}
                {i < coms.length - 3 && (
                  <button onMouseDown={() => deleteComment(i)}>
                    <svg viewBox="0 0 32 32" width="24">
                      <g data-name="Layer 2">
                        <path d="M16 29a13 13 0 1 1 13-13 13 13 0 0 1-13 13Zm0-24a11 11 0 1 0 11 11A11 11 0 0 0 16 5Z" />
                        <path d="M11.76 21.24a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.41l8.49-8.49A1 1 0 0 1 21 12.46L12.46 21a1 1 0 0 1-.7.24Z" />
                        <path d="M20.24 21.24a1 1 0 0 1-.7-.29l-8.49-8.49a1 1 0 0 1 1.41-1.41L21 19.54A1 1 0 0 1 21 21a1 1 0 0 1-.76.24Z" />
                      </g>
                      <path
                        style={{
                          fill: 'none',
                        }}
                        d="M0 0h32v32H0z"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <span className={`mt-[10px] font-[400]`}>{com.text}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    return (
      <div
        className={`mt-[20vh] flex h-full w-[50%] items-center justify-center`}
      >
        <a
          className={` flex h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full bg-navred`}
        >
          <svg
            width="120"
            className={`translate-x-[14px] scale-[1.06] fill-white`}
            viewBox="0 0 16 16"
          >
            <path d="M1 1v14l14-7z" />
          </svg>
        </a>
      </div>
    )
  }
}
