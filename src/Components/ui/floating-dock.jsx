import { cn } from "../../lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

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
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link to={href} onClick={onClick}>
      <motion.div
        ref={ref}
        style={{
          width: active ? 80 : width,
          height: active ? 80 : height,
          scale: active ? 1.1 : 1,
          backgroundColor: active ? "#CC2B52" : "white", 
        }}
        className={cn(
          "aspect-square rounded-full flex items-center hover:text-white bg-gray-200 text-gray-200 border border-gray justify-center relative",
          active ? "bg-primary" : "bg-white"
        )}
        whileHover={{
          backgroundColor: "#CC2B52", 
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={`flex items-center justify-center ${active ? 'text-white' : 'text-black'}`}
        >
          {icon}
        </motion.div>
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute left-1/2 -translate-x-1/2 -top-7 w-fit text-xs px-2 py-0.5 rounded-md bg-primary border text-white border-gray-200"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

