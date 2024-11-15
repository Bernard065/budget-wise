import { useUpdateCategory } from "@/features/categories/hooks/use-update-category";

type Props = {
  category: string | null;
  categoryId: string | null;
};

const CategoryColumn = ({ category, categoryId }: Props) => {
  const { onOpen: onOpenAccount } = useUpdateCategory();

  const onClick = () => {
    if (categoryId) {
      onOpenAccount(categoryId);
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {category || <span className="text-muted">No category available</span>}
    </div>
  );
};

export default CategoryColumn;
