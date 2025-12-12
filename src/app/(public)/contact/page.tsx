"use client"
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const page = () => {

    const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+91 1800-123-4567",
    subtext: "Toll-free, 24/7 available",
  },
  {
    icon: Mail,
    title: "Email",
    details: "support@mymechanika.com",
    subtext: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    title: "Head Office",
    details: "Bangalore, Karnataka",
    subtext: "HSR Layout, Sector 7",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: "Mon - Sun: 7AM - 10PM",
    subtext: "Including public holidays",
  },
];

const faqs = [
  {
    question: "How do I book a service?",
    answer: "You can book a service through our app or website by selecting your car, choosing a service, and picking a convenient time slot.",
  },
  {
    question: "Do you provide pickup and drop?",
    answer: "Yes! We offer free pickup and drop service for all major services within city limits.",
  },
  {
    question: "What warranty do you provide?",
    answer: "We provide 1000km or 1 month warranty on all services and spare parts.",
  },
  {
    question: "How can I track my service?",
    answer: "Once your car is picked up, you can track the service status in real-time through your dashboard.",
  },
];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Message Sent!", {
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
        {/* Hero Section */}
     <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative py-12 md:py-24">
          <div className="text-center max-w-3xl mx-auto animate-slide-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Headphones className="w-4 h-4" />
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              We're Here to <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Help</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions or need assistance? Our support team is available 24/7 to help you with anything you need.
            </p>
          </div>
        </div>
         {/* Contact Info Cards */}
         <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{info.title}</h3>
                <p className="text-primary font-medium mb-1">{info.details}</p>
                <p className="text-sm text-muted-foreground">{info.subtext}</p>
              </div>
            ))}
          </div>

          {/* Contact Form & FAQ */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Send us a Message</h2>
                  <p className="text-muted-foreground text-sm">Fill out the form and we'll respond promptly</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl"
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="rounded-xl resize-none"
                />
                <Button type="submit" size="lg" className="w-full bg-linear-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Frequently Asked</h2>
                  <p className="text-muted-foreground text-sm">Quick answers to common questions</p>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-card border border-border shadow-soft"
                  >
                    <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="container mx-auto px-4 pb-10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Find Us</h2>
            <p className="text-muted-foreground">Visit our head office or any of our 1000+ service centers</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-soft h-[300px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.9554486648047!2d77.6309395!3d12.9141417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148bfe1a4a65%3A0x2c694c3f2cb35884!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MYmechanika Location"
            />
          </div>
        </div>


    </div>
  )
}

export default page

