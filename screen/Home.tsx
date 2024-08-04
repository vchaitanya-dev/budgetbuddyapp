import { ScrollView,Text, TextStyle,StyleSheet } from 'react-native'
import {Category,Transaction,TransactionByMonth} from "../types";
import { useSQLiteContext } from 'expo-sqlite';
import AddTransaction from '../Components/AddTransaction';
import TransactionList from '../Components/TransactionList';
import React from "react";
import Card from '../Components/ui/Card';
const Home = () => {
const [categories,setCategories] = React.useState<Category[]>([]);
const [transactions,setTransactions] = React.useState<Transaction[]>([]);
const [transactionsByMonth,setTransactionsByMonth] = React.useState<TransactionByMonth>({totalExpenses:0,totalIncome:0})
const db = useSQLiteContext();

  React.useEffect(() => {
    db.withTransactionAsync(async () => {
      await getData();
    });
  },[db])

async function getData() {
  const result  = await db.getAllAsync<Transaction>(
    `SELECT * FROM Transactions
     ORDER BY date DESC;`);
    setTransactions(result);
  
    const categoryResult = await db.getAllAsync<Category>(
      `SELECT * FROM Categories`
    )
    setCategories(categoryResult);
    const now = new Date();
    const startofMonth = new Date(now.getFullYear(),now.getMonth(),1);
    const endofMonth = new Date(now.getFullYear(),now.getMonth() +1, 1);
    endofMonth.setMilliseconds(endofMonth.getMilliseconds()-1);

    const startofMonthTimeStamp = Math.floor(startofMonth.getTime()/ 1000);
    const endofMonthTimeStamp = Math.floor(endofMonth.getTime()/1000)

    const transactionsByMonth = await db.getAllAsync<TransactionByMonth>(`      
      SELECT
        COALESCE(SUM(CASE WHEN type="खर्च" THEN amount ELSE 0 END),0) AS totalExpenses,
        COALESCE(SUM(CASE WHEN type="आय" THEN amount ELSE 0 END),0) AS totalIncome
      FROM Transactions
      WHERE date >= ? AND date <= ?;
      `,[startofMonthTimeStamp,endofMonthTimeStamp]);
    setTransactionsByMonth(transactionsByMonth[0])
}
async function deleteTransations(id:number){
  db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM  Transactions WHERE  id = ?', [id])
    await getData();
  })
}
async function insertTransaction(transaction: Transaction) {
  db.withTransactionAsync(async () => {
    await db.runAsync(
      `
      INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (?, ?, ?, ?, ?);
    `,
      [
        transaction.category_id,
        transaction.amount,
        transaction.date,
        transaction.description,
        transaction.type,
      ]
    );
    await getData();
  });
}

return (
<ScrollView contentContainerStyle={{padding:15}}>
<AddTransaction insertTransaction={insertTransaction} />
<TranscationSummary totalExpenses={transactionsByMonth.totalExpenses} totalIncome={transactionsByMonth.totalIncome}/>
<TransactionList 
categories={categories}
transactions={transactions}
deleteTransations={deleteTransations}
/>
</ScrollView>
  )
}
export default Home;


function TranscationSummary({totalExpenses,totalIncome}:TransactionByMonth) {
  const readablePeriod = new Date().toLocaleDateString("default",{
    month:"long",
    year:"numeric"
  });

  const getMoneyTextStyle = (value:number):TextStyle => ({
    fontWeight:"bold",
    color:value < 0 ? "#ff4500" : "#2e8b57"
  })

  const formatMoney = (value:number) => {
    const absValue = Math.abs(value).toFixed(2);
    return `${value < 0 ? "-" : ""}₹${absValue}`
  }


  return(
    <Card style={styles.container}>
      <Text style={styles.periodTitle}>
        Summary for {readablePeriod}
      </Text>
      <Text style={styles.summaryText}>Total Income:{""}</Text>
      <Text style={getMoneyTextStyle(totalIncome)}>{formatMoney(totalIncome)}</Text>
    <Text style={styles.summaryText}>Total Expenses : {""}</Text>
  <Text style={getMoneyTextStyle(totalIncome)}>{formatMoney(totalExpenses)}</Text>
    {/* <Text>Saving:{""}</Text>
    <Text>{formatMoney(savings)}</Text> */}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingBottom: 7,
  },
  
  periodTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  // Removed moneyText style since we're now generating it dynamically
});