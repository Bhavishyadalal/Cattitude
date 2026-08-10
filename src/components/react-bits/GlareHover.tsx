const GlareHover = ({
  width = '100%',
  height = '100%',
  background = 'transparent',
  borderRadius = '1rem',
  borderColor = 'rgba(123, 47, 190, 0.2)',
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {}
}: any) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const vars: any = {
    '--gh-width': width,
    '--gh-height': height,
    '--gh-bg': background,
    '--gh-br': borderRadius,
    '--gh-angle': `${glareAngle}deg`,
    '--gh-duration': `${transitionDuration}ms`,
    '--gh-size': `${glareSize}%`,
    '--gh-rgba': rgba,
    '--gh-border': borderColor
  };

  return (
    <div
      className={`glare-hover ${playOnce ? 'glare-hover--play-once' : ''} ${className}`}
      style={{ ...vars, ...style } as React.CSSProperties}
    >
      <style>{`
        .glare-hover {
          width: var(--gh-width);
          height: var(--gh-height);
          background: var(--gh-bg);
          border-radius: var(--gh-br);
          border: 1px solid var(--gh-border);
          overflow: hidden;
          position: relative;
          display: grid;
          place-items: center;
        }

        .glare-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            var(--gh-angle),
            hsla(0, 0%, 0%, 0) 60%,
            var(--gh-rgba) 70%,
            hsla(0, 0%, 0%, 0),
            hsla(0, 0%, 0%, 0) 100%
          );
          transition: var(--gh-duration) ease;
          background-size:
            var(--gh-size) var(--gh-size),
            100% 100%;
          background-repeat: no-repeat;
          background-position:
            -100% -100%,
            0 0;
        }

        .glare-hover:hover {
          cursor: pointer;
        }

        .glare-hover:hover::before {
          background-position:
            100% 100%,
            0 0;
        }

        .glare-hover--play-once::before {
          transition: none;
        }

        .glare-hover--play-once:hover::before {
          transition: var(--gh-duration) ease;
          background-position:
            100% 100%,
            0 0;
        }
      `}</style>
      {children}
    </div>
  );
};

export default GlareHover;
