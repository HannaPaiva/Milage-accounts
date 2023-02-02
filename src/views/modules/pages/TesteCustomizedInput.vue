<template>
    <ion-app>
    <ion-page>
        <ion-content>

            <customized-input
            class="input-code"
            input-type="text"
            v-model:inputValue="email_text"
            :cst-title="email_label"
            :cst-placeholder="placeholder1"
            :border-color="inputCodeBorderColor"
            :label-color="inputCodeLabelColor"
            @on-focus-out="getInputValue">
            </customized-input>

            <ion-button router-link = "/user-account-info"></ion-button>
</ion-content>
    </ion-page>
</ion-app>
</template>

<script >


import {  IonApp,IonPage, IonContent, IonButton } from '@ionic/vue';
import CustomizedInput from '@/views/components/CustomizedInput.vue';

//const axios = require('axios').default;

export default {
        name: 'TestInput',
        components: {
            IonContent,
            IonApp,
            IonPage,
            CustomizedInput,
            IonButton,
        },
        data() {
            return {
                email_label:"e-mail",
                email_text:'',
                placeholder1:"insert an e-mail here",
                inputCodeBorderColor: '--ion-color-default-body',
                inputCodeLabelColor: '--ion-color-default-header',
                }
        },
        methods: {
             getInputValue() {
                 console.log(this.email_text);
             }
        },

    };

</script>


<style scoped>
.input-code {
	position: absolute;
    top:10%;
    left:10%;
	width: 80%;
	height: 10%; /* Verhätnis zum gesamten Inline-Block Body*/
}
</style>
