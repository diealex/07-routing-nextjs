"use client";
import Link from "next/link";
import css from "./TagsMenu.module.css";
import { TAGS } from "@/types/note";
import { useState } from "react";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      <ul
        className={css.menuList}
        style={{ display: isOpen ? "block" : "none" }}
      >
        {TAGS.map((tag, index) => (
          <li key={index} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
              onClick={toggleMenu}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
