import { db } from "@/lib/db";
import React from "react";
import { Categories } from "./_components/Categories";

const SearchPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <div className=" block px-6 pt-6 md:mb-0 md:hidden"></div>
      <div className="p-6">
        <Categories items={categories}></Categories>
      </div>
    </>
  );
};

export default SearchPage;
