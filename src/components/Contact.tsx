import { GitHubIcon, LinkedInIcon, ResumeIcon } from './Icons'
import './contact.css'

export default function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="container contact__inner">
        <p className="mono-label">05 &middot; Contact</p>
        <h2 className="contact__heading">
          Get in <span className="accent-text">touch.</span>
        </h2>
        <p className="contact__sub">
          If you're hiring, or want to talk about anything on this page, email is the fastest way to reach me.
        </p>

        <div className="contact__actions">
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
