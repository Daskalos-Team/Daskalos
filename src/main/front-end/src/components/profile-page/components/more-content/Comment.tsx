import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./styles/Comment.css";

export const Comment = (props: any): React.JSX.Element => {
    const { title, description, date, link } = props;

    return (
        <React.Fragment>
            <div className="content-comment">
                <div className="content-comment-content">
                    <div className="content-comment-date">
						|&nbsp;&nbsp;&nbsp;{date}
                    </div>
                    <div className="content-comment-title">{title}</div>
                    <div className="content-comment-description">
                        {description}
                    </div>
                    <div className="content-comment-link">
                        <Link to={link}>
                            ნახეთ მოსწავლე{" "}
                            <FontAwesomeIcon
                                style={{ fontSize: "10px" }}
                                icon={faChevronRight}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
