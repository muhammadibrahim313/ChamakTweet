'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Repeat2, Upload, Image as ImageIcon } from 'lucide-react'
import { HexColorPicker } from "react-colorful"

export function TweetCustomizer() {
  const [tweetText, setTweetText] = useState('')
  const [username, setUsername] = useState('User Name')
  const [handle, setHandle] = useState('username')
  const [retweets, setRetweets] = useState(100)
  const [likes, setLikes] = useState(500)
  const [showSource, setShowSource] = useState(true)
  const [showTime, setShowTime] = useState(true)
  const [showMetrics, setShowMetrics] = useState(true)
  const [gradient, setGradient] = useState(['#3B82F6', '#2DD4BF'])
  const [size, setSize] = useState(0.9)
  const [avatarSrc, setAvatarSrc] = useState('/placeholder.svg')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [tweetDate, setTweetDate] = useState(new Date().toISOString().split('T')[0])
  const [tweetTime, setTweetTime] = useState('12:00')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const bgFileInputRef = useRef<HTMLInputElement>(null)

  const gradients = [
    ['#3B82F6', '#2DD4BF'],
    ['#8B5CF6', '#D946EF'],
    ['#EC4899', '#F43F5E'],
    ['#F59E0B', '#EF4444'],
    ['#10B981', '#3B82F6'],
    ['#6366F1', '#F472B6'],
  ]

  const simpleColors = [
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899',
    '#6B7280', '#000000', '#FFFFFF'
  ]

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isAvatar: boolean) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (isAvatar) {
          setAvatarSrc(e.target?.result as string)
        } else {
          setBackgroundImage(e.target?.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDownload = () => {
    // Implement download functionality here
    console.log('Downloading tweet...')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showColorPicker && !(event.target as Element).closest('.color-picker-container')) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker])

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10 bg-gray-50 min-h-screen">
      <motion.h1 
        className="text-5xl font-bold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       ChamakTweet
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6 space-y-6 bg-white shadow-lg rounded-xl">
            <div className="space-y-4">
              <Label htmlFor="tweet-text" className="text-lg font-semibold text-gray-700">Craft your tweet</Label>
              <Textarea
                id="tweet-text"
                placeholder="What's happening?"
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                className="w-full h-24 text-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">Name</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="handle" className="text-sm font-medium text-gray-700">Handle</Label>
                <Input
                  id="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="retweets" className="text-sm font-medium text-gray-700">Retweets</Label>
                <Input
                  id="retweets"
                  type="number"
                  value={retweets}
                  onChange={(e) => setRetweets(parseInt(e.target.value))}
                  className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="likes" className="text-sm font-medium text-gray-700">Likes</Label>
                <Input
                  id="likes"
                  type="number"
                  value={likes}
                  onChange={(e) => setLikes(parseInt(e.target.value))}
                  className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="tweet-date" className="text-sm font-medium text-gray-700">Date</Label>
                <Input
                  id="tweet-date"
                  type="date"
                  value={tweetDate}
                  onChange={(e) => setTweetDate(e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="tweet-time" className="text-sm font-medium text-gray-700">Time</Label>
                <Input
                  id="tweet-time"
                  type="time"
                  value={tweetTime}
                  onChange={(e) => setTweetTime(e.target.value)}
                  className="mt-1 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="avatar-upload" className="text-sm font-medium text-gray-700">Profile Picture</Label>
              <div className="mt-1 flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatarSrc} alt={username} />
                  <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button 
                  onClick={() => fileInputRef.current?.click()} 
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Upload Image</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bg-upload" className="text-sm font-medium text-gray-700">Background Image</Label>
              <div className="mt-1 flex items-center space-x-4">
                <Button 
                  onClick={() => bgFileInputRef.current?.click()} 
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <ImageIcon size={16} />
                  <span>Upload Background</span>
                </Button>
                <input
                  ref={bgFileInputRef}
                  type="file"
                  id="bg-upload"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, false)}
                  className="hidden"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="overflow-hidden bg-white shadow-lg rounded-xl perspective-1000">
            <motion.div 
              className="p-8 transition-all duration-300 ease-in-out transform-style-3d"
              style={{
                background: backgroundImage ? `url(${backgroundImage})` : `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transform: `scale(${size}) rotateY(20deg) rotateX(10deg)`,
              }}
              whileHover={{ rotateY: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CardContent className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={avatarSrc} alt={username} />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-gray-900">{username}</p>
                    {showSource && <p className="text-sm text-gray-500">@{handle}</p>}
                    <p className="text-gray-900 mt-1">{tweetText || "Your tweet will appear here"}</p>
                    {showTime && (
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(`${tweetDate}T${tweetTime}`).toLocaleString(undefined, {
                          hour: 'numeric',
                          minute: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                    {showMetrics && (
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mt-4">
                        <div className="flex items-center space-x-2">
                          <MessageCircle size={16} />
                          <span>0</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Repeat2 size={16} />
                          <span>{retweets}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart size={16} />
                          <span>{likes}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </motion.div>
          </Card>

          <Card className="mt-8 p-6 space-y-6 bg-white shadow-lg rounded-xl">
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-gray-700">Customize your tweet</Label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-source"
                    checked={showSource}
                    onCheckedChange={setShowSource}
                  />
                  <Label htmlFor="show-source" className="text-sm text-gray-700">Show Handle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-time"
                    checked={showTime}
                    onCheckedChange={setShowTime}
                  />
                  <Label htmlFor="show-time" className="text-sm text-gray-700">Show Time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-metrics"
                    checked={showMetrics}
                    onCheckedChange={setShowMetrics}
                  />
                  <Label htmlFor="show-metrics" className="text-sm text-gray-700">Show Metrics</Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold text-gray-700">Background Gradient</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {gradients.map((g, index) => (
                  <motion.button
                    key={index}
                    className="w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ background: `linear-gradient(to right, ${g.join(', ')})` }}
                    onClick={() => setGradient(g)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg font-semibold text-gray-700">Simple Colors</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {simpleColors.map((color, index) => (
                  <motion.button
                    key={index}
                    className="w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    style={{ backgroundColor: color }}
                    onClick={() => setGradient([color, color])}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <Label className="text-lg font-semibold text-gray-700">Custom Colors</Label>
              <div className="flex items-center space-x-2 mt-2">
                <motion.button
                  className="w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{ background: `linear-gradient(to right, ${gradient[0]}, ${gradient[1]})` }}
                  onClick={() => {
                    setShowColorPicker(!showColorPicker)
                    setActiveColorIndex(0)
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowColorPicker(!showColorPicker)
                    setActiveColorIndex(0)
                  }}
                >
                  Customize Colors
                </Button>
              </div>
              <AnimatePresence>
                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 mt-2 color-picker-container"
                  >
                    <Card className="p-4">
                      <HexColorPicker
                        color={gradient[activeColorIndex]}
                        onChange={(color) => {
                          const newGradient = [...gradient]
                          newGradient[activeColorIndex] = color
                          setGradient(newGradient)
                        }}
                      />
                      <div className="flex justify-between mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveColorIndex(0)}
                          className={activeColorIndex === 0 ? 'ring-2 ring-blue-500' : ''}
                        >
                          Color 1
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveColorIndex(1)}
                          className={activeColorIndex === 1 ? 'ring-2 ring-blue-500' : ''}
                        >
                          Color 2
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <Label htmlFor="size-slider" className="text-lg font-semibold text-gray-700">Size</Label>
              <Slider
                id="size-slider"
                min={0.5}
                max={1}
                step={0.1}
                value={[size]}
                onValueChange={([value]) => setSize(value)}
                className="w-full"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button onClick={handleDownload} className="w-full text-lg bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ease-in-out">
                Download Tweet
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}