
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Force dynamic - don't prerender this route
export const dynamic = 'force-dynamic';

// GET /api/blogs - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const where: Record<string, unknown> = {};

    if (featured === "true") {
      where.featured = true;
    }

    if (category && category !== "All") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { date: "desc" },
    });

    // Parse tags JSON string back to array
    const postsWithParsedTags = posts.map((post) => ({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    }));

    return NextResponse.json(postsWithParsedTags);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      authorRole,
      date,
      readTime,
      featured,
      image,
      tags,
    } = body;

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        category,
        author: author || "KunTech Team",
        authorRole: authorRole || "Editor",
        date: date || new Date().toISOString().split("T")[0],
        readTime: readTime || "5 min",
        featured: featured || false,
        image: image || "",
        tags: JSON.stringify(tags || []),
      },
    });

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

