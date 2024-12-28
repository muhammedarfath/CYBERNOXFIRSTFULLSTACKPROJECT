"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "../hooks/use-outside-click";
import { IconSend } from "@tabler/icons-react";

export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              // remove max-w-4xl if you want the carousel to span the full width of its container
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }) => {
    const [open, setOpen] = useState(false);
    const [showMessages, setShowMessages] = useState(false); // For hover effect
    const [inputMessage, setInputMessage] = useState(""); // Input message
    const [messages, setMessages] = useState([
      { type: "received", text: "Hello, how are you?" },
      { type: "sent", text: "I'm good, thank you!" },
    ]);
  
    const handleHover = () => setShowMessages(true);
    const handleLeave = () => setShowMessages(false);
  
    const handleSendMessage = () => {
      if (inputMessage.trim()) {
        setMessages([...messages, { type: "sent", text: inputMessage }]);
        setInputMessage(""); // Clear the input
      }
    };
  
    return (
      <>
        <motion.div
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          layoutId={layout ? `card-${card.title}` : undefined}
          className="relative rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[30rem] md:w-96 overflow-hidden flex flex-col items-start justify-start"
        >
          <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
          <div className="relative z-40 p-8">
            {/* <motion.p
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-white text-sm md:text-base font-medium font-sans text-left"
            >
              {card.category}
            </motion.p> */}
            <motion.p
              layoutId={layout ? `title-${card.title}` : undefined}
              className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            >
              {card.title}
            </motion.p>
          </div>
          <img
            src={card.src}
            alt={card.title}
            className="object-cover absolute z-10 inset-0 h-full w-full"
          />
  
          {/* Messaging UI on hover */}
          {showMessages && (
            <div className="absolute inset-0 z-50 bg-black/70 flex flex-col justify-between p-4">
              {/* Messages */}
              <div className="flex flex-col gap-2 overflow-y-auto">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg text-sm max-w-[70%] ${
                      message.type === "sent"
                        ? "self-end bg-[#FFB9C3] text-white"
                        : "self-start bg-gray-200 text-black"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
  
              {/* Input and Send Button */}
              <div className="flex gap-2 items-center mt-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-lg border border-gray-300"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-[#5e5e61] text-white rounded-lg hover:bg-[#FFB9C3]"
                >
                  <IconSend className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </>
    );
  };

export const BlurImage = ({ height, width, src, className, alt, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
