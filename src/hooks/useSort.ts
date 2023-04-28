import {vacancy} from "../types/vacancy";
import {useMemo} from "react";
import {resume} from "../types/resume";


type sortTypeSearchSelect = {
    relevance: string;
    date: string
    salary_desc: string
    salary_asc: string
}

type sortType = {
    sort: string
    query: string

}

const sortedDate = (a: vacancy, b: vacancy) => {
    return a["date"].localeCompare(b['date']);
}

const salarySordUp = (a: vacancy, b: vacancy) => {
    return a['price'] - b['price'];
}
const salarySordDown = (a: vacancy, b: vacancy) => {
    return b['price'] - a['price'];
}
const sordVacancies = (sort: string, list: vacancy[]) => {
    switch (sort) {
        case 'date':
            return list.sort(sortedDate)
        case "salary_desc":
            return list.sort(salarySordDown);

        case 'salary_asc':
            return list.sort(salarySordUp);
        default:
            return list
    }
}
export const useSortVacancies = (sort: sortType, list: vacancy[]) => {
    const sortedQueryList = list.filter(v => {
        const searchTolower = sort.query.toLowerCase();
        const title = v.title.toLowerCase();
        return title.includes(searchTolower);
    })
    const sortedList: vacancy[] = sordVacancies(sort.sort, sortedQueryList);

    return sortedList

}
export const useSortResumes = (query:string, list: resume[]) => {
    const sortedQueryList = list.filter(v => {
        const searchTolower = query.toLowerCase();
        const title = v.additionally.toLowerCase();
        return title.includes(searchTolower);
    })
    // const sortedList: resume[] = sordVacancies(sort.sort, sortedQueryList);

    return sortedQueryList

}

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