/**
 * BLOCK: Adchitects Slider
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const {
	__,
} = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	Button,
	IconButton,
	PanelBody,
	TextControl,
	TextareaControl,
} = wp.components;
const {
	InspectorControls,
	MediaPlaceholder,
} = wp.blockEditor;
const {
	Fragment,
} = wp.element;

/**
 * Register: Adchitects Slider Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('grf/gutenberg-adchitects-slider', {
	title: __('Adchitects Slider'),
	icon: 'smiley',
	category: 'common',
	attributes: {
		items: {
			type: 'array',
			default: [],
		},
	},
	edit: (props) => {
		const handleAddItem = () => {
			const items = [...props.attributes.items];
			items.push({
				title: '',
				text: '',
				image: '',
			});
			props.setAttributes({ items });
		};

		const handleRemoveItem = (index) => {
			const items = [...props.attributes.items];
			items.splice(index, 1);
			props.setAttributes({ items });
		};

		const handleTitleChange = (title, index) => {
			const items = [...props.attributes.items];
			items[index].title = title;
			props.setAttributes({ items });
		};

		const handleTextChange = (text, index) => {
			const items = [...props.attributes.items];
			items[index].text = text;
			props.setAttributes({ items });
		};

		const onSelectImage = (image, index) => {
			const items = [...props.attributes.items];
			items[index].image = image.url;
			props.setAttributes({ items });
		};

		let itemFields,
			itemDisplay;

		if (props.attributes.items.length) {
			itemFields = props.attributes.items.map((item, index) => {
				return <Fragment key={index}>
					<MediaPlaceholder
						icon="format-image"
						onSelect={(image) => onSelectImage(image, index)}
						onSelectURL={(image) => console.log(url)}
						onError={(message) => console.log(message)}
					/>
					<TextControl
						className="grf__item-title"
						placeholder="Title"
						value={props.attributes.items[index].title}
						onChange={(title) => handleTitleChange(title, index)}
					/>
					<TextareaControl
						className="grf__item-text"
						label="Text"
						help="Enter some text"
						value={props.attributes.items[index].text}
						onChange={(text) => handleTextChange(text, index)}
					/>
					<IconButton
						className="grf__remove-item-address"
						icon="no-alt"
						label="Delete item"
						onClick={() => handleRemoveItem(index)}
					/>
				</Fragment>;
			});

			itemDisplay = props.attributes.items.map((item, index) => {
				return <div className="slide" style={{
					backgroundImage: `url(${item.image})`,
				}}>
					<div className="slideContent">
						<h3 className="slideContent__title">{item.title}</h3>
						<p className="slideContent__subtitle">{item.text}</p>
					</div>
				</div>;
			});
		}

		return [
			<InspectorControls key="1">
				<PanelBody title={__('Items')}>
					{itemFields}
					<Button
						isDefault
						onClick={handleAddItem.bind(this)}
					>
						{__('Add Item')}
					</Button>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={props.className}>
				<div className="media">
					{itemDisplay}
				</div>
			</div>,
		];
	},
	save: (props) => {
		const itemFields = props.attributes.items.map((item, index) => {
			return <div className="slide"
				style={{
					backgroundImage: `url(${item.image})`,
				}}>
				<div className="slideContent">
					<h3 className="slideContent__title">{item.title}</h3>
					<p className="slideContent__subtitle">{item.text}</p>
				</div>
			</div>;
		});

		return (
			<div className={props.className}>
				<div className="Slider">
					{itemFields}
				</div>
			</div>
		);
	},
});
