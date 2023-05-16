import { vacancy } from "../types/vacancy";
import { useMemo } from "react";
import { resume } from "../types/resume";

type sortTypeSearchSelect = {
  relevance: string;
  date: string;
  salary_desc: string;
  salary_asc: string;
};

type sortType = {
  sort: string;
  query: string;
};

interface SortableItem {
  date: string;
  price: number;
}

const sortedDate = (a: SortableItem, b: SortableItem) => {
  return a["date"].localeCompare(b["date"]);
};

const salarySordUp = (a: SortableItem, b: SortableItem) => {
  return a["price"] - b["price"];
};

const salarySordDown = (a: SortableItem, b: SortableItem) => {
  return b["price"] - a["price"];
};

const sordVacancies = (sort: string, list: vacancy[]) => {
  switch (sort) {
    case "date":
      return list.sort(sortedDate);
    case "salary_desc":
      return list.sort(salarySordDown);

    case "salary_asc":
      return list.sort(salarySordUp);
    default:
      return list;
  }
};

const sordResumes = (sort: string, list: resume[]) => {
  switch (sort) {
    case "date":
      return list.sort(sortedDate);
    case "salary_desc":
      return list.sort(salarySordUp);

    case "salary_asc":
      return list.sort(salarySordDown);
    default:
      return list;
  }
};

export const useSortVacancies = (
  sort: sortType,
  list: vacancy[] | vacancy[]
) => {
  const sortedQueryList = list.filter((v) => {
    const searchTolower = sort.query.toLowerCase();
    const title = v.title.toLowerCase();
    return title.includes(searchTolower);
  });
  const sortedList: vacancy[] = sordVacancies(sort.sort, sortedQueryList);

  return sortedList;
};
export const useSortResumes = (sort: sortType, list: resume[]) => {
  const sortedQueryList = list.filter((v) => {
    const searchTolower = sort.query.toLowerCase();
    const skills = v.skills;
    const isFind = skills.filter((skill) => {
      const skillToLower = skill.toLocaleLowerCase();
      return skillToLower.includes(searchTolower);
    });
    return isFind.length > 0;
  });
  return sortedQueryList;
};

// export  const useSortResumes = (sort: sortType, list: resume[]) => {
//     const sortedQueryList = list.filter(v => {
//         v.skills.filter()
//         const searchTolower = sort.query.toLowerCase();
//         const title = v.title.toLowerCase();
//         return title.includes(searchTolower);
//     })
//
//
// }
