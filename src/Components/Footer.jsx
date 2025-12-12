import React from "react";

// --- SVG Icons for Social Links ---
const GitHubIcon = (props) => (
  <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    ></path>
  </svg>
);

const LinkedInIcon = (props) => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = (props) => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.06 9.06 0 0 1-2.88 1.1A4.52 4.52 0 0 0 12.07 5c0 .35.04.7.11 1.03A12.84 12.84 0 0 1 1.64 2.16a4.48 4.48 0 0 0-.61 2.27A4.5 4.5 0 0 0 3.1 8.9a4.41 4.41 0 0 1-2.05-.57v.06a4.52 4.52 0 0 0 3.62 4.43c-.5.14-1.02.17-1.56.06a4.53 4.53 0 0 0 4.22 3.14A9.07 9.07 0 0 1 1 19.54a12.78 12.78 0 0 0 6.92 2.04c8.3 0 12.84-6.87 12.84-12.83l-.01-.58A9.22 9.22 0 0 0 23 3z" />
  </svg>
);

const YouTubeIcon = (props) => (
  <svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M23.5 6.2s-.2-1.7-.8-2.4c-.8-.9-1.7-.9-2.1-1-2.9-.2-7.3-.2-7.3-.2h-.1s-4.4 0-7.3.2c-.4.1-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S.2 8 .2 9.7v.6c0 1.7.3 3.5.3 3.5s.2 1.7.8 2.4c.8.9 1.8.9 2.3 1 1.7.1 7 0 7 0s4.4 0 7.3-.2c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.4.8-2.4s.3-1.8.3-3.5v-.6c0-1.7-.3-3.5-.3-3.5zM9.8 15.6V8.4l6.2 3.6-6.2 3.6z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-4 md:px-20 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>Made by Hussain Abbas in {new Date().getFullYear()}.</p>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/imzany1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/hussain-abbas-3ab383220/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.instagram.com/im_zany1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/imzany1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="Twitter"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="YouTube"
          >
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
