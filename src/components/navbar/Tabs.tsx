import { AnimateSharedLayout, motion } from 'framer-motion'
import React, { useState } from 'react'
import { Section } from '../../App'

interface ITabsProps {
  sections: Section[]
  setCurrentSection: (section: Section) => void
  currentSection: Section
  width: number
  closeMovie: () => void
}

export const Tabs: React.FC<ITabsProps> = ({
  sections,
  currentSection,
  setCurrentSection,
  width,
  closeMovie,
}) => {
  return (
    <div
      className={`flex w-full justify-center  ${
        width >= 750 || `pt-[80px]`
      } p-[6px]`}
    >
      <AnimateSharedLayout>
        <ul className={`flex  gap-[24px]`}>
          {sections.map((section, i) => (
            <Item
              key={section}
              title={section !== 'TV' ? 'Фильмы' : 'Телеканалы'}
              isSelected={currentSection === section}
              onClick={() => {
                closeMovie()
                setCurrentSection(section)
              }}
              width={width}
            />
          ))}
        </ul>
      </AnimateSharedLayout>
    </div>
  )
}

interface IProps2 {
  isSelected: boolean
  onClick: () => void
  title: string
  width: number
}

const Item: React.FC<IProps2> = ({ isSelected, onClick, title, width }) => {
  return (
    <motion.li
      animate={{ color: isSelected ? '#E5261E' : '#333333' }}
      className={`relative block shrink-0 cursor-pointer    ${
        width >= 350 ? `text-[28px]` : `text-[20px]`
      } font-[500]`}
      onClick={onClick}
      // style={{ backgroundColor: color }}
    >
      {title}
      {isSelected && (
        <motion.div
          layoutId="underline"
          animate={{ borderColor: isSelected ? '#E5261E' : '#333333' }}
          className={` absolute top-[-3.5] bottom-[-3.5px] left-[1px] right-[1px]  border-b-2   `}
          initial={false}
          // animate={{ borderColor: color }}
          transition={{
            default: { type: 'just', stiffness: 500, damping: 30 },
          }}
        />
      )}
    </motion.li>
  )
}
