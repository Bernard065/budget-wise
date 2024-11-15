import { useUpdateAccount } from "@/features/accounts/hooks/use-update-account";

type Props = {
  account: string | null;
  accountId: string | null;
};

const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen: onOpenAccount } = useUpdateAccount();

  const onClick = () => {
    if (accountId) {
      onOpenAccount(accountId);
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account || <span className="text-muted">No account available</span>}
    </div>
  );
};

export default AccountColumn;
