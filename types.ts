export interface Transaction {
    id:number,
    category_id: number,
    amount:number,
    date:number,
    description:string,
    type:"खर्च" | "आय"
} 

export interface Category {
    id:number,
    name:string,
    type:"खर्च" | "आय"
}

export interface TransactionByMonth {
    totalExpenses:number,
    totalIncome:number
}