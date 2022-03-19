import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

interface IModalProps {
  closeModal: () => void
  logIn: () => void
}

export const Modal: React.FC<IModalProps> = ({ closeModal, logIn }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [login, setLogin] = useState(``)
  const [password, setPassword] = useState(``)
  const [check, setCheck] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      className={`fixed inset-0 z-[1000] flex cursor-pointer items-center justify-center bg-[#333333]/80`}
    >
      <div
        className={`absolute h-screen w-screen`}
        onMouseDown={() => {
          setIsOpen(false)
          setTimeout(closeModal, 300)
        }}
      />
      <div
        className={`z-20 flex h-[394px] w-[304px] cursor-default flex-col items-center rounded-[8px] bg-white px-[36px] pt-[32px]`}
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
                  className={`transition duration-200 ${check || `opacity-0`}`}
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
          className={`mt-[108px] rounded-[4px] bg-navred p-[7px_33.5px] text-[15.5px] font-[500] text-white`}
          onClick={() => {
            setTimeout(() => setIsOpen(false), 600)
            setTimeout(logIn, 600)
            setTimeout(closeModal, 900)
          }}
        >
          Войти
        </button>
      </div>
    </motion.div>
  )
}
