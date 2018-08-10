import React from 'react';
import ImageUploader from 'react-images-upload';

class UploadImage extends React.Component {
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }

    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    render = () => {
        let imageSize = 52428800;
        let imageExts = ['.jpg', '.gif', '.png', '.gif'];
        let style = {
            'backgroundColor': 'black',
            'color': '#eba023'
        }
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={imageExts}
                maxFileSize={imageSize}
                buttonStyles={style}
                label={`
                    Max Image Size:
                    ${Math.floor(imageSize/1000000)} MB
                    | Image Types: ${imageExts.join(", ")}
                `}
            />
        );
    }
}

export default UploadImage;
