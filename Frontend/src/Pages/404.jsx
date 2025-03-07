
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function NotFoundPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-primary"
      
    >
      <div
        className={`bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-[#7b2240]/10 to-[#9c3353]/10 animate-pulse"></div>
          </div>
          <h1 className="relative text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#7b2240] to-[#9c3353] animate-bounce">
            404
          </h1>
        </div>

        <h2
          className={`text-2xl font-semibold text-gray-800 mb-4 transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          Page Not Found
        </h2>

        <p
          className={`text-gray-600 mb-8 transition-all duration-700 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div
          className={`transition-all duration-700 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-[#7b2240] to-[#9c3353] text-white font-medium px-6 py-3 rounded-md hover:shadow-lg transform transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Return Home
          </Link>
        </div>
      </div>

      <div
        className={`mt-12 text-center text-white transition-all duration-700 delay-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-2">India's Best Matrimony Website</h2>
        <p className="text-sm opacity-75">© {new Date().getFullYear()} All Rights Reserved</p>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              animation: `float infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}

export default NotFoundPage

