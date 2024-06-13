"use client";
import React, { useState } from "react";
import MenuItem from "./menu-item";
import {
  IconCircleQuestionmark,
  IconHamburger,
  IconHome,
  IconPaper,
  IconQuoteClose,
  IconX,
} from "@irsyadadl/paranoid";
import { usePathname } from "next/navigation";
import { ThemeSelector } from "./theme-selector";
import Link from "next/link";

function Sidebar() {
  const [currentPage, setCurrentPage] = useState("");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sidebar sticky top-0 left-0 h-full overflow-y-auto pr-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">
          <Link href="/">SafeyMeme</Link>
        </h1>
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IconX /> : <IconHamburger />}
        </button>
      </div>
      <div
        className={` flex-col gap-y-3 mt-5 w-full md:flex ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <MenuItem href="/" isActive={pathname === "/"}>
          <IconHome />
          <span
            className={`text-base ${pathname === "/" ? "font-medium" : ""}`}
          >
            Home
          </span>
        </MenuItem>
        <MenuItem href="/my-post" isActive={pathname === "/my-post"}>
          <IconPaper />
          <span
            className={`text-base ${
              pathname === "/my-post" ? "font-medium" : ""
            }`}
          >
            My Post
          </span>
        </MenuItem>
        <MenuItem href="/about" isActive={pathname === "/about"}>
          <IconCircleQuestionmark />
          <span
            className={`text-base ${
              pathname === "/about" ? "font-medium" : ""
            }`}
          >
            About us
          </span>
        </MenuItem>

        <ThemeSelector />
      </div>
    </header>
  );
}

export default Sidebar;
