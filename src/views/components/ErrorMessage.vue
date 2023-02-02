<template>
	<div class="error-message-wrap">
		<div class="error-text" :style="errorTextFontStyle">
			<slot name="errorText" />
		</div>

		<ion-icon :src="iconSrc" class="icon-size"> </ion-icon>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { IonIcon } from '@ionic/vue';

export default defineComponent({
	name: 'ErrorMessage',
	props: {
		iconSrc: String,
	},
	components: {
		IonIcon,
	},
	computed: {
		errorTextFontStyle() {
			return {
				'--family':
				"Roboto, sans-serif",
				'--transform': "none",
				'--weight': "normal",
				'--size': "0.75rem",
			};
		},
	},
});
</script>

<style scoped>
.error-message-wrap {
	position: relative;
	display: inline-block;
	text-align: right;
}
.error-text {
	display: inline-block;
	vertical-align: middle;
	margin-right: 3px;

	font-family: var(--family);
	font-weight: var(--weight);
	text-transform: var(--transform);
	font-size: var(--size);

	color: var(--ion-color-secondary);
	width: 92%; /* Triggers line-break, if text is too long  */
}
.icon-size {
	display: inline-block;
	vertical-align: middle;
	padding-bottom: 1px; /*Without the padding text and icon do not align the same*/

	width: 10px;
	height: 10px;
}
</style>
