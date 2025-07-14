import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { desc, getTableColumns, sql, count, asc } from "drizzle-orm";

const PAGE_SIZE = 25; // would be better as an environment variable
const searchSchema = z.object({
  search: z.string().default(''),
  page: z.number().min(1).default(1)
});

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  
  try {
    const searchPage = searchParams.get('page')
    const { search, page } = searchSchema.parse({
      search: searchParams.get('search') ?? undefined,
      page: searchPage != null ? Number.parseInt(searchPage) : undefined
    })

    const textSearch = sql`
      ${advocates.firstName} ILIKE ${'%'+search+'%'} OR
      ${advocates.lastName} ILIKE ${'%'+search+'%'} OR
      ${advocates.city} ILIKE ${'%'+search+'%'}  OR
      ${advocates.degree} ILIKE ${'%'+search+'%'}  OR
      ${advocates.specialties}::text ILIKE ${'%'+search+'%'} OR
      ${advocates.yearsOfExperience}::text ILIKE ${'%'+search+'%'}
    `

    const similarity = sql`greatest(
      similarity(${advocates.firstName}, ${search}),
      similarity(${advocates.lastName}, ${search}),
      similarity(${advocates.city}, ${search}),
      similarity(${advocates.degree}, ${search}),
      similarity(${advocates.specialties}::text, ${search}),
      similarity(${advocates.yearsOfExperience}::text, ${search})
    )`

    const data = await db.select({
      ...getTableColumns(advocates),
      rank: similarity
    }).from(advocates)
      .where(search.length > 0 ? textSearch : undefined)
      .orderBy(search.length > 0 ? (t) => desc(t.rank) : () => asc(advocates.lastName))
      .offset((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    const advocateCount = await db.select({ count: count() }).from(advocates)
      .where(search.length > 0 ? textSearch : undefined)

    return Response.json({ 
      advocates: data, 
      pagination: {
        page: page,
        pageSize: PAGE_SIZE,
        pageCount: Math.round((advocateCount[0]?.count ?? 0) / PAGE_SIZE)
      } 
    });
  } catch (err) {
      // Return validation errors
      if (err instanceof z.ZodError) {
        return NextResponse.json(
          { message: 'Validation error', errors: z.treeifyError(err) },
          { status: 400 }
        );
      }

      throw err;
  }
}
