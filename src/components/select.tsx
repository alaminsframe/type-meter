import * as SelectPrimitive from "@radix-ui/react-select";
import React from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const Select = ({ children, ...props }: SelectPrimitive.SelectProps) => {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
};

const SelectGroup = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.SelectGroup>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.SelectGroup>
>(({ children, ...props }, ref) => {
  return (
    <SelectPrimitive.Group ref={ref} {...props}>
      {children}
    </SelectPrimitive.Group>
  );
});

SelectGroup.displayName = SelectPrimitive.SelectGroup.displayName;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.SelectValue>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.SelectValue>
>(({ children, className, ...props }, ref) => {
  return (
    <SelectPrimitive.Value className={className} ref={ref} {...props}>
      {children}
    </SelectPrimitive.Value>
  );
});

SelectValue.displayName = SelectPrimitive.SelectValue.displayName;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  chevronDown?: boolean;
}
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, chevronDown = true, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={twMerge(
      "flex w-full  items-center justify-between whitespace-nowrap rounded border border-dark-300 bg-transparent px-2 md:px-4 py-1.5 md:py-2 text-sm text-dark-800 placeholder:text-dark-300 focus:border-dark-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}

    {chevronDown && (
      <SelectPrimitive.Icon asChild>
        <FiChevronDown className="h-4 w-4 opacity-50 flex-none" />
      </SelectPrimitive.Icon>
    )}
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, sideOffset, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className={twMerge(
      "relative z-50 min-w-[8rem] overflow-hidden rounded border bg-white  shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    )}
    sideOffset={sideOffset}
    position={position}
    {...props}
  >
    <SelectPrimitive.Viewport
      className={twMerge(
        // 'p-1',
        position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
      )}
    >
      {children}
    </SelectPrimitive.Viewport>
  </SelectPrimitive.Content>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={twMerge("py-1.5 ps-8 pe-2 text-sm font-semibold", className)}
    {...props}
  >
    {children}
  </SelectPrimitive.Label>
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> {
  showCheck?: boolean;
}
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  SelectItemProps
>(({ className, children, showCheck = true, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={twMerge(
      "relative flex w-full cursor-pointer hover:bg-slate-100 transition duration-150 items-center rounded py-1.5 md:py-2 px-2 md:px-4 pe-2 text-sm text-dark-800 outline-none focus:bg-dark-100 focus:text-dark-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    {showCheck && (
      <span className="absolute right-3 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <FiCheck className="h-4 w-4 text-slate-800" />
        </SelectPrimitive.ItemIndicator>
      </span>
    )}

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={twMerge("-mx-1 my-1 h-px bg-slate-300", className)}
    {...props}
  >
    {children}
  </SelectPrimitive.Separator>
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

Select.Group = SelectGroup;
Select.Value = SelectValue;
Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;

Select.displayName = SelectPrimitive.Select.displayName;

export default Select;
