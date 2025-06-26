import Link from "next/link";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <div>
      <ul className={css.menuList}>
        {tags.map((tag, index) => (
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
