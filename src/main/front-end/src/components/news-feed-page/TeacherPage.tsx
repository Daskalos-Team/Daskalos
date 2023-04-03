import React from "react";
import "./TeacherPage.css";

interface Props {
    style: any
}

export const TeacherPage = ({style}: Props): JSX.Element => {
    return (
        <div id="teacher-page" style={style}>
            <img id="profile-picture" alt="profile picture"/>
            <p id="name">სახელი</p>
            <p id="subjects">საგნები</p>
            <p id="description">შესახებ</p>
            <img id="favourite" alt="favourite"/>
            <p id="subject-list">
                საგანი 1 <br/>
                საგანი 2 <br/>
                საგანი 3 <br/>
                საგანი 4
            </p>
            <p id="description-text">
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </p>
            <p id="price-range">გადასახადი</p>
            <p id="price-range-values">####-####</p>
        </div>
    );
};