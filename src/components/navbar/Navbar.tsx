import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useWindowSize } from '../../hooks/useDimensions'
import { NavbarAnimation } from './NavbarAnimation'

interface INavbarProps {
  setFilter: (filter: string) => void
  openModal: () => void
  isAuth: boolean
  logout: () => void
  logIn: () => void
  closeMovie: () => void
  usernameInput: string
  setUsernameInput: (username: string) => void
}

export const Navbar: React.FC<INavbarProps> = ({
  setFilter,
  openModal,
  isAuth,
  logout,
  logIn,
  closeMovie,
  usernameInput,
  setUsernameInput,
}) => {
  const [inputValue, setInputValue] = useState('')

  const { width: windowWidth, height } = useWindowSize()

  const search = () => {
    closeMovie()
    setFilter(inputValue)
  }

  const [menuOpen, setMenuOpen] = useState(false)

  const [login, setLogin] = useState(``)
  const [password, setPassword] = useState(``)
  const [check, setCheck] = useState(true)

  if (windowWidth >= 750) {
    return (
      <nav
        className={`flex ${
          windowWidth >= 900 ? `h-[106px]` : `h-[90px]`
        } w-full  items-center justify-center `}
      >
        <ul
          className={`grid w-full  max-w-[1242px] grid-cols-nav  items-center  justify-between px-[20px] font-Rubik`}
        >
          <li
            className={`m-[-2px_0_0_11px] flex w-full flex-grow gap-[12px]`}
            onClick={closeMovie}
          >
            <a
              className={`mt-[-5px] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-full bg-navred`}
            >
              <svg
                width="40"
                className={`translate-x-[6px] scale-[1.06] fill-white`}
                viewBox="0 0 16 16"
              >
                <path d="M1 1v14l14-7z" />
              </svg>
            </a>
            {windowWidth >= 1200 && (
              <button
                className={`mt-[-2px] text-[19.5px] font-[500] tracking-[0.4px] text-gray1`}
              >
                Видеосервис
              </button>
            )}
          </li>

          <li
            className={`ml-[-59px] flex flex-grow gap-[32px]  pl-[70px] pr-[10px] text-[15.5px] text-navred`}
          >
            <div className={` h-[30px] w-[320px]  pt-[4px]`}>
              <input
                className={`w-full border-b-[0.5px] border-gray1 pb-[2px] text-[15.5px] tracking-[0.3px] ${
                  inputValue ? `font-[500] text-gray1` : `font-[400] text-gray3`
                }  outline-none`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Поиск..."
                spellCheck={false}
              />
            </div>
            <button
              className={`mt-[2px] text-[15.5px] font-[500] tracking-[0.3px]`}
              onClick={search}
            >
              Найти
            </button>
          </li>

          <li className={`flex w-full grow-0 justify-end px-[10px]`}>
            {isAuth ? (
              <div className={`flex flex-shrink items-center`}>
                <div className={`flex-shrink  pt-[2px]`}>
                  <input
                    className={`w-min flex-shrink border-none font-[500] text-gray1 outline-none`}
                    value={usernameInput}
                    onChange={(e) => {
                      usernameInput.length < 20
                        ? setUsernameInput(e.target.value)
                        : setUsernameInput(usernameInput.slice(0, -1))
                    }}
                    size={usernameInput.length}
                    spellCheck={false}
                  />
                </div>
                <button
                  className={`shrink-0 p-[3px_1px_2px_6px] text-[15.5px] font-[500] tracking-[0.4px] text-navred`}
                  onClick={() => setTimeout(logout, 400)}
                >
                  {windowWidth >= 1200 ? (
                    `Выйти`
                  ) : (
                    <svg viewBox="0 0 64 64" width="28">
                      <defs>
                        <style>
                          {
                            '.cls-1{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}'
                          }
                        </style>
                      </defs>

                      <path
                        className="cls-1 stroke-navred"
                        d="M13.13 8.63 32 16v40l-18.75-8.13A2 2 0 0 1 12 46V10a2 2 0 0 1 2-2h27a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2h-9M27.91 35.06l-3.78-1.56M50 32.24 54.24 28 50 23.76M54 28H43"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ) : (
              <button
                className={`rounded-[4px] bg-navred p-[7px_33.5px] text-[15.5px] font-[500] text-white`}
                onClick={openModal}
              >
                Войти
              </button>
            )}
          </li>
        </ul>
      </nav>
    )
  } else {
    return (
      <motion.div
        style={{
          height: menuOpen ? height : 44,
          transition: `height .56s cubic-bezier(.52,.16,.24,1)`,
        }}
        className={`fixed top-0 z-[900] w-full overflow-hidden bg-black transition duration-[560] ease-custom1`}
      >
        <div
          className={`h-[44px] `}
          // onMouseDown={() => setOpen((prev) => !prev)}
        >
          <ul className={`flex h-full items-center justify-between px-[25px]`}>
            <li onMouseDown={() => setMenuOpen((prev) => !prev)}>
              <NavbarAnimation open={menuOpen} />
            </li>

            <li className={`flex items-center `}>
              <div className={` h-[30px] w-full  `}>
                <input
                  className={`w-full rounded-[10px] border-b-[0.5px] border-gray1  p-[4px_8px] text-[15.5px] tracking-[0.3px] ${
                    inputValue
                      ? `font-[500] text-gray1`
                      : `font-[400] text-gray3`
                  }  outline-none`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Поиск..."
                  spellCheck={false}
                />
              </div>
              <button
                className={`ml-[4px] text-[15.5px] font-[500] tracking-[0.3px] text-navred`}
                onClick={search}
              >
                <svg viewBox="0 0 32 32" width="24" className={`fill-navred`}>
                  <path d="m27.414 24.586-5.077-5.077A9.932 9.932 0 0 0 24 14c0-5.514-4.486-10-10-10S4 8.486 4 14s4.486 10 10 10a9.932 9.932 0 0 0 5.509-1.663l5.077 5.077a2 2 0 1 0 2.828-2.828zM7 14c0-3.86 3.14-7 7-7s7 3.14 7 7-3.14 7-7 7-7-3.14-7-7z" />
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div className={` p-[9px_25px_7px]`}></div>
        <div className={`h-[0.5px] w-full bg-white/[.16]`}></div>

        {isAuth ? (
          <div
            className={`flex w-full flex-col items-center gap-[10px] bg-white py-[40px]`}
          >
            <div className={`text-center`}> Имя пользователя: </div>
            <div className={`flex items-center`}>
              <input
                className={` ml-[20px] flex-shrink rounded-[10px] border border-gray1 p-[2px_4px_2px_8px] font-[500] text-gray1 outline-none`}
                value={usernameInput}
                onChange={(e) => {
                  usernameInput.length < 20
                    ? setUsernameInput(e.target.value)
                    : setUsernameInput(usernameInput.slice(0, -1))
                }}
                size={usernameInput.length + 2}
                spellCheck={false}
              />

              <svg
                width={18}
                viewBox="0 0 48 48"
                className={`translate-x-[-25px] fill-navred`}
              >
                <path d="M6 34.5V42h7.5l22.13-22.13-7.5-7.5L6 34.5zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z" />
                <path d="M0 0h48v48H0z" fill="none" />
              </svg>
            </div>

            <button
              className={` mt-[58px] rounded-[4px] bg-navred p-[7px_33.5px] text-[15.5px] font-[500] text-white`}
              onClick={() => {
                setTimeout(logout, 600)
                // setTimeout(() => setMenuOpen(false), 900)
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <div
            className={`flex w-full items-center justify-center  bg-white py-[20px] `}
          >
            <div
              className={`z-20 flex  w-full cursor-default flex-col items-center  px-[36px] py-[32px]`}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <h1 className={` text-[27.5px] font-[500]`}>Вход</h1>

              <input
                className={`mt-[18px] w-full overflow-hidden border-b-[0.5px] border-gray1 pb-[2px] text-[15.5px] tracking-[0.3px] ${
                  login ? `font-[500] text-gray1` : `font-[400] text-gray3`
                }  bg-white outline-none `}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Логин"
                spellCheck={false}
                autoComplete="off"
              />

              <input
                className={`mt-[23px] w-full border-b-[0.5px] border-gray1 pb-[2px] text-[15.5px] tracking-[0.3px] ${
                  password ? `font-[500] text-gray1` : `font-[400] text-gray3`
                }  outline-none`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                type="password"
                spellCheck={false}
                autoComplete="off"
              />
              <div
                className={`flex w-full  items-center pt-[20px]`}
                onClick={() => setCheck((prev) => !prev)}
              >
                <div className={`mr-[6px] cursor-pointer`}>
                  <svg viewBox="0 0 512 512" width="19">
                    <title />
                    {
                      <path
                        className={`transition duration-200 ${
                          check || `opacity-0`
                        }`}
                        style={{
                          fill: 'none',
                          stroke: '#000',
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          strokeWidth: 32,
                        }}
                        d="M352 176 217.6 336 160 272"
                      />
                    }
                    <rect
                      height={384}
                      rx={48}
                      ry={48}
                      style={{
                        fill: 'none',
                        stroke: '#000',
                        strokeLinejoin: 'round',
                        strokeWidth: 32,
                      }}
                      width={384}
                      x={64}
                      y={64}
                    />
                  </svg>
                </div>
                <label
                  className={`cursor-pointer font-[300] tracking-[0.3px] text-gray1`}
                >
                  Запомнить
                </label>
              </div>
              <button
                className={`mt-[58px] rounded-[4px] bg-navred p-[7px_33.5px] text-[15.5px] font-[500] text-white`}
                onClick={() => {
                  setTimeout(logIn, 600)
                  setTimeout(() => setMenuOpen(false), 900)
                }}
              >
                Войти
              </button>
            </div>
          </div>
        )}
        <div className={`flex w-full justify-center py-[20px]`}>
          <motion.div
            animate={{ rotate: 90, scale: [1.1, 1, 1.1] }}
            whileHover={{ scale: 1.1 }}
            transition={{
              repeat: Infinity,
              repeatDelay: 1.3,
            }}
            className={`mb-[40px] flex h-[40px] w-[40px]  cursor-pointer items-center justify-center rounded-full border-[0.5px] border-navred`}
            onMouseDown={() => setMenuOpen(false)}
          >
            <div
              className={`absolute h-[3px] w-[24px] rotate-45 rounded-full bg-navred`}
            />
            <div
              className={`absolute h-[3px] w-[24px] rotate-[135deg] rounded-full bg-navred`}
            />
          </motion.div>
        </div>
      </motion.div>
    )
  }
}
