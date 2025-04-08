"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { categoryColors } from "@/data/categories";

const TransactionTable = ({ transactions }) => {

  
  const filteredAndSortedTransactions=transactions;
  const handleSort=()=>{

  }
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">
                <Checkbox />
              </TableHead>
              <TableHead onClick={() => handleSort("date")} className="cursor-pointer">Date</TableHead>
              <TableHead onClick={() => handleSort("date")} className="cursor-pointer">Description</TableHead>
              <TableHead onClick={() => handleSort("category")} className="cursor-pointer">Category</TableHead>
              <TableHead onClick={() => handleSort("amount")} className="text-right cursor-pointer">Amount</TableHead>
              <TableHead className="text-right">Recurring</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground text-center">
                  No Transactions Yet
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-center"><Checkbox /></TableCell>
                  <TableCell>{format(new Date(transaction.date), "PP")}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={"capitalize"}>
                    <span style={{
                      background:categoryColors[transaction.category]
                    }} className="px-2 py-1 rounded text-white text-sm">

                    {transaction.category}
                    </span>
                    </TableCell>
                  <TableCell style={{
                    color:transaction.type==="EXPENSE"?"red":"green"
                  }
                  } className="text-right font-medium">
                    {transaction.type==="EXPENSE"?"-":"+"}
                    {parseFloat(transaction.amount).toFixed(2)}</TableCell>
                  <TableCell className="text-right ">
                    {transaction.recurring ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className={"text-right"}>...</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};


export default TransactionTable;
