import React from "react";

function comment1() {
    return {
        date: "7 მაისი 2023",
        title: "ნორმალური მასწავლებელი",
        description: "კარგი მასწავლებელია, ნორმალურად ასწავლის, წავა რა",
        style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.randImage {
					align-self: center;
					outline: 2px solid red;
				}
				`,
        body: (
            <React.Fragment>
                <div className="article-content">
                    <div className="paragraph">Content of article 1</div>
                    <img
                        src="https://picsum.photos/200/300"
                        alt="random"
                        className="randImage"
                    />
                </div>
            </React.Fragment>
        )
    };
}

function comment2() {
    return {
        date: "5 აპრილი 2023",
        title: "ვგიჟდებიიი",
        description: "იდეალურია, აი ძაან კარგად ასწავლის, 10/10",
        style: "",
        body: (
            <React.Fragment>
                <h1>Content of article 2</h1>
            </React.Fragment>
        )
    };
}

function comment3() {
    return {
        date: "1 მარტი 2023",
        title: "დიდი არაფერი..",
        description: "არაფერი მასწავლებელი ეს არაა, ნუ ენდობით მოსწავლეებო!",
        style: "",
        body: (
            <React.Fragment>
                <h1>Content of article 2</h1>
            </React.Fragment>
        )
    };
}

export const comments = [comment1, comment2, comment3];
