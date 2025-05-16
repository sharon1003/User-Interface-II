import "./Animated.css";

// components/BubbleBackground.tsx
const AnimatedBackground = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            // className={`absolute w-16 h-16 bg-pink-400 opacity-60 rounded-full animate-bubble`}
            className="sakura"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${20 + Math.random() * 10}s`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>
    );
  };
  
  export default AnimatedBackground;
  