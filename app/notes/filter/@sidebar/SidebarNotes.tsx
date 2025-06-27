import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { TAGS } from "@/types/note";

export default function SidebarNotes() {
  return (
    <div>
      <ul className={css.menuList}>
        {TAGS.map((tag, index) => (
          <li key={index} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
