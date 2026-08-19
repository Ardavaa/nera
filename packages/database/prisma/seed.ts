import { PrismaClient, FinancialStatus, AccountType, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding NERA Database for BNI Hackathon...");

  // Upsert Budi User
  const budi = await prisma.user.upsert({
    where: { email: "budi.pratama@student.telkomuniversity.ac.id" },
    update: {},
    create: {
      id: "usr_budi_01",
      email: "budi.pratama@student.telkomuniversity.ac.id",
      name: "Budi Pratama",
      campus: "Telkom University",
      nim: "1301213045",
      phone: "+62 812-9876-5432",
      isPairedWithParent: true,
      parentName: "Hendra Pratama (Ayah)",
      parentPhone: "+62 812-3456-7890",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop",
      riskProfile: {
        create: {
          score: 34,
          status: FinancialStatus.AMAN,
          dtiPercent: 0,
          runwayDays: 14,
          consecutiveSafeMonths: 2,
        },
      },
      accounts: {
        create: {
          accountNumber: "0982341234",
          accountType: AccountType.BNI_TAPLUS_MUDA,
          totalBalance: 1430000,
          dailyPocket: 630000,
          lockPocket: 800000,
          monthlyAllowance: 2000000,
          safeDailyBudget: 45000,
          transactions: {
            create: [
              {
                title: "Uang Saku Bulanan dari Ayah",
                category: "allowance",
                amount: 2000000,
                type: TransactionType.INCOME,
                source: "TRANSFER",
              },
              {
                title: "Smart Allowance Split (80% Pocket)",
                category: "saving",
                amount: 1600000,
                type: TransactionType.SWEEP_TRANSFER,
                source: "AUTO_DEBET",
              },
              {
                title: "Smart Allowance Split (20% BNI Life Goals)",
                category: "saving",
                amount: 400000,
                type: TransactionType.LOCK_SAVING,
                source: "AUTO_DEBET",
              },
              {
                title: "Makan Siang Kantin Tel-U",
                category: "food",
                amount: 25000,
                type: TransactionType.EXPENSE,
                source: "QRIS_BNI",
              },
            ],
          },
        },
      },
      lifeGoals: {
        create: [
          {
            tier: 1,
            title: "Dana Darurat 3x Pengeluaran",
            targetAmount: 3000000,
            currentAmount: 800000,
            isUnlocked: true,
            isCompleted: false,
          },
          {
            tier: 2,
            title: "BNI-AM Dana Lancar Pasar Uang",
            targetAmount: 5000000,
            currentAmount: 0,
            isUnlocked: false,
            isCompleted: false,
          },
        ],
      },
      nudges: {
        create: [
          {
            title: "Tagihan UKT Semester Ganjil",
            description: "Jatuh tempo dalam 12 hari. Gunakan autodebet BNI Taplus Muda untuk diskon admin.",
            category: "BILL_UKT",
            amount: 3500000,
            dueDate: new Date(Date.now() + 12 * 86400000),
            actionText: "Bayar via wondr",
            isResolved: false,
          },
          {
            title: "End-of-Month Sweep Alert",
            description: "Sisa saldo harian Rp45.000 siap disapu ke BNI Life Goals pada akhir bulan.",
            category: "SWEEP_LEFTOVER",
            amount: 45000,
            actionText: "Aktifkan Auto-Sweep",
            isResolved: false,
          },
        ],
      },
    },
  });

  console.log(`Seeded user: ${budi.name} (${budi.email})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
