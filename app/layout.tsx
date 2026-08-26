import type { Metadata } from 'next';
import './globals.css';

const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'http://localhost:3000'
).replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(`${siteOrigin}/`),
  title: '全国大学英语四级考试 (CET4) 成绩查询 - 中国教育考试网',
  description: '全国大学英语四、六级考试 (CET) 成绩查询与成绩报告单。',
  openGraph: {
    title: '全国大学英语四级考试 (CET4) 成绩查询 - 中国教育考试网',
    description: '全国大学英语四、六级考试 (CET) 成绩查询与成绩报告单。',
    images: [{ url: `${siteOrigin}/og.png`, alt: '全国大学英语四级考试成绩查询' }],
    type: 'website',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '全国大学英语四级考试 (CET4) 成绩查询 - 中国教育考试网',
    description: '全国大学英语四、六级考试 (CET) 成绩查询与成绩报告单。',
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
