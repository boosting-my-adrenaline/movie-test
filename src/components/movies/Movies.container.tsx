import React from 'react'
import { IMovie } from '../../App'
import { useWindowSize } from '../../hooks/useDimensions'
import { GenresSection } from './Genres.section'
import { MoviesSection } from './Movies.section'

interface IMoviesProps {
  filter: string
  movies: IMovie[]
  openMovie: (movie: number) => void
}

export const MoviesContainer: React.FC<IMoviesProps> = ({
  filter,
  movies,
  openMovie,
}) => {
  const { width: windowWidth } = useWindowSize()

  const width = windowWidth > 1260 ? 1260 : windowWidth

  return (
    <div className={`flex w-[50%] flex-col items-center pt-[25px]`}>
      <div
        className={`flex w-full max-w-[1260px] flex-col items-center ${
          width >= 700 ? `px-[40px]` : `px-[20px]`
        }`}
      >
        <h1 className={` flex w-full text-[24px] font-[500] text-gray1`}>
          🔥 Новинки
        </h1>
        <MoviesSection
          width={width}
          filter={filter}
          movies={movies}
          openMovie={openMovie}
        />
        <h1
          className={` mt-[-4px] flex w-full text-[24px] font-[500] text-gray1`}
        >
          Жанры
        </h1>
        <GenresSection width={width} />
      </div>
    </div>
  )
}
