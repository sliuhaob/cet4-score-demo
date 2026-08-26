'use client';

import { FormEvent, useState } from 'react';

const scoreItems = [
  { label: '听力', score: 188, max: 249, tone: 'cyan' },
  { label: '阅读', score: 211, max: 249, tone: 'blue' },
  { label: '写作与翻译', score: 153, max: 212, tone: 'violet' },
];

export default function Home() {
  const [view, setView] = useState<'query' | 'result'>('query');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account.trim() || !password.trim()) return;

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setView('result');
    }, 520);
  }

  function resetQuery() {
    setView('query');
    setPassword('');
  }

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="CET Score 首页">
          <span className="brand-mark" aria-hidden="true">4</span>
          <span>
            <strong>CET SCORE</strong>
            <small>大学英语四级成绩查询</small>
          </span>
        </a>
        <span className="demo-pill"><i /> 界面演示</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>2026</span> CET-4 RESULT</p>
          <h1>查询你的<br /><em>四级成绩</em></h1>
          <p className="lead">一页完成成绩查询，清晰查看总分与各项表现。</p>

          <div className="feature-row" aria-label="页面特点">
            <span><b>01</b> 快速查询</span>
            <span><b>02</b> 分项成绩</span>
            <span><b>03</b> 本地演示</span>
          </div>
        </div>

        <div className="panel-wrap">
          {view === 'query' ? (
            <section className="query-card" aria-labelledby="query-title">
              <div className="card-heading">
                <span className="step-tag">STEP 01</span>
                <h2 id="query-title">成绩查询</h2>
                <p>输入演示账号与密码继续</p>
              </div>

              <form onSubmit={handleSubmit}>
                <label className="field">
                  <span>账号</span>
                  <div className="input-shell">
                    <span className="field-icon" aria-hidden="true">ID</span>
                    <input
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      value={account}
                      onChange={(event) => setAccount(event.target.value)}
                      placeholder="输入任意演示账号"
                      aria-describedby="privacy-note"
                      required
                    />
                  </div>
                </label>

                <label className="field">
                  <span>查询密码</span>
                  <div className="input-shell">
                    <span className="field-icon lock-icon" aria-hidden="true">••</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="off"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="输入任意演示密码"
                      required
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      aria-label={showPassword ? '隐藏密码' : '显示密码'}
                    >
                      {showPassword ? '隐藏' : '显示'}
                    </button>
                  </div>
                </label>

                <p className="privacy-note" id="privacy-note">
                  <span aria-hidden="true">✓</span>
                  仅用于界面演示，请勿输入真实账密。内容不会上传或保存。
                </p>

                <button className="primary-button" type="submit" disabled={loading}>
                  <span>{loading ? '查询中…' : '查询成绩'}</span>
                  <b aria-hidden="true">→</b>
                </button>
              </form>

              <div className="card-footer">
                <span>演示数据</span>
                <span>LOCAL ONLY</span>
              </div>
            </section>
          ) : (
            <section className="result-card" aria-labelledby="result-title">
              <div className="result-topline">
                <span className="step-tag">RESULT</span>
                <button type="button" onClick={resetQuery}>重新查询</button>
              </div>

              <div className="student-line">
                <div className="avatar" aria-hidden="true">周</div>
                <div>
                  <p>演示考生</p>
                  <h2 id="result-title">周同学</h2>
                </div>
                <span className="status-badge">成绩有效</span>
              </div>

              <div className="total-score">
                <div>
                  <span>四级总分</span>
                  <strong>552</strong>
                  <small>/ 710</small>
                </div>
                <div className="score-ring" aria-label="总分 552，满分 710">
                  <span>78<sup>%</sup></span>
                </div>
              </div>

              <div className="score-list">
                {scoreItems.map((item) => (
                  <div className="score-item" key={item.label}>
                    <div className="score-label">
                      <span>{item.label}</span>
                      <b>{item.score}<small> / {item.max}</small></b>
                    </div>
                    <div className="progress-track">
                      <span
                        className={`progress-fill ${item.tone}`}
                        style={{ width: `${Math.round((item.score / item.max) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="result-note">
                <span aria-hidden="true">i</span>
                以上为固定演示成绩，与任何真实考生无关。
              </p>
            </section>
          )}
        </div>
      </section>

      <footer>
        <p>非官方页面 · 仅用于交互与视觉展示</p>
        <span>CET-4 UI CONCEPT © 2026</span>
      </footer>
    </main>
  );
}
