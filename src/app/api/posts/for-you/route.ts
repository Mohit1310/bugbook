import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { PostsPage, getPostDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

/**
 * Handles a GET request by validating the request, checking user authentication,
 * and returning a list of posts in descending order of creation date.
 * @returns {Promise} A Promise that resolves with the list of posts or an error response.
 */
export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      include: getPostDataInclude(user.id),
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: PostsPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
