import NavButton from "./NavButton";
import PrivateNavButton from "./PrivateNavButton";

export default function MenuLinks() {
  return (
    <ul className="menu-links">
      <NavButton iconName="bx-home-alt" href="/" text="Главная" />
      <PrivateNavButton
        iconName="bx-bell"
        href="notifications"
        text="Уведомления"
      />
      <PrivateNavButton
        iconName="bxs-copy-alt"
        href="tasks"
        text="Мои задания"
      />
      <PrivateNavButton iconName="bx-envelope" href="mail" text="Почта" />
    </ul>
  );
}
