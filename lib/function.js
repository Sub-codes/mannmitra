import { inngest } from "./inngest/client";
import { db } from "./prisma";

export const checkBudgetAlert = inngest.createFunction(
  { id: "check-budget-alert", name: "Check Budget Alert" },
  { event: "0 */6 * * *" },
  async ({ event, step }) => {
    const budgets = await step.run("fetch-budget", async () => {
      //Find the Budgets
      return await db.budget.findMany({
        include: {
          user: {
            include: {
              accounts: {
                where: {
                  isDefault: true,
                },
              },
            },
          },
        },
      });
    });
    for (const budget of budgets) {
      //Itterating Thorugh every Account default and checking budget
      const defaultAccount = budget.user.accounts[0];
      if (!defaultAccount) {
        continue;
      }
      await step.run(`check for ${budget.id}`, async () => {
        const currDate = new Date();

        const startOfMonth = new Date(
          currDate.getFullYear(),
          currDate.getMonth(),
          1
        );
        const endOfMonth = new Date(
          currDate.getFullYear(),
          currDate.getMonth() + 1,
          0
        );
        const expenses = await db.transaction.aggregate({
          where: {
            userId: budget.userId,
            type: "EXPENSE",
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
            accountId: defaultAccount.id,
          },
          _sum: {
            amount: true,
          },
        });

        const totalExpenses = expenses._sum.amount?.toNumber() || 0;

        const budgetAmount = budget.amount;

        const percentageUsed = (totalExpenses / budgetAmount) * 100;

        if (
          percentageUsed >= 80 &&
          (!budget.lastAlertSent ||
            isNewMonth(new Date(budget.lastAlertSent), new Date()))
        ) {
          //Send Email
          //Update LastAlertSent

          await db.budget.update({
            where: {
              id: budget.id,
            },
            data: {
              lastAlertSent: new Date(),
            },
          });
        }
      });
    }
  }
);
function isNewMonth(lastDte, currDte) {
  return (
    lastDte.getMonth() !== currDte.getMonth() ||
    lastDte.getFullYear() !== currDte.getFullYear()
  );
}
