////////////////////////////////////////////////////////////////////////////

// Поскольку главной целью данного ТЗ было показать квалификацию, то:
// В данном ТЗ были использованы только React + Typescript, Tailwind CSS, Framer Morion
// Использовать Redux не видел смысла, поскольку нет взаимодействия с сервером и функционал минимален.
// Так же не стал использовать React-router, поскольку такое маленькие приложение будет красивее данным способом

// Каждый раздел так же адаптирован к любым устройствам

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from 'react'
import { MoviesContainer } from './components/movies/Movies.container'
import { TVContainer } from './components/tv/TV.container'
import { Navbar } from './components/navbar/Navbar'
import { Tabs } from './components/navbar/Tabs'
import { useWindowSize } from './hooks/useDimensions'
import { Footer } from './components/footer/Footer'
import { Modal } from './components/modal/Modal'
import useLocalStorage from './hooks/useLocalStorage'
import { mockedMovies } from './static/mocked-movies'
import { MovieContainer } from './components/movie/Movie.container'
import { mockedComs } from './static/mockedComs'

export type Section = 'Movies' | 'TV'

export interface IMovie {
  title: string
  country: string
  genre: string
  description: string
  image: string
}

const App: React.FC = () => {
  const { width: windowWidth } = useWindowSize()
  const containerWidth = windowWidth > 1440 ? 1440 : windowWidth

  const [filter, setFilter] = useState(``)

  const [coms, setComs] = useLocalStorage<{ text: string; author: string }[][]>(
    'coms',
    mockedComs
  )

  const [currentSection, setCurrentSection] = useState<Section>('Movies')
  const [isAuth, setIsAuth] = useLocalStorage(`isAuth`, false)
  const [isModal, setIsModal] = useState(false)

  const username = 'Константин К.'
  const [usernameInput, setUsernameInput] = useState(username)

  const movies = mockedMovies

  const [isMovie, setIsMovie] = useState<null | number>(null)

  const addComment = (text: string) => {
    if (isMovie !== null) {
      setComs(
        coms.map((com, i) =>
          i === isMovie
            ? [{ author: isAuth ? usernameInput : `guest`, text }, ...com]
            : com
        )
      )
    }
  }

  const deleteComment = (indexCom: number) => {
    if (isMovie !== null) {
      setComs(
        coms.map((com, index) =>
          index === isMovie ? com.filter((_, i) => i !== indexCom) : com
        )
      )
    }
  }

  return (
    <div className={`mx-auto flex  flex-col items-center font-Rubik`}>
      {isModal && (
        <Modal
          closeModal={() => setIsModal(false)}
          logIn={() => setIsAuth(true)}
        />
      )}
      <div className={`flex max-w-[1440px] flex-col items-center`}>
        <Navbar
          setFilter={setFilter}
          openModal={() => setIsModal(true)}
          isAuth={isAuth}
          logout={() => setIsAuth(false)}
          logIn={() => setIsAuth(true)}
          closeMovie={() => {
            setIsMovie(null)
            setCurrentSection('Movies')
          }}
          usernameInput={usernameInput}
          setUsernameInput={setUsernameInput}
        />
        <Tabs
          sections={['Movies', 'TV']}
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          width={containerWidth}
          closeMovie={() => setIsMovie(null)}
        />
        <div className={`overflow-hidden`} style={{ width: containerWidth }}>
          <div
            className={`flex `}
            style={{
              width: containerWidth * 2,
              transform: `translateX(${
                isMovie !== null ? 0 : -containerWidth
              }px)`,
              transition: `0.5s ease-in-out`,
            }}
          >
            <MovieContainer
              movie={isMovie !== null ? movies[isMovie] : null}
              coms={isMovie !== null ? coms[isMovie] : null}
              width={containerWidth}
              closeMovie={() => setIsMovie(null)}
              addComment={addComment}
              deleteComment={deleteComment}
            />
            <div
              className={`relative justify-center overflow-hidden `}
              style={{ width: containerWidth }}
            >
              <div
                className={`flex `}
                style={{
                  width: containerWidth * 2,
                  transform: `translateX(${
                    currentSection === 'Movies' ? 0 : -containerWidth
                  }px)`,
                  transition: `0.5s ease-in-out`,
                }}
              >
                <MoviesContainer
                  filter={filter}
                  movies={movies}
                  openMovie={setIsMovie}
                />
                <TVContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
