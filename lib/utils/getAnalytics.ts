import { db } from "../db";

export const getAnalytics = async ({ userId }: { userId: string }) => {
  try {
    const purshases = await db.purchase.findMany({
      where: {
        course: {
          userId,
        },
      },
      include: {
        course: true,
      },
    });

    const groupedByCourseAndPrice = purshases.reduce(
      (acc, curr) => {
        const { course } = curr;
        if (acc[course.title]) {
          acc[course.title] = {
            nbSales: acc[course.title].nbSales + 1,
            revenues: acc[course.title].revenues + (curr.course.price || 0),
          };
        } else {
          acc[course.title] = { nbSales: 1, revenues: curr.course.price || 0 };
        }
        return acc;
      },
      {} as Record<string, { nbSales: number; revenues: number }>,
    );

    const nbOfSales = Object.values(groupedByCourseAndPrice).reduce(
      (acc, cur) => {
        return acc + cur.nbSales;
      },
      0,
    );
    const totalRevenue = Object.values(groupedByCourseAndPrice).reduce(
      (acc, cur) => {
        return acc + cur.revenues;
      },
      0,
    );
    return { nbOfSales, totalRevenue, groupedByCourseAndPrice };
  } catch (err) {
    console.log(err);
    return { nbOfSales: 0, totalRevenue: 0, groupedByCourseAndPrice: {} };
  }
};
