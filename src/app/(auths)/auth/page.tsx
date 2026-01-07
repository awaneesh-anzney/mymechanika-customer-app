"use client"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { AuthForm } from "@/components/auth/AuthForm";

const AuthContent = () => {
  const { t, i18n } = useTranslation('auth');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeT = mounted ? t : i18n.getFixedT('en', 'auth');

  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const mode = searchParams?.get("mode");
    setIsLogin(mode !== "register");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <AuthBranding activeT={activeT} />
      <AuthForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        activeT={activeT}
      />
    </div>
  )
}

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
}

export default Page


