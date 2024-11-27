import { config } from "dotenv";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import { accounts, categories, transactions } from "@/db/schema";
import { convertAmountFromMiliunits } from "@/lib/utils";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "user_2oNSJP0CojdRgFWIb1FdgSkgvBe";
const SEED_CATEGORIES = [
  {
    id: "category_1",
    name: "Groceries",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "category_2",
    name: "Eating Out",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "category_3",
    name: "Rent",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "category_4",
    name: "Utilities",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "category_5",
    name: "Transportation",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
];

const SEED_ACCOUNTS = [
  {
    id: "account_1",
    name: "Checking",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "account_2",
    name: "Savings",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "account_3",
    name: "Credit Card",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "account_4",
    name: "Investment",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
  {
    id: "account_5",
    name: "Loan",
    userId: SEED_USER_ID,
    plaidId: null,
    createdAt: new Date(),
  },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Groceries":
      return Math.random() * 400 + 90;
    case "Eating Out":
      return Math.random() * 200 + 100;
    case "Rent":
      return Math.random() * 1000 + 500;
    case "Utilities":
      return Math.random() * 200 + 100;
    case "Transportation":
      return Math.random() * 500 + 200;
    default:
      return Math.random() * 1000 + 100;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 10) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountFromMiliunits(
      isExpense ? -amount : amount
    );

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Merchant",
      notes: "Random transaction",
      createdAt: new Date(),
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

main();
