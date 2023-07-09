import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./styles/Comment.css";
import { addComment, months } from "../../../../service/profile-page-service";
import { AppContext } from "../../../../App";

export const Comment = (props: any): React.JSX.Element => {
    const { edit, studentID, teacherID, title, description, date, link, rating, userComments, setUserComments, userRatings, setUserRatings } = props;
    const { setTime }: any = useContext(AppContext);
    const [score, setScore] = useState<number>(0);
    const [comment, setComment] = useState<string>("");

    const saveStudentComment = async (e: any): Promise<void> => {
        if (comment.length <= 10) {
            alert("კომენტარი საკმაოდ პატარაა!");
            return;
        }

        const currDate = new Date();
        const day = currDate.getDate();
        const month = months[currDate.getMonth()];
        const year = currDate.getFullYear();
        const fullDate = `${day} ${month}, ${year}`;

        const rating = {
            studentID,
            title: comment.substring(0, 10) + "...",
            studentComment: comment,
            rating: score,
            addDate: fullDate
        };

        setUserComments([...userComments, rating]);
        setUserRatings([...userRatings, score]);
        await addComment(studentID, teacherID, rating);
    };

    const goToStudentProfile = () => {
        window.location.reload();
    };

    return (
        <React.Fragment>
            <div className="content-comment">
                <div className="content-comment-content">
                    {
                        edit ? <>
                            <div>
                                <div className="rating-div">
                                    <form className="rating">
                                        <label>
                                            <input type="radio" name="stars" value="1" onChange={() => setScore(1)}/>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="2" onChange={() => setScore(2)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="3" onChange={() => setScore(3)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="4" onChange={() => setScore(4)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="5" onChange={() => setScore(5)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="6" onChange={() => setScore(6)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="7" onChange={() => setScore(7)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="8" onChange={() => setScore(8)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="9" onChange={() => setScore(9)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                        <label>
                                            <input type="radio" name="stars" value="10" onChange={() => setScore(10)}/>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                            <span className="icon">★</span>
                                        </label>
                                    </form>
                                </div>
                                <div className="bottom-send">
                                    <textarea className="description-area" maxLength={150} placeholder="დატოვეთ კომენტარი" onChange={e => setComment(e.currentTarget.value)} />
                                    <div className="wrap">
                                        <button className="send-button" onClick={e => saveStudentComment(e)}>დამატება</button>
                                    </div>
                                </div>
                            </div>
                        </>
                            : <>
                                <div className="content-comment-date">
						|&nbsp;&nbsp;&nbsp;{date}
                                </div>
                                <div className="content-comment-title">{`${title} [${rating}★]`}</div>
                                <div className="content-comment-description">
                                    {description}
                                </div>
                                {studentID == teacherID &&
                                <a className="content-comment-link" onClick={() => goToStudentProfile()}>
                                    <Link to={link}>
                            ნახეთ მოსწავლე{" "}
                                        <FontAwesomeIcon
                                            style={{ fontSize: "10px" }}
                                            icon={faChevronRight}
                                        />
                                    </Link>
                                </a>}
                            </>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};
