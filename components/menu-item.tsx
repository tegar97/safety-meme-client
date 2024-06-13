import { IconHome } from "@irsyadadl/paranoid";
import React, { Children, ReactNode } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
interface MenuItemProps {
  href: string;
  isActive?: boolean;
  children: ReactNode;
}
const MenuItem = ({ href, isActive = false, children }: MenuItemProps) => {
  return (
    <Link href={href} className="w-full">
      <Button
        variant={"ghost"}
        className={`flex w-full items-start justify-start px-1 gap-2 ${
          isActive ? "bg-secondary" : ""
        }  `}
      >
        {children}
      </Button>
    </Link>
  );
};

export default MenuItem;
