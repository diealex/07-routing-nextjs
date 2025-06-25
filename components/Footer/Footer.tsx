import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Alex</p>
          <p>
            Contact us
            <a href="klochkova.alex91@gmail.com"> by email</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
