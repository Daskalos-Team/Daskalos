import React from "react";
import "./styles/ProfileImage.css";
import ImageUploading from "react-images-uploading";

export const ProfileImage = (props: any): React.JSX.Element => {
    const defaultImage = () => {
        let icon = "../../images/news-feed-page/";
        icon += userData?.userType === "TEACHER" ? "TeachersIcon.png" : "StudentIcon.png";
        return icon;
    };
    const { userID, loggedUserID, width, userData, setUserData } = props;
    const [profileImage, setProfileImage] = React.useState(userData?.profileImage || defaultImage());

    const onChange = (newImage: any, newIndex: any) => {
        console.log(newIndex);
        const newUrl = newImage[newIndex["0"]]["data_url"];
        setProfileImage(newUrl);
        const user = {...userData, profileImage: newUrl};
        setUserData(user);
    };

    return (
        <React.Fragment>
            {
                userID == loggedUserID ?
                    <ImageUploading
                        multiple={true}
                        value={profileImage}
                        onChange={onChange}
                        dataURLKey="data_url"
                    >
                        {({
                            onImageUpload
                        }) => (
                            <div className="image-container">
                                <img src="../../upload.png" className="add-icon" onClick={onImageUpload} alt={"add icon"}/>
                                <img src={profileImage} alt="profile image" className="profile-image" width={width} height={width} onClick={onImageUpload} />
                            </div>
                        )}
                    </ImageUploading> : <div>
                        <img src={profileImage} alt="profile image" className="profile-image" width={width} height={width} />
                    </div>
            }
        </React.Fragment>
    );
};
