'use client'

import React from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export default function TeamPage() {
  const { t } = useTranslation()
  const imageList = [
    {
      title: 'Great power from the East',
      image: '/images/team/team.png',
      content: (
        <motion.ul
          key={'image-list-content-ul'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="list-disc"
        >
          <li>{t('team.goal.desc1')}</li>
          <li>{t('team.goal.desc2')}</li>
          <li>{t('team.goal.desc3')}</li>
        </motion.ul>
      ),
    },
    {
      name: 'Alex Johnson',
      title: 'Founder',
      description: t('team.founder.desc'),
      image: '/images/team/w1.png',
    },
    {
      name: 'Jessica',
      title: 'Marketing Leader',
      description: t('team.market.desc'),
      image: '/images/team/w2.png',
    },
    {
      name: 'Emily Zhao',
      title: 'Art Leader',
      description: t('team.art.desc'),
      image: '/images/team/w3.png',
    },
    {
      name: 'David Brown',
      title: 'Tech Leader',
      description: t('team.tech.desc'),
      image: '/images/team/w4.png',
    },
  ]

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 overflow-hidden">
      <div className="flex w-full h-full">
        {imageList.map((item, i) => (
          <div
            key={i}
            onClick={() => setOpenIndex(i)}
            className={cn(
              'relative bg-center bg-cover transition-all duration-700 ease-in-out w-[50%] overflow-hidden',
              'before:absolute before:inset-0 before:bg-black/60 cursor-pointer',
              openIndex === i && 'flex-0 before:bg-black/25',
              openIndex === 0 && openIndex === i && 'before:bg-black/40'
            )}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <AnimatePresence>
              {openIndex !== i && (
                <motion.div
                  key={`image-list-${i}`}
                  initial={{ opacity: 0, x: '-100%' }}
                  animate={{ opacity: 1, x: '0' }}
                  exit={{ opacity: 0, x: '-100%' }}
                  transition={{
                    duration: 0.5,
                  }}
                  className={cn(
                    'text-amber-400/80 text-start space-x-2 max-sm:space-x-1 uppercase w-full h-52 max-sm:h-40',
                    'absolute bottom-10 tracking-wide flex justify-center items-start'
                  )}
                >
                  {item.name && (
                    <p
                      style={{
                        writingMode: 'vertical-rl',
                        // textOrientation: 'upright',
                      }}
                      className="text-2xl max-sm:text-xl flex items-center"
                    >
                      {item.name}
                    </p>
                  )}
                  {item.title && (
                    <p
                      style={{
                        writingMode: 'vertical-rl',
                        // textOrientation: 'upright',
                      }}
                      className="text-sm"
                    >
                      {item.title}
                    </p>
                  )}
                </motion.div>
              )}

              {openIndex === i && (
                <div
                  className={cn(
                    'text-amber-300 text-start px-20 max-sm:px-4',
                    'absolute bottom-20 max-sm:bottom-6 tracking-wide flex justify-center'
                  )}
                >
                  {item.content ? (
                    item.content
                  ) : (
                    <motion.div
                      key={`image-list-content-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="space-y-6"
                    >
                      <p className="text-6xl max-sm:text-2xl font-bold flex items-center gap-4">
                        {item.name}
                      </p>
                      <p className="text-base">{item.description}</p>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
