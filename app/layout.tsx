import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_ORIGIN ?? 'http://localhost:3000'),
  title: '四级成绩查询 · 界面演示',
  description: '一个不收集真实账号信息的大学英语四级成绩查询界面演示。',
  openGraph: {
    title: '四级成绩查询 · 界面演示',
    description: '清晰查看总分与分项成绩。本页为非官方界面演示。',
    images: [{ url: '/og.png', alt: '四级成绩查询界面演示' }],
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '四级成绩查询 · 界面演示',
    description: '清晰查看总分与分项成绩。本页为非官方界面演示。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
