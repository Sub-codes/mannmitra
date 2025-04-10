"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { categoryColors } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  MoreHorizontal,
  RefreshCcw,
  Trash2,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TransactionTable = ({ transactions }) => {

  const Recurring_Interval = {
    DAILY: "Daily",
    MONTHLY: "Monthly",
    YEARLY: "Yearly",
    WEEKLY: "Weekly",
  };
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  const filteredAndSortedTransactions = transactions;
  const router = useRouter();
  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  const handleSelectMany = () => {
    setSelectedIds((current) =>
      current.length===filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map(t=>t.id)
    );
  };
  

  
  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field == field && current.direction === "asc" ? "desc" : "asc",
    }));
  };
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">
                <Checkbox onCheckedChange={handleSelectMany}
                checked={filteredAndSortedTransactions.length===selectedIds.length&&filteredAndSortedTransactions.length!==0}
                />
              </TableHead>
              <TableHead
                onClick={() => handleSort("date")}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <span>Date</span>
                  <span>
                    {sortConfig.field === "date" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ))}
                  </span>
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("description")}
                className="cursor-pointer"
              >
                <div className="flex items-center">
                  <span>Description</span>
                  <span>
                    {sortConfig.field === "description" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ))}
                  </span>
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("category")}
                className="cursor-pointer"
              >
                 <div className="flex items-center">
                  <span>Category</span>
                  <span>
                    {sortConfig.field === "category" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ))}
                  </span>
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("amount")}
                className="text-right cursor-pointer flex justify-end items-center"
              >
                Amount {sortConfig.field === "amount" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronDown className="h-4 w-4 ml-1" />
                      ) : (
                        <ChevronUp className="h-4 w-4 ml-1" />
                      ))}
              </TableHead>
              <TableHead className="text-right">Recurring</TableHead>
              <TableHead> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedTransactions?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground text-center"
                >
                  No Transactions Yet
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-center">
                    <Checkbox onCheckedChange={()=>handleSelect(transaction.id)}
                    checked={selectedIds?.includes(transaction.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={"capitalize"}>
                    <span
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                      className="px-2 py-1 rounded text-white text-sm"
                    >
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell
                    style={{
                      color: transaction.type === "EXPENSE" ? "red" : "green",
                    }}
                    className="text-right font-medium"
                  >
                    {transaction.type === "EXPENSE" ? "-" : "+"}
                    {parseFloat(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right ">
                    {transaction.isRecurring ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant={"outline"}
                              className={
                                "gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                              }
                            >
                              <RefreshCcw />
                              {
                                Recurring_Interval[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="">
                              <div className="text-sm">
                                <span className="font-medium">Next Date:</span>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  "PP"
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <Badge variant={"outline"} className={"gap-1"}>
                        <Clock />
                        One-Time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className={"text-right"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className={"h-8 w-8 p-0"}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel
                          onClick={() =>
                            router.push(
                              `/transaction/create?edit=${transaction.id}`
                            )
                          }
                        >
                          <div className="flex items-center gap-2">
                            <Edit className="h-4 w-4 p-0" />
                            Edit
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4 p-0 text-destructive" />
                            <span className="text-destructive">Delete</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
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
