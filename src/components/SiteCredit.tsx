/**
 * Credit strip at the very bottom of this demo.
 *
 * This is a portfolio piece: the brand shown is fictional, the build is real.
 * The links point back to the portfolio and to this project's case study.
 */
const link: React.CSSProperties = {
  color: '#b9b3ff',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
};

export function SiteCredit() {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: '#0a0a0c',
        color: '#8a8a90',
        font: '400 13px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif',
        padding: '18px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px 20px',
        }}
      >
        <span>
          Design &amp; build by{' '}
          <a href="https://balintfazekas.hu/" style={link}>
            Bálint Fazekas
          </a>
        </span>
        <a href="https://balintfazekas.hu/en/projects/reach/" style={link}>
          Case study →
        </a>
      </div>
    </div>
  );
}
