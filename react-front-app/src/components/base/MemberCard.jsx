import s from "../pages/not_found/notFound.module.css"
// Параметры:
// role: отображаемая роль
// name: отображаемое имя
// img: название изображения в team_img(желательно имя челика) {img}_img.png
// image_format: по умолчанию "png", если хочешь другой формат, передай что-нибудь
// children: НЕ АТРИБУТ, передаётся внутри самого тега <MemberCard>ТУТА</MemberCard>.
// children: Там текст(описание) этого человека
export default function MemberCard({ role, name, img = "default", image_format = "png", children }) {
    return (
      <div className={s.team_member}>
        <div className={s.member_img}>
          <img src={`/team_img/${img}_img.${image_format}`} alt={`${img}_img`} />
        </div>
        <h3 className={s.name}>{name}</h3>
        <p className={s.role}>{role}</p>
        <p className={s.about}>{children}</p>
      </div>
    )
}