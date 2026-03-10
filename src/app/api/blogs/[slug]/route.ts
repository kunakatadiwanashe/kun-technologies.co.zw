import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: {
    slug: string;
  };
};

// GET /api/blogs/[slug]
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { slug } = context.params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { slug } = context.params;
    const body = await request.json();

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        ...body,
        tags: body.tags ? JSON.stringify(body.tags) : existingPost.tags,
      },
    });

    return NextResponse.json({
      ...post,
      tags: JSON.parse(post.tags || "[]"),
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { slug } = context.params;

    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { slug },
    });

    return NextResponse.json({
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}