import React from 'react';
import ImageUploader from 'react-images-upload';

class UploadImage extends React.Component {
	render = () => {
		let imageSize = 52428800;
		let imageExts = ['.jpg', '.gif', '.png', '.svg'];
		let style = {
			'backgroundColor': '#495057',
			'color': '#F8F8F8'
		}
		return (
			<ImageUploader
				withIcon={true}
				buttonText='Select Images'
				onChange={this.props.uploadHandler}
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
