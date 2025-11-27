'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  image_url: string | null;
  created_on: Date;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();

      console.log('projects data: ', data);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().slice(0, 10);
  };

  const renderHeading = () => {
    if (loading) {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          Loading projects...
        </h1>
      );
    } else if (!projects.length) {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          No projects added yet.
        </h1>
      );
    } else {
      return (
        <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">
          My Projects
        </h1>
      );
    }
  };

  return (
    <div className="flex justify-center content__container">
      <div className="max-w-6xl w-full">
        {renderHeading()}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              {project.image_url && (
                <div className="w-full mb-4">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      View Project
                    </a>
                  )}
                </div>
                <div className="text-gray-400 text-xs space-y-1">
                  <p>Created: {formatDate(project.created_on)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
