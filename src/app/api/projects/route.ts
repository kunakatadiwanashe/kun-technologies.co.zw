
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {};

    if (category && category !== "All") {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Parse JSON strings back to arrays
    const projectsWithParsedData = projects.map((project) => ({
      ...project,
      technologies: JSON.parse(project.technologies || "[]"),
      results: JSON.parse(project.results || "[]"),
    }));

    return NextResponse.json(projectsWithParsedData);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      description,
      category,
      image,
      technologies,
      client,
      results,
    } = body;

    // Validate required fields
    if (!title || !slug || !description || !category || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        category,
        image,
        technologies: JSON.stringify(technologies || []),
        client: client || "",
        results: JSON.stringify(results || []),
      },
    });

    return NextResponse.json({
      ...project,
      technologies: JSON.parse(project.technologies || "[]"),
      results: JSON.parse(project.results || "[]"),
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

