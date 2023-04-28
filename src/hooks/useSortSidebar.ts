import {vacancy} from "../types/vacancy";


type SidebarSortType = {
    spect: string,
    salary: string,
    qualy: string
}

const sortSpect = (list: vacancy[], sort: string) => {
    const sortToLover = sort.toLowerCase()
    return list.filter(l => l.direction.includes(sortToLover))
}
const sortByGraid = (list: vacancy[], sort: string) => {
    const sortToLover = sort.toLowerCase()
    return list.filter(l => l.graid = sortToLover)
}

const sortBySalary = (list: vacancy[], sort: string) => {
    return list.filter((l) => {
        const vPrice = Number(l.price);
        const sortPrive = Number(sort);
        return vPrice >= sortPrive
    })
}
export const useSidebarSort = (sort: SidebarSortType, list: vacancy[]) => {
    const sortedSpect = sortSpect(list, sort.spect)
    const sortedQualu = sortByGraid(sortedSpect, sort.qualy)
    const sortedByNumber = sortBySalary(sortedQualu, sort.salary);
    return sortedByNumber
}