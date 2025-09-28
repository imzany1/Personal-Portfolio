import React from "react";
import { useInView } from "react-intersection-observer";
import ochiImage from "/public/OCHI.webp";
import codeReviewerImage from "/public/CodeReviewer.webp";

// --- SVG Icons ---
const GitHubIcon = () => (
  <svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    height="24"
    width="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// --- Updated Project Data ---
const projectsData = [
  {
    title: "Creative Portfolio",
    description:
      "A modern portfolio website showcasing creative projects with smooth animations and responsive design using React and TailwindCSS.",
    tech: ["React", "TailwindCSS"],
    image: ochiImage,
    liveUrl: "https://ochi-imzany1.netlify.app/",
    githubUrl: "https://github.com/imzany1/Ochi",
  },
  {
    title: "Online Code Reviewer",
    description:
      "A web application that allows users to submit code snippets for review, providing feedback and suggestions using Gemini API.",
    tech: ["React", "Express", "Node", "CSS3", "GeminiAPI"],
    image: codeReviewerImage,
    liveUrl: "https://code-reviewer-1-8afe.onrender.com/",
    githubUrl: "https://github.com/imzany1/Code-reviewer",
  },
];

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animationDelay = { transitionDelay: `${index * 100}ms` };

  return (
    <div
      ref={ref}
      style={animationDelay}
      id="projects"
      className={`fade-in-up ${
        inView ? "is-visible" : ""
      } bg-gray-800/50 border border-white/10 rounded-lg overflow-hidden group transition-all duration-300 hover:border-green-400/60 hover:shadow-2xl hover:shadow-green-500/10 flex flex-col`}>
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-green-900/50 text-green-300 text-sm rounded-full">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-6 mt-auto pt-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the live project"
            className="flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300">
            <ExternalLinkIcon />
            <span>Live Demo</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View the project on GitHub"
            className="flex items-center gap-2 text-white hover:text-green-400 transition-colors duration-300">
            <GitHubIcon />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured <span className="text-green-400">Projects</span>
        </h2>
        {/* UPDATED GRID: This now centers the two cards perfectly on large screens */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
