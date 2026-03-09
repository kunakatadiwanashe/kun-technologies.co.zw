
import { ProjectForm } from "@/components/admin/project-form";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  client: string;
  results: string[];
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/${slug}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch {
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <div className="container mx-auto pt-28">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="text-muted-foreground">The project you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 ">
      <ProjectForm project={project} />
    </div>
  );
}

