import { GitHubIcon, LinkedInIcon, ResumeIcon } from './Icons'
import { useReveal } from '../useReveal'
import './contact.css'

export default function Contact() {
  const ref = useReveal<HTMLElement>()
  return (
    <footer className="contact" id="contact" ref={ref}>
      <div className="container contact__inner">
        <p className="mono-label reveal">05 &middot; Contact</p>
        <h2 className="contact__heading reveal reveal--zoom" style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}>
          Get in <span className="grad-text">touch.</span>
        </h2>
        <p className="contact__sub reveal" style={{ '--reveal-delay': '0.2s' } as React.CSSProperties}>
          If you're hiring, or want to talk about anything on this page, email is the fastest way to reach me.
        </p>

        <div className="contact__actions reveal" style={{ '--reveal-delay': '0.3s' } as React.CSSProperties}>
          <a className="btn btn--primary" href="mailto:pmagapu5@gmail.com">
            pmagapu5@gmail.com
          </a>
          <div className="contact__links">
            <a
              className="contact__icon"
              href="https://github.com/mpraneel"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <GitHubIcon size={22} />
            </a>
            <a
              className="contact__icon"
              href="https://linkedin.com/in/praneel-magapu"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon size={22} />
            </a>
            <a
              className="contact__icon"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Resume PDF"
            >
              <ResumeIcon size={22} />
            </a>
          </div>
        </div>

        <p className="contact__fine mono-label">
          &copy; 2026 Praneel Magapu &middot; praneelmagapu.me
        </p>
      </div>
    </footer>
  )
}
