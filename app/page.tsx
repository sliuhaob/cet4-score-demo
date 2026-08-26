'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const navItems = [
  '考试动态',
  '通知公告',
  '考试服务',
  '在线报名',
  '成绩查询',
  '证明服务',
  '学习资料',
];

const questions = [
  '忘记准考证号怎么办？',
  '成绩查询结果有疑问如何处理？',
  '如何获取电子成绩报告单？',
  '成绩核查申请流程是怎样的？',
];

function PortalHeader() {
  return (
    <>
      <header className="portal-header">
        <div className="portal-container header-inner">
          <a className="portal-brand" href="#top" aria-label="四级成绩查询首页">
            <span className="seal" aria-hidden="true">
              <span>CET</span>
            </span>
            <span className="brand-copy">
              <strong>全国大学英语等级考试</strong>
              <small>COLLEGE ENGLISH TEST</small>
            </span>
          </a>

          <div className="header-tools">
            <div className="utility-links">
              <span>关于我们</span>
              <i />
              <span>ENGLISH</span>
            </div>
            <div className="site-search" aria-label="站内搜索">
              <input type="search" placeholder="请输入关键字" aria-label="站内搜索" />
              <button type="button" aria-label="搜索">⌕</button>
            </div>
          </div>
        </div>
      </header>

      <nav className="main-nav" aria-label="主导航">
        <div className="portal-container nav-inner">
          <a className="home-tab" href="#top" aria-label="首页">⌂</a>
          {navItems.map((item) => (
            <span
              className={`nav-item${item === '成绩查询' ? ' active' : ''}`}
              aria-current={item === '成绩查询' ? 'page' : undefined}
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
          <li>选择要查询的考试项目。</li>
          <li>输入姓名和证件号码/准考证号。</li>
          <li>点击查询即可查看成绩详情。</li>
        </ol>
      </section>
    </aside>
  );
}

function QueryView({ onResult }: { onResult: (name?: string) => void }) {
  const [account, setAccount] = useState('');
  const [queryCode, setQueryCode] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account.trim() || !queryCode.trim()) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onResult(account.trim());
    }, 420);
  }

  return (
    <div className="content-grid">
      <section className="query-content" aria-labelledby="query-title">
        <h1 id="query-title">2026年上半年全国大学英语四级考试 成绩查询</h1>

        <form className="query-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="exam">考试科目：</label>
            <select id="exam" defaultValue="cet4">
              <option value="cet4">全国大学英语四级考试 (CET4)</option>
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="account">姓　　名：</label>
            <input
              id="account"
              type="text"
              autoComplete="off"
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              placeholder="请输入姓名"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="query-code">证件号码 / 准考证号：</label>
            <input
              id="query-code"
              type="text"
              autoComplete="off"
              value={queryCode}
              onChange={(event) => setQueryCode(event.target.value)}
              placeholder="请输入证件号码或准考证号"
              required
            />
          </div>

          <button className="query-button" type="submit" disabled={loading}>
            {loading ? '查询中…' : '查询'}
          </button>
        </form>

        <div className="warm-notice">
          <strong>温馨提示：</strong>
          <p>1. 请仔细核对输入的姓名及证件号码/准考证号。</p>
          <p>2. 如对成绩有异议，请在规定时间内向所在学校考点申请复查。</p>
        </div>
      </section>

      <HelpSidebar />
    </div>
  );
}

function ResultView({ name = '仲天佑', onBack }: { name?: string; onBack: () => void }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <section className="result-page" aria-labelledby="result-title">
      <div className="result-sheet">
        <h1 id="result-title" ref={titleRef} tabIndex={-1}>全国大学英语四级考试 (CET4) 成绩详情</h1>

        <dl className="candidate-info">
          <div><dt>姓　　名：</dt><dd>{name || '仲天佑'}</dd></div>
          <div><dt>学　　校：</dt><dd>苏州科技大学</dd></div>
          <div><dt>成绩报告单编号：</dt><dd>261132502002483</dd></div>
        </dl>

        <section className="score-section" aria-labelledby="written-title">
          <h2 id="written-title">笔试成绩</h2>
          <dl className="score-details">
            <div><dt>准考证号：</dt><dd>325021261104819</dd></div>
            <div className="total-row"><dt>总　　分：</dt><dd>594</dd></div>
            <div className="subscore-row"><dt>听　　力：</dt><dd>211</dd></div>
            <div className="subscore-row"><dt>阅　　读：</dt><dd>206</dd></div>
            <div className="subscore-row"><dt>写作和翻译：</dt><dd>177</dd></div>
          </dl>
        </section>

        <section className="score-section" aria-labelledby="oral-title">
          <h2 id="oral-title">口试成绩</h2>
          <dl className="score-details compact">
            <div><dt>准考证号：</dt><dd>--</dd></div>
            <div><dt>成　　绩：</dt><dd>--</dd></div>
          </dl>
        </section>

        <div className="result-notice">
          自2026年上半年CET考试起，不再提供纸质成绩报告单。
        </div>

        <button className="back-button" type="button" onClick={onBack}>
          返 回
        </button>
      </div>
    </section>
  );
}

export default function Home() {
  const [view, setView] = useState<'query' | 'result'>('query');
  const [name, setName] = useState('仲天佑');

  return (
    <main className="portal-shell" id="top">
      <PortalHeader />
      <p className="sr-only" role="status" aria-live="polite">
        {view === 'result' ? '已显示成绩详情' : '已显示成绩查询表单'}
      </p>
      <div className="portal-container page-content" id="content">
        {view === 'query' ? (
          <QueryView
            onResult={(submittedName) => {
              if (submittedName) setName(submittedName);
              setView('result');
            }}
          />
        ) : (
          <ResultView name={name} onBack={() => setView('query')} />
        )}
      </div>
      <footer className="portal-footer">
        <div className="portal-container">
          <p>中国教育考试网 版权所有</p>
          <span>CET SCORE © 2026</span>
        </div>
      </footer>
    </main>
  );
}
