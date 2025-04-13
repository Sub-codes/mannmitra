"use server";
import aj from "@/lib/arcjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
const serializeTransaction = (obj) => {
    const serialized = { ...obj };
    if (obj.balance) {
      serialized.balance = obj.balance.toNumber();
    }
    if (obj.amount) {
      serialized.amount = obj.amount.toNumber();
    }
    return serialized;
  };

export async function createTransaction(data) {

  
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    //Arject bot Protection
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!user) throw new Error("User Not in DataBase");
    const req=await request();
    const decision=await aj.protect(req,{
      requested:1,
      userId
    })
    if(decision.isDenied()){
      if(decision.reason.isRateLimit()){
        const {remaining,reset}= decision.reason
        console.log("Rate Limit Exceeded",remaining,reset)
        throw new Error("Rate Limit Exceeded")
      }
    }
    const account = await db.account.findUnique({
      where: {
        id: data.accountId,
        userId: user.id,
      },
    });
    if (!account) throw new Error("Account Not Found");
    const balaceChange = data.type === "INCOME" ? data.amount : -data.amount;
    const newBalance = account.balance.toNumber() + balaceChange;
    const transaction=await db.$transaction(async (tx) => {
        const newTransaction = await tx.transaction.create({
          data: {
            ...data,
         userId:user.id,
         nextRecurringDate:data.isRecurring&&data.recurringInterval?calculateNextDate(data.date,data.recurringInterval):null
          },
        });
        await tx.account.update({
          where: {
            id: account.id,
          },
          data: {
            balance: newBalance,
          },
        });
        return newTransaction;
    })
    revalidatePath("/transaction");
    revalidatePath(`/account/${transaction.accountId}`);

    
    return {success:true,transaction:serializeTransaction(transaction)};
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error(error.message || "Failed to create transaction");
  }
}
function calculateNextDate(startDate, interval) {
    const date=new Date(startDate);
    switch (interval) {
        case "DAILY":
            date.setDate(startDate.getDate() + 1);
            break;
        case "WEEKLY":
            date.setDate(startDate.getDate() + 7);
            break;
        case "MONTHLY":
            date.setDate(startDate.getMonth() + 1);
            break;
        case "YEARLY":
            date.setDate(startDate.getFullYear() + 1);
            break;
    
        
    }
}