import { useState, useEffect } from 'react';

// The raw URL is needed to fetch the actual JSON content
const DATA_URL = 'https://gist.githubusercontent.com/Karthick1242004/7b37c099a9cd7ace30e124d938ba3d88/raw/b3f8518db4388d9e7ae247a4d07b9a65bf386d95/data.json';

// Interface matching the structure in your data.json
interface PortfolioData {
  siteMetadata: {
    title: string;
    description: string;
    generator: string;
  };
  personalInfo: {
    name: string;
    title: string;
    status: string;
    tagline: string;
    shortBio: string;
    resumeUrl: string;
    detailedBio: {
      intro: string;
    };
  };
  contact: {
    email: string;
    socialLinks: {
      github: string;
      linkedin: string;
      instagram: string;
    };
    contactText: string;
    contactDescription: string;
  };
  timeline: {
    education: Array<{
      date: string;
      title: string;
      institution: string;
      description: string;
      category: string;
    }>;
    achievements: Array<{
      date: string;
      title: string;
      organization: string;
      description: string;
      category: string;
    }>;
  };
  projects: Array<{
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    date: string;
    icon: string;
    color: string;
    stack: string[];
    features: string[];
    demoLink: string;
    githubLink: string;
    image: string;
  }>;
  navigation: {
    menuItems: Array<{
      label: string;
      section: string;
    }>;
  };
}

export function usePortfolioData() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(DATA_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
