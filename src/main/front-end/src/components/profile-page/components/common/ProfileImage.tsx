import React from "react";
import "./styles/ProfileImage.css";
import ImageUploading from "react-images-uploading";

export const ProfileImage = (props: any): React.JSX.Element => {
    const { width, source } = props;
    const [image, setImage] = React.useState(source);

    const onChange = (newImage: any) => {
        setImage(newImage["0"]["data_url"]);
    };

    return (
        <React.Fragment>
            <ImageUploading
                multiple={false}
                value={image}
                onChange={onChange}
                dataURLKey="data_url"
            >
                {({
                    onImageUpload
                }) => (
                    <div className="image-container">
                        <img src="../../upload.png" className="add-icon" onClick={onImageUpload} alt={"add icon"}/>
                        <img src={image} alt="profile image" className="profile-image" width={width} height={width} onClick={onImageUpload} />
                    </div>
                )}
            </ImageUploading>
        </React.Fragment>
    );
};
