import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="absolute top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>
      {children}
    </div>
  );
}
