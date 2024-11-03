'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchProjects();
  }, [supabase]);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('blog_project')
      .select('*')
      .order('priority_order', { ascending: true });

    console.log('projects data: ', data);
    data && setProjects(data);
    setLoading(false);
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
          {projects.map((project: any) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              {project.image_url1 && (
                <div className="w-full mb-4">
                  <div className="aspect-video relative overflow-hidden rounded-md">
                    <img
                      src={project.image_url1}
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
                  {project.content}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.other_link && (
                    <a
                      href={project.other_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {project.other_link_title || 'More Info'}
                    </a>
                  )}
                </div>
                <div className="text-gray-400 text-xs space-y-1">
                  <p>Completed: {formatDate(project.completed_on)}</p>
                  <p>Last updated: {formatDate(project.updated_on)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
