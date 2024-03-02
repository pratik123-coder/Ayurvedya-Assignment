// review.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let data;
  try {
    data = await request.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: 'No data provided',
      },
      {
        status: 400,
      }
    );
  }

  const { safetyRating, communicationRating, recommendRating, selectedPraise } = data;

  try {
    await prisma.review.create({
      data: {
        safety: safetyRating,
        communication: communicationRating,
        recommend: recommendRating,
        selected: selectedPraise,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully',
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log({ review: error });
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while submitting the review.',
      },
      {
        status: 500,
      }
    );
  }
}
