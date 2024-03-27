import NavButton from "./NavButton";

export default function MenuLinks() {
  return (
    <ul className="menu-links">
      <NavButton iconName="bx-home-alt" href="/" text="Главная" SPA/>
      <NavButton iconName="bx-bell" href="notifications" text="Уведомления" SPA/>
      <NavButton iconName="bxs-copy-alt" href="tasks" text="Мои задания" SPA/>
      <NavButton iconName="bx-envelope" href="mail" text="Почта" SPA/>
      <NavButton iconName="bx-code-alt" href="/admin/" text="Админка"/>
    </ul>
  );
}
