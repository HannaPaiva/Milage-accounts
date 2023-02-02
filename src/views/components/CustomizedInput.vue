<template>
	<div class="input-size" :style="cssProps">
		<div class="relative-position" :style="cssProps">
			<div :style="textFontStyle" class="label-position-style">
				<ion-label position="stacked" :labelColor="labelColor">{{
					cstTitle
				}}</ion-label>
			</div>
			<ion-input
				:style="textFontStyle"
				class="inputbox-style"
				:type="inputType"
				:value="inputValue"
				@focusin="$emit('inputClicked')"
				@input="inputChanged"
				@focusout="$emit('onFocusOut', $event)"
				:placeholder="cstPlaceholder"
				:borderColor="borderColor"
				:inputmode="inputModeCustom"
				:disabled="this.isDisabled"
			></ion-input>
			<ion-button
				:style="cssProps"
				v-if="showDropdownArrow"
				fill="clear"
				@click="$emit('inputClicked')"
				class="arrow-button"
			>
				<ion-icon

				

					:src="dropdownArrowPath"
					class="dropdown-arrow"
				>
				</ion-icon>
			</ion-button>

			<ion-button
				fill="clear"
				class="input-button"
				@click="showPassword()"
				v-if="this.showRevealButton"
			>
				<ion-icon

				

					class="input-button-icon"
					:src="this.src_eye_closed"
					v-if="!this.showEyeOpen"
				></ion-icon>
				<ion-icon

					

					class="input-button-icon"
					:src="this.src_eye_open"
					v-if="this.showEyeOpen"
				></ion-icon>
			</ion-button>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonInput, IonLabel, IonButton, IonIcon } from '@ionic/vue';

export default defineComponent({
	name: 'CustomizedInput',
	emits: [
		'update:inputValue',
		'inputClicked',
		'changeInputType',
		'inputChanged',
		'onFocusOut',
	],
	components: {
		IonInput,
		IonLabel,
		IonButton,
		IonIcon,
	},
	props: {
		inputType: String,
		inputValue: String,
		cstPlaceholder: String,
		cstTitle: String,
		showRevealButton: Boolean,
		src_eye_open: String,
		src_eye_closed: String,
		borderColor: String,
		labelColor: String,
		borderRadius: {
			type: String,
			default: '10px',
		},
		inputfieldWidth: {
			type: Number,
			default: 78.7,
		},
		inputfieldHeight: {
			type: Number,
			default: 6.89655172413793,
		},
		arrowPosition: {
			type: Number,
			default: 82.4,
		},
		showDropdownArrow: {
			type: Boolean,
			default: false,
		},
		placeholderAlign: {
			type: String,
			default: 'left',
		},
		dropdownArrowPath: String,
		inputModeCustom: {
			default: 'text',
			type: String,
		},
		isPaddingNeeded: {
			default: 0,
			type: Number,
		},
		dynamicInputWidth: {
			default: null,
			type: String,
		},
		isDisabled: Boolean,
	},
	data() {
		return {
			showEyeOpen: {
				Type: Boolean,
				Default: 'True',
			},
		};
	},
	computed: {
		cssProps() {
			return {
				'--border-style': '1px solid var(' + this.borderColor + ')',
				'--label-color': 'var(' + this.labelColor + ')',
				'--border-radius': this.borderRadius,
				'--input-width': this.dynamicInputWidth
					? this.dynamicInputWidth
					: this.inputfieldWidth + '%',
				'--input-height': this.inputfieldHeight + '%',
				'--arrow-position': this.arrowPosition + '%',
			};
		},
		textFontStyle() {
			let startPadding;
			let endPadding;
			switch (this.isPaddingNeeded) {
				case 0:
					startPadding = '9.5%';
					endPadding = '0';
					break;
				case 1:
					startPadding = '0';
					endPadding = '14px';
					break;
				case 2:
					startPadding = '0';
					endPadding = '0';
					break;
			}
			return {
				'--input-start-padding': startPadding,
				'--input-end-padding': endPadding,
				'--family':
					this.$store.state.fonts.text.font[0] +
					', ' +
					this.$store.state.fonts.text.font[1],
				'--transform': this.$store.state.fonts.text.transform,
				'--weight': this.$store.state.fonts.text.weight,
				'--size': this.$store.state.fonts.text.size,
				'--placeholder-align': this.placeholderAlign,
			};
		},
	},
	methods: {
		showPassword() {
			this.showEyeOpen = !this.showEyeOpen;
			this.$emit('changeInputType', this.showEyeOpen);
		},
		inputChanged($event) {
			this.$emit('update:inputValue', $event.target.value);
			this.$emit('inputChanged'); //alernativ sollte onKeyUp() bzw onKeyDown() funktionieren
		},
	},
});
</script>

<style scoped>
.input-size {
	width: var(--input-width);
	min-width: 90px;
	height: var(--input-height);
}
.relative-position {
	position: relative;
	width: 100%;
	height: 100%;
}
.label-position-style {
	position: absolute;
	left: 6.76%;

	top: -13%;

	padding-left: 3%;
	padding-right: 3%;

	z-index: 2;

	font-family: var(--family);
	font-weight: var(--weight);
	text-transform: var(--transform);
	font-size: var(--size);

	color: var(--label-color);

	background: var(--ion-background-color);

	/* display: flex;
	justify-content: center;
	align-items: center; */
}
ion-input {
	--padding-start: var(--input-start-padding);
	--padding-end: var(--input-end-padding);
	--webkit-autofill: {
		-webkit-box-shadow: 0 0 0px 1000px yellow inset;
	}
}
/* TODO: checken, ob noch verwendet */
ion-input.internal-autofill-selected {
	border: none !important;

	-webkit-text-fill-color: var(--ion-background-color) !important;

	transition: background-color 5000s ease-in-out 0s;
	height: 0px !important;
}
.inputbox-style {
	font-family: var(--family);
	font-weight: var(--weight);
	text-transform: var(--transform);
	font-size: var(--size);

	text-align: var(--placeholder-align);

	color: var(--ion-text-color);

	border: var(--border-style);
	box-sizing: border-box;
	border-radius: var(--border-radius);

	z-index: 1;

	position: absolute;
	height: 100%;
}
.input-button {
	position: absolute;

	height: 39.1304347826087%;
	width: 7.11864406779661%;

	right: 18px;

	top: 20%;

	z-index: 2;
}
.input-button-icon {
	position: absolute;
	height: 100%;
	width: 21px;
}

.dropdown-arrow {
	position: absolute;

	width: 14px;
	height: 14px;

	z-index: 2;
}

.arrow-button {
	float: right;
	margin: 0;
	vertical-align: middle;
	height: 100%;
}
</style>
