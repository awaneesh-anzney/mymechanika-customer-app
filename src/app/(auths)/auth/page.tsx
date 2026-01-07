"use client"
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/components/auth-provider";
import { AuthBranding } from "@/components/auth/AuthBranding";
import { AuthForm } from "@/components/auth/AuthForm";

const AuthContent = () => {
  const { t, i18n } = useTranslation('auth');
  const [mounted, setMounted] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const activeT = mounted ? t : i18n.getFixedT('en', 'auth');

  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        await register({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
        isSubmitting={isSubmitting}
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


