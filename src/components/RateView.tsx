import React from 'react'

const RateView = () => {

     const stats = [
  { value: "2M+", label: "Cars Serviced" },
  { value: "1000+", label: "Service Centers" },
  { value: "4.8", label: "Customer Rating" },
  { value: "50+", label: "Cities" },
];

  return (
    <div>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 md:mt-16 lg:mt-24">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card border border-border shadow-soft animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default RateView
