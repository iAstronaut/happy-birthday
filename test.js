import React, { useState, useEffect } from 'react';
import { Music, Gift, Heart, Star, PartyPopper, Sparkles, Cake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BirthdayGreeting = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [floatingIconPosition, setFloatingIconPosition] = useState({ x: 0, y: 0 });
  const [cakeClicks, setCakeClicks] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);

  const messages = [
    "Happy Birthday! 🎉",
    "Wishing you a day filled with joy and laughter! 🌟",
    "May all your dreams come true! 🎈",
    "Here's to another amazing year! 💫",
    "You're absolutely amazing! ⭐",
    "Time to celebrate YOU! 🎂",
  ];

  // Array of celebration icons to use instead of Balloon
  const celebrationIcons = [
    <Star className="h-12 w-12" />,
    <Gift className="h-12 w-12" />,
    <Heart className="h-12 w-12" />,
    <PartyPopper className="h-12 w-12" />,
    <Sparkles className="h-12 w-12" />
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      const moveInterval = setInterval(() => {
        setFloatingIconPosition({
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight * 0.8
        });
      }, 2000);
      return () => clearInterval(moveInterval);
    }
  }, [isPlaying]);

  const startCelebration = () => {
    setIsPlaying(true);
    setShowSparkles(true);
    // Create initial floating icons
    setFloatingIcons(Array(5).fill(null).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 100,
      color: ['text-pink-500', 'text-purple-500', 'text-blue-500', 'text-yellow-500', 'text-red-500'][i],
      iconIndex: Math.floor(Math.random() * celebrationIcons.length)
    })));
  };

  const handleCakeClick = () => {
    setCakeClicks(prev => prev + 1);
    if (cakeClicks === 2) {
      setShowSparkles(true);
    }
    // Add more floating icons on every third click
    if (cakeClicks % 3 === 0) {
      setFloatingIcons(prev => [
        ...prev,
        {
          id: prev.length,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 100,
          color: ['text-pink-500', 'text-purple-500', 'text-blue-500', 'text-yellow-500', 'text-red-500'][Math.floor(Math.random() * 5)],
          iconIndex: Math.floor(Math.random() * celebrationIcons.length)
        }
      ]);
    }
  };

  const toggleCard = () => {
    setShowCard(!showCard);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-4 overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map(icon => (
        <div
          key={icon.id}
          className={`absolute transition-all duration-1000 ease-in-out animate-float ${icon.color}`}
          style={{
            left: icon.x,
            top: icon.y,
            transform: `translateY(-${window.innerHeight}px)`,
          }}
        >
          {React.cloneElement(celebrationIcons[icon.iconIndex], {
            className: `h-12 w-12 ${icon.color}`
          })}
        </div>
      ))}

      {!isPlaying ? (
        <div className="flex items-center justify-center h-screen">
          <Button 
            onClick={startCelebration}
            className="text-2xl p-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl shadow-lg transform transition hover:scale-110 hover:rotate-3"
          >
            <PartyPopper className="mr-2 h-8 w-8 animate-bounce" />
            Click for a Surprise!
          </Button>
        </div>
      ) : (
        <div className="container mx-auto max-w-2xl relative">
          {/* Floating Party Popper */}
          <div 
            className="absolute transition-all duration-1000 ease-in-out"
            style={{
              left: floatingIconPosition.x,
              top: floatingIconPosition.y,
            }}
          >
            <PartyPopper className="h-8 w-8 text-yellow-500 animate-spin" />
          </div>

          <div className="text-center space-y-8 animate-fade-in">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse">
              {messages[currentMessage]}
            </div>
            
            <div className="relative">
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl transform hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="flex justify-center space-x-4 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className="h-8 w-8 text-yellow-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div 
                      className="relative cursor-pointer"
                      onClick={handleCakeClick}
                    >
                      <Cake className="h-16 w-16 mx-auto text-pink-500 hover:scale-110 transition-transform" />
                      {showSparkles && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                          <Sparkles className="h-6 w-6 text-yellow-400 animate-spin" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <Music className="h-6 w-6 text-pink-500 animate-bounce" />
                      <span className="text-lg">Playing Birthday Music</span>
                    </div>
                    
                    <Button
                      onClick={toggleCard}
                      className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition-all"
                    >
                      <Gift className="mr-2 h-5 w-5 animate-pulse" />
                      {showCard ? 'Close Surprise Card' : 'Open Surprise Card!'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {showCard && (
                <div className="absolute top-full left-0 right-0 mt-4 animate-slide-up">
                  <Card className="bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl transform hover:rotate-2 transition-transform">
                    <CardContent className="p-6 text-center relative overflow-hidden">
                      <Heart className="h-12 w-12 text-red-500 mx-auto mb-4 animate-pulse" />
                      <p className="text-lg font-medium text-gray-800 mb-4 relative z-10">
                        On this special day, may your heart be light,<br/>
                        your smile be bright, and your year ahead be just right!
                      </p>
                      <div className="text-sm text-gray-600">
                        With love and best wishes ❤️
                      </div>
                      {/* Background sparkles */}
                      {[...Array(12)].map((_, i) => (
                        <Sparkles
                          key={i}
                          className="absolute text-yellow-300 opacity-50 animate-ping"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayGreeting;