import s from "./notFound.module.css"
import React from "react";
import MemberCard from "../../base/MemberCard";

export default function NotFoundPage() {
    return (
        <>
          <h3 className={s.center}>Вы нашли секретную страничку</h3>
          <h2 className={s.center}>404 - Not found</h2>
          <h1 className={s.center}>Наша команда</h1>
          <div className={s.wrapper}>
            <div className={s.team}>
              <MemberCard role="leader" name="Данил Рожков" img="Danil">
                Чел вообще пиздец на ножках, ебать того рот, но он прикольный немножко
              </MemberCard>
              <MemberCard role="backend" name="Георгий Максимов" img="Georgy">
                Я в своем познании настолько преисполнился, что я как будто бы уже сто триллионов миллиардов лет
                проживаю на триллионах и триллионах таких же планет, как эта Земля, мне этот мир абсолютно понятен.
              </MemberCard>
              <MemberCard role="speaker" name="Артём Горлов" img="Artyom">
                Lorem ipsum dolor sit amet consecrate radicalising elit. Est query tempora, voluptuary quasi face
                doldrums aut cumquat nil null harm nemo distinct qualm blandish pianissimos.
              </MemberCard>

              <MemberCard role="Who is this" name="Никита панченко">
                Lorem ipsum dolor sit amet consecrate radicalising elit. Est query tempora, voluptuary quasi face
                doldrums aut cumquat nil null harm nemo distinct qualm blandish pianissimos.
              </MemberCard>
            </div>
          </div>
        </>
    )
}