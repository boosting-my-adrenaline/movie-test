import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDidMountEffect } from '../../hooks/useDidMountEffect'

interface IProps {
  open: boolean
}

export const NavbarAnimation: React.FC<IProps> = ({ open }) => {
  const [rotation, setRotation] = useState(false)
  const [moving, setMoving] = useState(false)

  useDidMountEffect(() => {
    if (!open) {
      setRotation(open)
    } else {
      setMoving(open)
    }

    let id1 = setTimeout(() => {
      if (open) {
        setRotation(open)
      } else {
        setMoving(open)
      }
    }, 150)

    return () => {
      clearTimeout(id1)
      setMoving(open)
      setRotation(open)
    }
  }, [open])

  return (
    <div
      className={`mr-[10px] flex h-[20px] w-[20px] cursor-pointer items-center justify-center`}
    >
      <motion.div
        // initial={{ y: 50 }}
        animate={{ y: moving ? 0 : -4, rotate: rotation ? 45 : 0 }}
        className={` absolute h-[2px] w-[20px] rounded-full  bg-navred`}
      />
      <motion.div
        // initial={{ y: 50 }}
        animate={{ y: moving ? 0 : 4, rotate: rotation ? -45 : 0 }}
        className={` absolute h-[2px] w-[20px] rounded-full  bg-navred`}
      />
    </div>
  )
}
