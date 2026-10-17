'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { localePath } from '@/lib/i18n/localePath';
import Icon from '@/components/ui/branding/Icon';

type Copy = { h: string; lead: string; items: [string, string][]; note: string; cta: string };

/** Apsiyon kullanımı: yalnızca işletmeden doğrulanan kapsam (ödeme, borç/ödeme geçmişi, duyuru-talep, hatırlatma, gelir-gider görünürlüğü). */
const COPY: Record<string, Copy> = {
  tr: {
    h: 'Apsiyon ile aidat: sakinler neyi nasıl yapar?',
    lead: "Alo Yönetim, Apsiyon ile anlaşmalı çalışır. Yönetimini devraldığımız site veya tesisin uygulamasını doğrudan Apsiyon'a bağlarız. Aşağıdakiler Apsiyon'un sunduğu özelliklerdir; kapsamı Apsiyon'un güncel özelliklerine ve site ayarlarına göre değişebilir.",
    items: [
      ['Kredi kartıyla online ödeme', 'Aidat ödemesi Apsiyon üzerinden yapılır; ödeme işlemi Apsiyon altyapısında gerçekleşir.'],
      ['Borç ve ödeme geçmişi', 'Kat malikleri ve kiracılar kendi borçlarını ve geçmiş ödemelerini görüntüler.'],
      ['Duyuru, talep ve arıza bildirimi', 'Sakinler duyuruları takip eder, talep ve arıza bildirimini uygulamadan iletir.'],
      ['Hatırlatma bildirimleri', 'Hatırlatmalar Apsiyon üzerinden gönderilir.'],
      ['Gelir-gider şeffaflığı', 'Sitenin gelir-gider bilgilerinin büyük bölümü sakinlere gösterilir; gösterilecek bilgiler ayarlara göre değişir.'],
    ],
    note: 'Ödeme, bildirim ve görüntüleme özellikleri Apsiyon hizmetidir.',
    cta: 'Sakin uygulaması ve giriş',
  },
  en: {
    h: 'Dues with Apsiyon: what residents can do',
    lead: "Alo Yönetim works with Apsiyon under an agreement. When we take over the management of a complex or facility, we connect its app directly to Apsiyon. The items below are features provided by Apsiyon; their scope may vary with Apsiyon's current features and the site's settings.",
    items: [
      ['Online payment by credit card', 'Dues are paid through Apsiyon; the payment is processed on Apsiyon\'s infrastructure.'],
      ['Balance and payment history', 'Owners and tenants can view their own balance and past payments.'],
      ['Announcements, requests and fault reports', 'Residents follow announcements and submit requests and fault reports from the app.'],
      ['Reminder notifications', 'Reminders are sent through Apsiyon.'],
      ['Income and expense transparency', 'Most of the complex\'s income and expense information is shown to residents; what is shown depends on settings.'],
    ],
    note: 'Payment, notification and viewing features are Apsiyon services.',
    cta: 'Resident app and login',
  },
  ru: {
    h: 'Взносы через Apsiyon: что могут делать жители',
    lead: 'Alo Yönetim работает с Apsiyon по соглашению. Когда мы принимаем управление комплексом или объектом, мы подключаем его приложение напрямую к Apsiyon. Ниже перечислены функции, которые предоставляет Apsiyon; их состав может меняться в зависимости от текущих возможностей Apsiyon и настроек комплекса.',
    items: [
      ['Онлайн-оплата банковской картой', 'Взносы оплачиваются через Apsiyon; платёж обрабатывается на платформе Apsiyon.'],
      ['Задолженность и история платежей', 'Собственники и арендаторы видят собственную задолженность и прошлые платежи.'],
      ['Объявления, заявки и сообщения о неисправностях', 'Жители следят за объявлениями и отправляют заявки и сообщения о неисправностях из приложения.'],
      ['Напоминания', 'Напоминания отправляются через Apsiyon.'],
      ['Прозрачность доходов и расходов', 'Большая часть информации о доходах и расходах комплекса показывается жителям; набор данных зависит от настроек.'],
    ],
    note: 'Функции оплаты, уведомлений и просмотра — это услуги Apsiyon.',
    cta: 'Приложение для жителей и вход',
  },
  ar: {
    h: 'المساهمات عبر Apsiyon: ماذا يستطيع السكان فعله',
    lead: 'تعمل Alo Yönetim مع Apsiyon بموجب اتفاق. وعندما نتولى إدارة مجمع أو منشأة نربط تطبيقها مباشرة بـApsiyon. والبنود التالية ميزات تقدمها Apsiyon؛ وقد يختلف نطاقها بحسب ميزات Apsiyon الحالية وإعدادات الموقع.',
    items: [
      ['الدفع الإلكتروني بالبطاقة الائتمانية', 'تُدفع المساهمات عبر Apsiyon؛ وتتم معالجة الدفع على منصة Apsiyon.'],
      ['الرصيد المستحق وسجل الدفعات', 'يطّلع الملاك والمستأجرون على مستحقاتهم ودفعاتهم السابقة.'],
      ['الإعلانات والطلبات وبلاغات الأعطال', 'يتابع السكان الإعلانات ويرسلون الطلبات وبلاغات الأعطال من التطبيق.'],
      ['إشعارات التذكير', 'تُرسل التذكيرات عبر Apsiyon.'],
      ['شفافية الإيرادات والمصروفات', 'يُعرض على السكان معظم معلومات إيرادات المجمع ومصروفاته؛ وتختلف المعلومات المعروضة بحسب الإعدادات.'],
    ],
    note: 'ميزات الدفع والإشعارات والعرض هي خدمات Apsiyon.',
    cta: 'تطبيق السكان وتسجيل الدخول',
  },
};

export default function ApsiyonResidentPortalSection() {
  const { language } = useLanguage();
  const c = COPY[language] ?? COPY.tr;
  return (
    <section
      aria-labelledby="apsiyon-portal-heading"
      className="bg-[var(--color-surface)] border border-[var(--color-outline)]/60 rounded-[2rem] p-8 md:p-10 flex flex-col gap-6"
    >
      <h2 id="apsiyon-portal-heading" className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary)]">
        {c.h}
      </h2>
      <p className="text-sm md:text-base text-[var(--color-secondary)] font-light leading-relaxed max-w-3xl">{c.lead}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {c.items.map(([title, text]) => (
          <li key={title} className="flex items-start gap-3 rounded-2xl border border-[var(--color-outline)]/60 p-5">
            <Icon name="check_circle" className="text-slate-600 shrink-0" />
            <span className="flex flex-col gap-1">
              <strong className="text-sm text-[var(--color-primary)]">{title}</strong>
              <span className="text-sm text-[var(--color-secondary)] font-light leading-relaxed">{text}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-[var(--color-secondary)]">{c.note}</p>
      <Link
        href={localePath('/app', language)}
        className="self-start text-sm font-bold text-[var(--color-primary)] underline underline-offset-4 hover:opacity-80"
      >
        {c.cta}
      </Link>
    </section>
  );
}
