"use client";
import React from 'react'
import { Smartphone, Download, Globe, CheckCircle2, Wrench } from 'lucide-react'
import { useTranslation } from "react-i18next";

const AppDownload = () => {
  const { t } = useTranslation('home');

  return (
    <div>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-4 items-center max-w-6xl mx-auto">
          <div className="text-center lg:text-left animate-slide-up lg:pr-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              {t("appDownload.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("appDownload.title")} <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">{t("appDownload.titleAccent")}</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              {t("appDownload.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="#"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 12.5c0-1.58-.79-2.97-2-3.79V5c0-.55-.45-1-1-1H9.5c-.55 0-1 .45-1 1v3.71c-1.21.82-2 2.21-2 3.79 0 1.58.79 2.97 2 3.79V20c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-3.71c1.21-.82 2-2.21 2-3.79zM12 16c-1.93 0-3.5-1.57-3.5-3.5S10.07 9 12 9s3.5 1.57 3.5 3.5S13.93 16 12 16z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">{t("appDownload.appStore.label")}</div>
                  <div className="text-lg font-semibold">{t("appDownload.appStore.store")}</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.54.68.54 1.19 0 .51-.2.92-.54 1.19l-2.12 1.24-2.5-2.5 2.5-2.5 2.12 1.38zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">{t("appDownload.googlePlay.label")}</div>
                  <div className="text-lg font-semibold">{t("appDownload.googlePlay.store")}</div>
                </div>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{t("appDownload.features.free")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{t("appDownload.features.rating")}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>{t("appDownload.features.downloads")}</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in flex justify-center lg:justify-center mt-8 lg:mt-0">
            <div className="relative transform scale-90 sm:scale-100">
              <div className="w-64 h-[500px] rounded-[3rem] bg-linear-to-br from-primary to-secondary p-2 shadow-2xl">
                <div className="w-full h-full rounded-[2.5rem] bg-card border border-border overflow-hidden flex flex-col">
                  <div className="h-8 bg-foreground/5 flex items-center justify-center">
                    <div className="w-20 h-1.5 bg-foreground/20 rounded-full" />
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-secondary mx-auto mb-2 flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm">MYmechanika</h4>
                    </div>
                    <div className="space-y-2">
                      {[
                        { key: "book", label: t("appDownload.phoneMockup.book") },
                        { key: "track", label: t("appDownload.phoneMockup.track") },
                        { key: "cars", label: t("appDownload.phoneMockup.cars") },
                        { key: "offers", label: t("appDownload.phoneMockup.offers") }
                      ].map((item, i) => (
                        <div key={item.key} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                            <Download className="w-4 h-4 text-primary-foreground" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-[3rem] -z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppDownload
