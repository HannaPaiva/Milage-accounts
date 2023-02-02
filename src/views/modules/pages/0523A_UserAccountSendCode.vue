<template>
    <ion-app>
        <ion-page>
            <ion-content>

                <div class="top"></div>
                <ion-img class="icon-modify" :src="this.icons.img1">
                </ion-img>
                <div>
                    <title class="title">{{  labels.title  }}</title>
                </div>

                <div class="line" name="list" v-for="line in labels.lines" :key="line">
                    <p>{{  line  }}</p>
                </div>


                <customized-input class="input-code" input-type="text" v-model:inputValue="email_text"
                    :cst-title="labels.email" :cst-placeholder="helps.email" :border-color="inputMailBorderColor"
                    :label-color="inputMailLabelColor" @on-focus-out="getInputValue"
                    @focusin="setDefaultColors('mail')">
                </customized-input>

                <error-message :iconSrc="this.icons.error_icon" class="error-message-position" v-if="ShowErrorMail">
                    <template v-slot:errorText> {{  ErrorMail  }} </template>
                </error-message>

                <ion-button class="btn" @click="SendCode">{{ labels.button }}</ion-button>
            </ion-content>
        </ion-page>
    </ion-app>
</template>

<script>


import { IonContent, IonPage, IonButton, IonImg, IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import ErrorMessage from '@/views/components/ErrorMessage.vue';
import CustomizedInput from '@/views/components/CustomizedInput.vue';

const base_url = "https://milage.ualg.pt/mlv2/";

const axios = require('axios').default;

// const axios = require('axios').default;


export default defineComponent(
    {
        name: 'SendCodeSuccess',
        components: {
            IonContent,
            IonPage,
            IonImg,
            IonApp,
            IonButton,
            CustomizedInput,
            ErrorMessage

        },

        mounted: async function () {
            await this.preload();
        },

        computed: {
            titulo() {
                return this.$store.getters.get_send_code_A_title;
            },
            lines() {
                return this.$store.getters.get_send_code_A_lines;
            },
            placeholder() {
                return this.$store.getters.get_send_code_A_placeholder;
            },


        },

        data() {

            return {


                email_label: "e-mail",
                email_text: '',

                inputCodeBorderColor: '--ion-color-default-body',
                inputCodeLabelColor: '--ion-color-default-header',

                email: "milage@ualg.pt",

                inputCodeBorderColor1: "#535353",
                inputCodeLabelColor1: "#535353",

                router_link: '',
                showErrorMessage: false,
                showErrorButton: false,
                ErrorMail: "",
                inputMailBorderColor: "--ion-color-default-body",
                inputMailLabelColor: "--ion-color-default-body",
                ShowErrorMail: false,
                labels: {
                    button: '',
                    title: '',
                    email: '',
                    lines: [],
                },
                helps: {
                    email: '',
                },
                icons: {
                    img1: '',
                    error_icon: "",
                },
                iconsdark: {
                    icon1: '',
                    error_iconn: '',
                },
                errors: {
                    errorMessage: 'An error occured.',
                    empty: '',
                },
                userInput: {
                    code: '',
                },
                static_base_url: "https://milage.ualg.pt/milv2static/",

            }
        },


        methods: {

            async preload() {
                var endpoint = "/api/labels/EN0523A/";
                await axios
                    .get(base_url + endpoint, {})
                    .catch(function (error) {
                        console.log(error);
                    })

                    .then((response) => {
                        console.log(response.data);

                        this.labels.title = response.data.labels.title;
                        this.labels.lines = response.data.labels.lines;
                        this.labels.email = response.data.labels.email;
                        this.labels.button = response.data.labels.button;
                        this.helps.email = response.data.helps.email;
                        this.icons.error_icon = this.static_base_url + response.data.icons.error_icon;
                        this.icons.img1 = this.static_base_url + response.data.icons.img1;
                    });
            },


            SendCode() {
                if (this.ValidateMail() == false) {
                    this.inputMailBorderColor = '--ion-color-secondary';
                    this.inputMailLabelColor = '--ion-color-secondary';
                    this.ShowErrorMail = true;

                } else {
                    this.$router.push('/user-account-send-code-success');
                }


            },


            ValidateMail() {
                var error = true;

                if (this.email_text == "") {
                    this.ErrorMail = "The field e-mail is required";
                    error = false;
                }

                var re = /\S+@\S+\.\S+/;

                if (!re.test(this.email_text)) {
                    this.ErrorMail = "Please insert a valid e-mail";
                    error = false;
                }


                return error;

            },

            setDefaultColors(input) {

                switch (input) {

                    case 'mail':
                        this.inputMailBorderColor = '--ion-color-default-body';
                        this.inputMailLabelColor = '--ion-color-default-body';
                        this.ShowErrorMail = false;
                        this.ShowErrorMailMatch = false;
                        break;

                }

            },


        },

    });

</script>


<style scoped>
* {
    box-sizing: none;
}


.error-message-position {
    position: relative;
    right: 10%;
    display: block;

}

.error-match-position {

    position: relative;
    display: block;
    text-align: right;
}

.input-code {
    position: relative;

    left: 10%;
    width: 80%;
    height: 8%;

}

.top {
    padding-top: 150px;
}

.title {

    align-content: center;
    height: 70px;
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
    padding: 25px 0px 0px 0px;
}

.icon-modify {
    height: 12%;
    width: 100%;
    align-items: center;
}

.btn {
    position: absolute;
    align-content: center;
    width: 70.926517571885%;
    height: 08.21428571428571%;
    left: 14.33%;
    top: 85.7142857142857%;
    width: 70%;
    height: 46px;
    text-align: center;
    border-radius: 10px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.card {
    left: 100%;
    right: -100%;
    top: 0%;
    bottom: 0%;
    background: #FFFFFF;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

p {
    margin-top: 0px;
    margin-bottom: 0px;
    line-height: 120%;
    font-weight: 450;
    font-size: 17px;
    text-align: center;
    color: #535353;
}

#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}

.center {
    align-content: center;
    text-align: center;
}

.cont {
    display: flex;
    width: 22px;
}

.line {

    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 109.55%;
    text-align: center;
    word-break: keep-all;
    overflow: hidden !important;
    display: block;
    align-self: stretch;
    padding: 0px 30px 40px 30px;
    align-content: center;
    font-family: 'Roboto', 'sans-serif';
    font-style: normal;
    line-height: 16px;
    color: #535353;
    align-self: center;

}
</style>



