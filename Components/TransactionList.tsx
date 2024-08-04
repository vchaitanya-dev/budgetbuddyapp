import {Transaction,Category} from "../types"
import { View,TouchableOpacity,Text } from 'react-native';
import TransactionListItem from './TransactionListItem';
function TransactionList({transactions,categories,deleteTransations}:{
    transactions:Transaction[];
    categories:Category[];
    deleteTransations: (id:number) => Promise<void>
}) {
  return (
    <View style={{gap:15}}>
        {transactions.map((transaction) => {
            const categoryForCurrentItem = categories.find(
                (category) =>  category.id === transaction.id
            )
            return (
                <TouchableOpacity 
                key={transaction.id}
                activeOpacity={.7}
                onLongPress={() => deleteTransations(transaction.id)}
                >
                  <TransactionListItem 
                  transaction={transaction}
                  categoryInfo={categoryForCurrentItem}
                  />
                </TouchableOpacity>
            )
        })}
    </View>
  )
}

export default TransactionList