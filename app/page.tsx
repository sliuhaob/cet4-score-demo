'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const navItems = [
  '考试动态',
  '通知公告',
  '考试服务',
  '在线报名',
  '成绩演示',
  '证明服务',
  '学习资料',
];

const questions = [
  '忘记演示查询码怎么办？',
  '为什么查询页显示固定成绩？',
  '如何返回修改输入内容？',
  '本页可以查询真实成绩吗？',
];

function PortalHeader() {
  return (
    <>
      <header className="portal-header">
        <div className="portal-container header-inner">
          <a className="portal-brand" href="#top" aria-label="四级成绩查询演示首页">
            <span className="seal" aria-hidden="true">
              <span>CET</span>
            </span>
            <span className="brand-copy">
              <strong>全国大学英语等级考试</strong>
              <small>COLLEGE ENGLISH TEST · SCORE DEMO</small>
            </span>
            <span className="unofficial-badge">非官方演示</span>
          </a>

          <div className="header-tools">
            <div className="utility-links">
              <span>关于本页</span>
              <i />
              <span>ENGLISH</span>
            </div>
            <div className="site-search" aria-label="站内搜索（界面演示）">
              <input type="search" placeholder="请输入关键字" aria-label="站内搜索（不可用）" disabled />
              <button type="button" aria-label="搜索功能仅作界面演示" disabled>⌕</button>
            </div>
          </div>
        </div>
      </header>

      <nav className="main-nav" aria-label="主导航">
        <div className="portal-container nav-inner">
          <a className="home-tab" href="#top" aria-label="首页">⌂</a>
          {navItems.map((item) => (
            <span
              className={`nav-item${item === '成绩演示' ? ' active' : ''}`}
              aria-current={item === '成绩演示' ? 'page' : undefined}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      <div className="breadcrumb-bar">
        <div className="portal-container breadcrumb-inner">
          <span><b aria-hidden="true">⌂</b> 首页 <i>&gt;</i> 成绩查询</span>
          <span className="demo-account">● 非官方网站 <i /> 仅供演示</span>
        </div>
      </div>
    </>
  );
}

function HelpSidebar() {
  return (
    <aside className="help-sidebar" aria-label="查询帮助">
      <section className="side-section">
        <h2><i />常见问题</h2>
        <ol className="faq-list">
          {questions.map((question, index) => (
            <li key={question}><span>Q{index + 1}:</span> {question}</li>
          ))}
        </ol>
      </section>

      <section className="side-section">
        <h2><i />操作说明</h2>
        <ol className="instruction-list">
          <li>选择要演示的考试项目。</li>
              <li>输入任意演示姓名和演示查询号。</li>
          <li>点击查询后，页面将列出固定的虚构成绩。</li>
        </ol>
      </section>

      <section className="side-section safety-section">
        <h2><i />安全提示</h2>
        <p><b>请勿输入真实账号、密码、姓名或证件号。</b></p>
        <p>本页不连接任何考试系统，输入内容不会上传或保存。</p>
      </section>
    </aside>
  );
}

function QueryView({ onResult }: { onResult: () => void }) {
  const [account, setAccount] = useState('');
  const [queryCode, setQueryCode] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account.trim() || !queryCode.trim()) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onResult();
    }, 420);
  }

  return (
    <div className="content-grid">
      <section className="query-content" aria-labelledby="query-title">
        <h1 id="query-title">2026年上半年全国大学英语四级考试 成绩查询</h1>
        <span className="title-demo-mark">界面演示 · DEMO</span>

        <form className="query-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="exam">考试科目：</label>
            <select id="exam" defaultValue="cet4">
              <option value="cet4">全国大学英语四级考试 (CET4)</option>
            </select>
          </div>

          <div className="form-row form-row-with-tip">
            <label htmlFor="account">演示姓名：</label>
            <input
              id="account"
              type="text"
              autoComplete="off"
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              placeholder="请输入任意演示姓名"
              aria-describedby="input-tip"
              required
            />
            <p className="input-tip" id="input-tip">
              <span aria-hidden="true">◉</span>
              只需输入任意演示字符，请勿填写真实个人信息。
            </p>
          </div>

          <div className="form-row">
            <label htmlFor="query-code">演示查询号：</label>
            <input
              id="query-code"
              type="text"
              autoComplete="off"
              value={queryCode}
              onChange={(event) => setQueryCode(event.target.value)}
              placeholder="请输入任意演示查询号"
              required
            />
          </div>

          <button className="query-button" type="submit" disabled={loading}>
            {loading ? '查询中…' : '查询'}
          </button>
        </form>

        <div className="warm-notice">
          <strong>温馨提示：</strong>
          <p>1. 本页为非官方交互原型，所有成绩和考生资料均为虚构示例。</p>
          <p>2. 页面不会校验、上传或保存任何输入内容。</p>
        </div>

        <div className="history-box">
          <p>历史成绩查询与电子成绩报告单功能仅作界面位置演示。</p>
          <button type="button" disabled>历史成绩查询</button>
        </div>
      </section>

      <HelpSidebar />
    </div>
  );
}

function ResultView({ onBack }: { onBack: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <section className="result-page" aria-labelledby="result-title">
      <div className="result-sheet">
        <div className="result-demo-flag">非官方演示数据</div>
        <h1 id="result-title" ref={titleRef} tabIndex={-1}>全国大学英语四级考试 (CET4) 成绩详情</h1>

        <dl className="candidate-info">
          <div><dt>姓　　名：</dt><dd>演示考生</dd></div>
          <div><dt>证件号码：</dt><dd>34************16</dd></div>
          <div><dt>学　　校：</dt><dd>示例大学</dd></div>
        </dl>

        <section className="score-section" aria-labelledby="written-title">
          <h2 id="written-title">笔试成绩</h2>
          <dl className="score-details">
            <div><dt>准考证号：</dt><dd>DEMO2026CET40001</dd></div>
            <div className="total-row"><dt>总　　分：</dt><dd>552</dd></div>
            <div className="subscore-row"><dt>听　　力：</dt><dd>188</dd></div>
            <div className="subscore-row"><dt>阅　　读：</dt><dd>211</dd></div>
            <div className="subscore-row"><dt>写作和翻译：</dt><dd>153</dd></div>
          </dl>
        </section>

        <section className="score-section" aria-labelledby="oral-title">
          <h2 id="oral-title">口试成绩</h2>
          <dl className="score-details compact">
            <div><dt>准考证号：</dt><dd>--</dd></div>
            <div><dt>成　　绩：</dt><dd>--</dd></div>
          </dl>
        </section>

        <p className="report-number">成绩报告单编号： DEMO-CET4-2026-001</p>

        <div className="result-notice">
          以上内容为固定界面演示数据，与任何真实考生、学校或考试成绩无关。
        </div>

        <button className="back-button" type="button" onClick={onBack}>返回
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<'query' | 'result'>('query');

  return (
    <main className="portal-shell" id="top">
      <PortalHeader />
      <p className="sr-only" role="status" aria-live="polite">
        {view === 'result' ? '已显示演示成绩详情' : '已显示成绩查询表单'}
      </p>
      <div className="portal-container page-content" id="content">
        {view === 'query' ? (
          <QueryView onResult={() => setView('result')} />
        ) : (
          <ResultView onBack={() => setView('query')} />
        )}
      </div>
      <footer className="portal-footer">
        <div className="portal-container">
          <p>非官方页面 · 仅用于交互与视觉展示 · 请勿输入真实个人信息</p>
          <span>CET SCORE UI DEMO © 2026</span>
        </div>
      </footer>
    </main>
  );
}
