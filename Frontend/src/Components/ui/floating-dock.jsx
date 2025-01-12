import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, activeItem, setActiveItem }) => {
  return (
    <FloatingDockDesktop
      items={items}
      activeItem={activeItem}
      setActiveItem={setActiveItem} 
    />
  );
};

const FloatingDockDesktop = ({ items, activeItem, setActiveItem }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-20 gap-5 border border-gray justify-between  items-end rounded-full bg-gray-50 px-4 p-3 fixed bottom-4 left-1/2 transform -translate-x-1/2"
      )}
    >
      {items.map((item) => (
        <IconContainer
          mouseX={mouseX}
          key={item.title}
          {...item}
          active={activeItem === item.title}
          onClick={() => setActiveItem(item.title)} 
        />
      ))}
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, active, onClick }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]);

  let widthIcon = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link to={href} onClick={onClick}>
      <motion.div
        ref={ref}
        style={{
          width: active ? 80 : widthIcon,
          height: active ? 80 : heightIcon,
          scale: active ? 1.1 : 1,
          backgroundColor: active ? "#CC2B52" : "white",
        }}
        className={cn(
          "aspect-square rounded-full flex items-center justify-center bg-gray-200 border border-gray relative",
          active ? "bg-primary" : "bg-white"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className={`flex items-center justify-center ${active ? "text-white" : "text-black"}`}
          style={{ width: active ? 30 : 20, height: active ? 30 : 20 }}
        >
          {icon}
        </motion.div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute left-1/2 -translate-x-1/2 -top-7 w-fit text-xs px-2 py-0.5 rounded-md bg-primary text-white border-gray-200"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}


