export interface Loan {
  id?: number | null;
  loanNumber?: string | null;
  branchId?: number | null;
  userId?: number | null;
  amount?: string | null;
  amountDue?: string | null;
  interestRate?: string | null;
  takenAt?: string | null;
  dueBy?: string | null;
  loanType?: string | null;
}
