import type { Metadata } from 'next';
import './globals.css';

const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000'
).replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(`${siteOrigin}/`),
  title: '大学英语四级成绩查询 · 非官方演示',
  description: '仿考试信息门户布局的大学英语四级成绩查询界面演示，不收集或保存任何输入内容。',
  openGraph: {
    title: '大学英语四级成绩查询 · 非官方演示',
    description: '传统考试信息门户风格的查询与成绩详情界面演示。',
    images: [{ url: `${siteOrigin}/og.png`, alt: '大学英语四级成绩查询非官方演示' }],
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '大学英语四级成绩查询 · 非官方演示',
    description: '传统考试信息门户风格的查询与成绩详情界面演示。',
    images: [`${siteOrigin}/og.png`],
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
