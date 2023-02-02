<template>
	<ion-button
		:color="buttonColor"
		:fill="buttonFill"
		:router-link="navigateTo"
		@click="$emit('onClickFunction')"
		:style="btnFontStyle"
	>
		<slot />
	</ion-button>
</template>

<script>
import { defineComponent } from 'vue';
import { IonButton } from '@ionic/vue';

export default defineComponent({
	name: 'ConfirmButton',
	data() {
		return {
			test: '22px',
		};
	},
	components: {
		IonButton,
	},
	props: {
		buttonColor: String,
		buttonFill: String,
		textColor: String,
		navigateTo: String,
	},
	computed: {
		btnFontStyle() {
			return {
				'--family':
					this.$store.state.fonts.btn.font[0] +
					', ' +
					this.$store.state.fonts.btn.font[1],
				'--transform': this.$store.state.fonts.btn.transform,
				'--weight': this.$store.state.fonts.btn.weight,
				'--size': this.$store.state.fonts.btn.size,
			};
		},
	},
});
</script>

<style scoped>
ion-button {
	width: 78.66666666666667%;
	height: 6.89655172413793%;
	border-radius: 10px;

	font-family: var(--family);
	text-transform: var(--transform);
	font-weight: var(--weight);
	font-size: var(--size);

	text-align: center;
}
</style>
