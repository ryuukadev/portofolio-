import './TechStack.css';

const techStack = [
  {
    name: 'React.js',
    logo: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#61DAFB" strokeWidth="1.5"/>
        <path d="M12 2.5C17.5 2.5 21.5 5.5 21.5 10C21.5 14.5 17.5 17.5 12 17.5C6.5 17.5 2.5 14.5 2.5 10C2.5 5.5 6.5 2.5 12 2.5Z" stroke="#61DAFB" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" fill="#61DAFB"/>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    logo: (
      <svg viewBox="0 0 24 24" fill="#3178C6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4Z"/>
        <path d="M8 9H10V15H8V9ZM14 9H16V11H14V9ZM14 13H16V15H14V13Z" fill="white"/>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    logo: (
      <svg viewBox="0 0 24 24" fill="#06B6D4" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM12 9L8.5 10.8V13.2L12 15V9ZM12 9L15.5 10.8V13.2L12 15V9Z"/>
      </svg>
    )
  },
  {
    name: 'HTML5',
    logo: (
      <svg viewBox="0 0 24 24" fill="#E34F26" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM8 11H10V13H8V11ZM8 15H16V17H8V15ZM14 11H16V13H14V11Z" fill="white"/>
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#E34F26" strokeWidth="0.5" fill="none"/>
      </svg>
    )
  },
  {
    name: 'CSS3',
    logo: (
      <svg viewBox="0 0 24 24" fill="#1572B6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM8 11H10V13H8V11ZM8 15H16V17H8V15ZM14 11H16V13H14V11Z" fill="white"/>
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#1572B6" strokeWidth="0.5" fill="none"/>
      </svg>
    )
  },
  {
    name: 'PHP',
    logo: (
      <svg viewBox="0 0 24 24" fill="#777BB4" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM8 11V13H11V11H8ZM8 15V17H11V15H8ZM13 11V17H16V11H13Z" fill="white"/>
      </svg>
    )
  },
  {
    name: 'Laravel',
    logo: (
      <svg viewBox="0 0 24 24" fill="#FF2D20" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM8 11V13H11V11H8ZM8 15V17H11V15H8ZM13 11V17H16V11H13Z" fill="white"/>
        <ellipse cx="12" cy="12" rx="3" ry="3" fill="white" opacity="0.2"/>
      </svg>
    )
  },
  {
    name: 'Next.js',
    logo: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM8 11V13H11V11H8ZM8 15V17H11V15H8ZM13 11V17H16V11H13Z" fill="black"/>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    logo: (
      <svg viewBox="0 0 24 24" fill="#F7DF1E" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM8 11V13H11V11H8ZM8 15V17H11V15H8ZM13 11V17H16V11H13Z" fill="black"/>
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#F7DF1E" strokeWidth="0.5" fill="none"/>
      </svg>
    )
  },
  {
    name: 'MySQL',
    logo: (
      <svg viewBox="0 0 24 24" fill="#4479A1" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L20.5 8.5V15.5L12 20L3.5 15.5V8.5L12 4ZM4 10V14H20V10H4ZM4 14V10L12 7L20 10V14L12 17L4 14Z" fill="white"/>
      </svg>
    )
  }
];

export const TechStack = () => {
  return (
    <section className="tech-stack" aria-labelledby="tech-stack-title">
      <div className="tech-stack-container">
        <header className="tech-stack-header">
          <h2 id="tech-stack-title" className="tech-stack-title">Keahlian / Tech Stack</h2>
        </header>
        <div className="tech-stack-grid" role="list">
          {techStack.map((tech, index) => (
            <article key={index} className="tech-card" role="listitem">
              <div className="tech-card-logo" aria-hidden="true">
                {tech.logo}
              </div>
              <h3 className="tech-card-name">{tech.name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};