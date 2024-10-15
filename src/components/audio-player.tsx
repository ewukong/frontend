'use client'

import { ComponentProps, useRef, useState } from 'react'
import { random } from 'lodash'
import { FaPause, FaPlay } from 'react-icons/fa6'
import { RiAddFill, RiSubtractFill } from 'react-icons/ri'
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md'
import H5AudioPlayer from 'react-h5-audio-player'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import { useInterval } from 'ahooks'

import { cn } from '@/lib/utils'

export const AudioPlayerComponent = ({
  className,
  ...props
}: ComponentProps<typeof AudioPlayer>) => {
  const audioRef = useRef<H5AudioPlayer>(null)
  const [isCollapse, setIsCollapse] = useState(true)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isUsePlayIcon, setIsUsPlayIcon] = useState(true)

  const isPaused = audioRef.current?.audio.current?.paused ?? true

  const generateRandomHeight = () => {
    return Array.from({ length: 3 }, () => (isPaused ? 10 : random(20, 55)))
  }
  const [heights, setHeights] = useState(generateRandomHeight())

  const musicList = [
    {
      name: 'Tianfu Melody',
      src: '/audio/tian-fu.mp3',
    },
    {
      name: 'Immortal Sound Above Cloud Palace',
      src: '/audio/yun-gong.mp3',
    },
    {
      name: 'Where Lies the Path Ahead',
      src: '/audio/where-road.mp3',
    },
  ]

  const handleClickPrevious = () => {
    setTrackIndex((currentTrack) =>
      currentTrack === 0 ? musicList.length - 1 : currentTrack - 1
    )
  }

  const handleClickNext = () => {
    setTrackIndex((currentTrack) =>
      currentTrack < musicList.length - 1 ? currentTrack + 1 : 0
    )
  }

  const audioBarChart = () => {
    return (
      <div
        className={cn('flex space-x-1 items-end h-5', isCollapse && 'pl-16')}
      >
        {heights.map((height, index) => (
          <div
            key={index}
            className={cn(
              'bg-red-500 w-[3px] transition-all duration-500',
              isPaused && 'bg-black'
            )}
            style={{
              height: `${height}px`,
              transformOrigin: 'bottom',
              transform: `scaleY(${height / 100})`,
            }}
          />
        ))}
      </div>
    )
  }

  useInterval(() => setHeights(generateRandomHeight()), 300)

  return (
    <div className="fixed block sm:left-5 max-sm:right-5 bottom-5 z-30">
      <div className="relative text-black">
        <div
          className={cn(
            'flex items-center space-x-4 bg-white rounded-lg max-h-14',
            'transition-all ease-in-out duration-300 select-none',
            isCollapse && 'sm:w-32 max-sm:w-0 max-sm:h-0',
            !isCollapse && 'w-96 max-sm:w-[23rem]'
          )}
        >
          <div className="max-h-16 w-full h-fit">
            <img
              loading="lazy"
              src="/images/wukong/transparent/w1.png"
              className={cn(
                'absolute bottom-0 left-2 w-20 transition-all origin-bottom',
                isCollapse && 'scale-75 left-0'
              )}
            />
          </div>

          {/* Imitation frequency phonogram */}
          {audioBarChart()}

          <div className="w-full overflow-hidden whitespace-nowrap">
            <span
              className={cn(
                'animate-scroll-text inline-block',
                isCollapse && 'sm:invisible'
              )}
            >
              {musicList[trackIndex].name}
            </span>
          </div>

          <AudioPlayer
            ref={audioRef}
            // autoPlay
            showSkipControls
            showJumpControls={false}
            showDownloadProgress={false}
            customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
            // customProgressBarSection={[]}
            src={musicList[trackIndex].src}
            customIcons={{
              play: (
                <FaPlay className="w-5 text-black mx-auto hover:scale-110 transition ease-out" />
              ),
              pause: (
                <FaPause className="w-5 text-black mx-auto hover:scale-110 transition ease-out" />
              ),
              previous: (
                <MdSkipPrevious className="text-black hover:scale-110 transition ease-out" />
              ),
              next: (
                <MdSkipNext className="text-black hover:scale-110 transition ease-out" />
              ),
            }}
            className={cn(
              '!bg-transparent !shadow-none !ml-0 max-sm:!p-2',
              isCollapse && 'sm:invisible',
              className
            )}
            onClickPrevious={handleClickPrevious}
            onClickNext={handleClickNext}
            onEnded={handleClickNext}
            {...props}
          />
        </div>

        <span
          onClick={() => {
            if (isUsePlayIcon) {
              audioRef.current?.audio.current?.play()
              setIsUsPlayIcon(false)
            }
            setIsCollapse(!isCollapse)
          }}
          className={cn(
            'absolute w-10 h-10 z-50 -right-5 bottom-10 bg-white rounded-full flex justify-center items-center',
            'hover:cursor-pointer hover:scale-110 transition ease-out border-2 border-zinc-200'
          )}
        >
          {!isCollapse && <RiSubtractFill />}
          {isCollapse && (isUsePlayIcon ? <FaPlay /> : <RiAddFill />)}
        </span>
      </div>
    </div>
  )
}

export default AudioPlayer
