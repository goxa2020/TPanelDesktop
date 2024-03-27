import NavButton from "./NavButton";
import PrivateNavButton from "./PrivateNavButton";

export default function MenuLinks() {
  return (
    <ul className="menu-links">
      <NavButton iconName="bx-home-alt" href="/" text="Главная" SPA />
      <PrivateNavButton
        iconName="bx-bell"
        href="notifications"
        text="Уведомления"
        SPA
      />
      <PrivateNavButton
        iconName="bxs-copy-alt"
        href="tasks"
        text="Мои задания"
        SPA
      />
      <PrivateNavButton iconName="bx-envelope" href="mail" text="Почта" SPA />
      <PrivateNavButton iconName="bx-code-alt" href="/admin/" text="Админка" />
    </ul>
  );
}
