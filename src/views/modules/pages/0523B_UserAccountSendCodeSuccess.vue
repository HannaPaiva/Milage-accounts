<template>
    <ion-app>
        <ion-page>
            <ion-content :fullscreen="true">

                <div class="top"></div>
                <ion-img class="icon-modify" src="https://milage.ualg.pt/milv2static/icons/white/success_mark.svg">
                </ion-img>
                <div>
                    <title class="title">{{  labels.title  }}</title>
                </div>
                <ion-button class="btn" @click="preload">{{ labels.btn }}</ion-button>

            </ion-content>
        </ion-page>
    </ion-app>
</template>

<script>
import { IonContent, IonPage, IonButton, IonImg, IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';

const base_url = "https://milage.ualg.pt/mlv2/";
const axios = require('axios').default;

export default defineComponent(
    {
        name: 'SendCodeSuccess',
        components: {
            IonContent,
            IonPage,
            IonImg,
            IonButton,
            IonApp,
        },

        mounted: async function () {
            await this.preload(); 
        },

        computed: {
          
        },

        data() {

            return {

                router_link: '',
                showErrorMessage: false,
                showErrorButton: false,
                inputCodeBorderColor: '--ion-color-default-body',
                inputCodeLabelColor: '--ion-color-default-header',
                labels: {
                    btn: '',
                    title: '',

                    lines: [],
                },
                helps: {
                    code: '',
                },
                icons: {
                    img1: '',
                    error_icon: '',
                },
                iconsdark: {
                    icon1: '',
                    error_icon: '',
                },
                errors: {
                    errorMessage: 'An error occured.',
                    empty: '',
                },
                userInput: {
                    code: '',
                },

            }
        },

        methods: {
            async preload() {
                var endpoint = "/api/labels/EN0523B/";
                await axios
                    .get(base_url + endpoint, {})
                    .catch(function (error) {
                        console.log(error);
                    })

                    .then((response) => {
                        console.log(response.data);

                        this.labels.title = response.data.labels.title;
                        this.labels.lines = response.data.labels.lines;
                        this.labels.btn = response.data.labels.btn;

                        this.icons.img1 = this.static_base_url + response.data.icons.img1;
                    });
            },


        },

    });
</script>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

.top {
    padding-top: 222px;
}

.title {
    align-content: center;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 790;
    font-size: 30px;
    line-height: 35px;
    text-align: center;
    word-break: keep-all;
    overflow: hidden !important;
    display: block;
    align-self: stretch;
    padding: 25px 25px 25px 25px;
}

.icon-modify {
    height: 13% !important;
    width: 100% !important;
    align-items: center !important;
}

.btn {
    position: absolute;
    align-content: center;
    width: 70.926517571885%;
    height: 08.21428571428571%;
    left: 14.33%;
    top: 85.7142857142857%;
    width: 70%;
    text-align: center;
    border-radius: 10px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
</style>



