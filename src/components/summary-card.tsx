import { FC } from "react";
import { twMerge } from "tailwind-merge";

type SummaryCardProps = {
  value: string;
  unit: string;
} & React.HTMLAttributes<HTMLDivElement>;

const SummaryCard: FC<SummaryCardProps> = ({
  value,
  unit,
  className,
  ...rest
}) => {
  return (
    <div
      className={twMerge(
        "border p-3 md:p-4 rounded md:h-28 flex flex-col items-center justify-center",
        className
      )}
      {...rest}
    >
      <span className="text-lg md:text-2xl font-semibold">{value}</span>
      <span className="text-xs md:text-base text-slate-500">{unit}</span>
    </div>
  );
};

export default SummaryCard;
