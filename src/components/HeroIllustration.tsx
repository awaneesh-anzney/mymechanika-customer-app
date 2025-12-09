export function HeroIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-lg aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 rounded-3xl p-8 flex items-center justify-center">
        {/* SVG Illustration */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background elements */}
          <defs>
            <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F52BA" />
              <stop offset="100%" stopColor="#89BD2C" />
            </linearGradient>
          </defs>

          {/* Car Body */}
          <rect
            x="80"
            y="200"
            width="240"
            height="120"
            rx="20"
            fill="url(#carGradient)"
          />
          
          {/* Car Hood */}
          <rect
            x="80"
            y="180"
            width="100"
            height="40"
            rx="15"
            fill="url(#carGradient)"
          />

          {/* Car Windows */}
          <rect
            x="100"
            y="190"
            width="80"
            height="50"
            rx="8"
            fill="#FFFFFF"
            opacity="0.3"
          />
          <rect
            x="200"
            y="190"
            width="80"
            height="50"
            rx="8"
            fill="#FFFFFF"
            opacity="0.3"
          />

          {/* Car Wheels */}
          <circle cx="130" cy="320" r="25" fill="#222222" />
          <circle cx="130" cy="320" r="15" fill="#FFFFFF" />
          <circle cx="270" cy="320" r="25" fill="#222222" />
          <circle cx="270" cy="320" r="15" fill="#FFFFFF" />

          {/* Trunk (open) */}
          <rect
            x="320"
            y="200"
            width="40"
            height="80"
            rx="5"
            fill="#89BD2C"
          />
          {/* Toolbox in trunk */}
          <rect
            x="330"
            y="210"
            width="20"
            height="25"
            rx="3"
            fill="#222222"
          />
          {/* Plant in trunk */}
          <circle cx="340" cy="250" r="8" fill="#89BD2C" />
          <rect x="338" y="250" width="4" height="15" fill="#89BD2C" />

          {/* Mechanic */}
          <g transform="translate(50, 150)">
            {/* Head */}
            <circle cx="0" cy="0" r="20" fill="#FFDBAC" />
            
            {/* Body (shirt) */}
            <rect
              x="-15"
              y="20"
              width="30"
              height="50"
              rx="5"
              fill="#0F52BA"
            />
            
            {/* Arms */}
            <rect
              x="-25"
              y="25"
              width="12"
              height="40"
              rx="6"
              fill="#639FAB"
            />
            <rect
              x="13"
              y="25"
              width="12"
              height="40"
              rx="6"
              fill="#639FAB"
            />
            
            {/* Hands holding tablet */}
            <rect
              x="-5"
              y="60"
              width="10"
              height="8"
              rx="2"
              fill="#FFDBAC"
            />
            <rect
              x="5"
              y="60"
              width="10"
              height="8"
              rx="2"
              fill="#FFDBAC"
            />
            
            {/* Tablet */}
            <rect
              x="-8"
              y="55"
              width="16"
              height="20"
              rx="2"
              fill="#FFFFFF"
              stroke="#222222"
              strokeWidth="1"
            />
            <rect
              x="-6"
              y="58"
              width="12"
              height="14"
              rx="1"
              fill="#0F52BA"
              opacity="0.3"
            />
            
            {/* Legs */}
            <rect
              x="-12"
              y="70"
              width="10"
              height="40"
              rx="5"
              fill="#0F52BA"
            />
            <rect
              x="2"
              y="70"
              width="10"
              height="40"
              rx="5"
              fill="#0F52BA"
            />
            
            {/* Apron */}
            <path
              d="M -15 25 L -15 70 L 15 70 L 15 25 L 0 30 Z"
              fill="#0F52BA"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}


