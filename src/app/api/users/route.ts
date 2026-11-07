import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  buildPagination,
  buildUserOrderBy,
  buildUserWhere,
  parseUserQuery,
} from "@/lib/user-query";

// GET USERS
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = parseUserQuery(searchParams);
    const where = buildUserWhere(query);
    const orderBy = buildUserOrderBy(query);

    const [users, totalRecords] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        skip: (query.page - 1) * query.limit,
        take: query.limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: buildPagination(query.page, query.limit, totalRecords),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch users",
      },
      { status: 500 },
    );
  }
}

// CREATE USER
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        age: body.age ? Number(body.age) : null,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 },
    );
  }
}
