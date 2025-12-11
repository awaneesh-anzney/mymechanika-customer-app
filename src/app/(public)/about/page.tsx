import React from 'react'
import { Shield, Users, Target, Award, CheckCircle2, Car } from "lucide-react";

const page = () => {

    const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Priya Sharma",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Amit Patel",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Sneha Reddy",
    role: "Customer Success Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in honest pricing and transparent service processes.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make is centered around customer satisfaction.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in every service we provide.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Only genuine parts and certified mechanics work on your car.",
  },
];

const milestones = [
  { year: "2018", event: "MYmechanika founded in Bangalore" },
  { year: "2019", event: "Expanded to 10 cities across India" },
  { year: "2020", event: "Reached 500,000 cars serviced milestone" },
  { year: "2021", event: "Launched mobile app for easier bookings" },
  { year: "2022", event: "Expanded to 50+ cities" },
  { year: "2023", event: "Crossed 2 million happy customers" },
];

  return (
    <div className="flex flex-col gap-12 lg:gap-24 py-12 lg:py-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Car className="w-4 h-4" />
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Trusted <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Car Care Partner</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              MyMechanika is India's leading car service platform, dedicated to making car maintenance simple, affordable, and hassle-free for millions of car owners.
            </p>
          </div>
        </div>
      </div>
         {/* Story Section */}
         <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Revolutionizing Car Service in India
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2018, MYmechanika started with a simple mission: to bring transparency and convenience to car servicing. We noticed that car owners often faced hidden charges, poor quality parts, and unreliable service providers.
              </p>
              <p className="text-muted-foreground mb-4">
                We set out to change this by building a network of certified mechanics, partnering with OEM suppliers, and creating a technology platform that gives car owners complete visibility into their service.
              </p>
              <p className="text-muted-foreground">
                Today, we've serviced over 2 million cars across 50+ cities, and we're just getting started. Our vision is to be every car owner's trusted partner for all their vehicle needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-fade-in">
              {[
                { value: "2M+", label: "Cars Serviced" },
                { value: "50+", label: "Cities" },
                { value: "1000+", label: "Service Centers" },
                { value: "4.8★", label: "Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center"
                >
                  <div className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Values Section */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at MYmechanika.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border shadow-soft text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
         {/* Timeline Section */}
         <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a startup in Bangalore to India's most trusted car service platform.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start gap-6 mb-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-linear-to-br from-primary to-secondary" />
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-16 bg-border" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="p-4 rounded-xl bg-card border border-border shadow-soft">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-foreground font-medium">{milestone.event}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Team Section */}
         <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate team driving MYmechanika's mission forward.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                />
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default page
