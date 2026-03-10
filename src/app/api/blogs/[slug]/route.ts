
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

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

export async function PUT(
  request: NextRequest,
{ params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();

    const {
      title,
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

    // Check if post exists
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
        title: title || existingPost.title,
        excerpt: excerpt || existingPost.excerpt,
        content: content || existingPost.content,
        category: category || existingPost.category,
        author: author || existingPost.author,
        authorRole: authorRole || existingPost.authorRole,
        date: date || existingPost.date,
        readTime: readTime || existingPost.readTime,
        featured: featured !== undefined ? featured : existingPost.featured,
        image: image || existingPost.image,
        tags: tags ? JSON.stringify(tags) : existingPost.tags,
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

// DELETE /api/blogs/[slug] - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Check if post exists
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

    return NextResponse.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
