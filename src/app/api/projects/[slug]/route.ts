
import { NextRequest, NextResponse } from "next/server";

const parseJsonArray = (field: any): any[] => {
  if (Array.isArray(field)) return field;
  if (typeof field === "string") {
    try {
      return JSON.parse(field || "[]");
    } catch {
      return [];
    }
  }
  return [];
};
import { prisma } from "@/lib/prisma";

// Force dynamic - don't prerender this route
export const dynamic = 'force-dynamic';

// GET /api/projects/[slug] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Parse JSON strings back to arrays
    return NextResponse.json({
      ...project,
      technologies: parseJsonArray(project.technologies),
      results: parseJsonArray(project.results),
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[slug] - Update project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const {
      title,
      description,
      category,
      image,
      technologies,
      client,
      results,
    } = body;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const project = await prisma.project.update({
      where: { slug },
      data: {
        title: title || existingProject.title,
        description: description || existingProject.description,
        category: category || existingProject.category,
        image: image || existingProject.image,
        technologies: technologies ? JSON.stringify(technologies) : JSON.stringify(existingProject.technologies || []),
        client: client || existingProject.client,
        results: results ? JSON.stringify(results) : JSON.stringify(existingProject.results || []),
      },
    });

    return NextResponse.json({
      ...project,
      technologies: parseJsonArray(project.technologies),
      results: parseJsonArray(project.results),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[slug] - Delete project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    await prisma.project.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}

