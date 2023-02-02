<template>
    <ion-app>
        <ion-page>
            <ion-content>
                <!-- main profile container -->
                <div class="profile-header">
                    <!-- icon Container -->
                    <div style="width:100%">
                        <ion-button fill="clear" class="item-right pen-icon" :router-link='commands.edit'>
                            <ion-icon src="https://milage.ualg.pt/milv2static/icons/accounts/white/edit_profile.svg">
                            </ion-icon>
                        </ion-button>
                    </div>
                    <!-- Avatar Container -->
                    <div class="profile-pic">
                        <label class="-label" for="file">
                        </label>
                        <img :src="userData.avatar" id="output" width="200" />
                    </div>
                    <!-- Rectangle with user data -->
                    <div class="profile-data">
                        <h1 class="username">{{  userData.name  }}</h1>
                        <div class="profile-info rectangle140">
                            <h2 class="display-user-data">@{{  userData.nickname  }}</h2>
                            <h2 class="display-user-data">{{  userData.email  }}</h2>
                            <h2 class="display-user-data ">{{  userData.birthdate  }}</h2>
                        </div>
                    </div>
                    <!-- Code title -->
                    <div class="profile-stats">
                        <strong id="code">{{  labels.code  }}</strong>
                    </div>
                    <!-- Rectangle with code and COPY/SEND buttons -->
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <span id="rectangle_title">{{  labels.info  }}</span>
                            <div class="rectangle121">

                                <div class="code">
                                    <!-- COPY button-->
                                    <ion-button fill="clear" id="copy" @click="CopyToClipboard(userData.student_code)">
                                        <span class="CopySend">{{  labels.copy  }}</span>
                                    </ion-button>
                                    <!-- The student code-->
                                    <span id="number"> {{  userData.student_code  }} </span>
                                    <!-- SEND button-->
                                    <ion-button fill="clear" id="send">
                                        <span class="CopySend" @click="ChangeRoute(commands.send)">{{  labels.send  }}</span>
                                    </ion-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </ion-content>
        </ion-page>
    </ion-app>
</template>

<script>
import { Clipboard } from '@capacitor/clipboard';
import { defineComponent } from "vue";
import { IonIcon, IonButton, IonPage, IonApp } from '@ionic/vue';

const axios = require('axios').default;
var email = "student@milage.pt";
var password = "123$test";
const base_url = "https://milage.ualg.pt/mlv2/";

export default defineComponent({
    components: {
        IonIcon,
        IonButton,
        IonPage,
        IonApp
    },

    mounted: async function () {
        await this.preload();
        await this.getAccess();
        await this.LoadUserData();
    },

    name: "User-Account-info",
    computed: {

        mainconfigs() {
            return 'https://milage.ualg.pt/milv2static/icons/accounts/dark/camera.svg'
        },
    },


    data() {
        return {
            ac: null,
            aa: { avatar: null },
            configs: { icons: null },
            static_base_url: "https://milage.ualg.pt/milv2static/",
            takenImageUrl: null,
            image_load: null,
            ProfilePicture: this.$store.state.scr0522.userData.ProfilePicture,

            userData: {
                name: "",
                nickname: "",
                birthdate: "",
                email: "",
                student_code: "",
                avatar: this.$store.state.scr0522.userData.avatar,
            },

            router_link: '',
            showErrorMessage: false,
            showErrorButton: false,
            inputCodeBorderColor: '--ion-color-default-body',
            inputCodeLabelColor: '--ion-color-default-header',
            labels: {

                title: '',
                code: '',
                info: '',
                copy: '',
                send: ''
            },
            helps: {
                code: '',
            },
            icons: {
                icon1: '',
                error_icon: '',
            },
            iconsdark: {
                icon1: '',
                error_icon: '',
            },
            errors: {
                errorMessage: '',
                empty: '',
            },
            userInput: {
                code: '',
            },

            commands: {
                edit: "",
                send: ""
            }


        };
    },


    methods: {

        async preload() {
            var endpoint = "/api/labels/EN0522/";


            await axios
                .get(base_url + endpoint, {})
                .catch(function (error) {
                    console.log(error);
                })

                .then((response) => {
                    console.log(response.data);

                    this.labels.code = response.data.labels.code;
                    this.labels.title = response.data.labels.title;
                    this.labels.info = response.data.labels.info;
                    this.labels.copy = response.data.labels.copy;
                    this.labels.send = response.data.labels.send;
                    this.commands.edit = response.data.commands.edit;
                    this.commands.send = response.data.commands.send;

                });

        },


        async ChangeRoute(route) {
            this.$router.push({ path: route });
        },

        async CopyToClipboard(code) {

            await Clipboard.write({
                string: code
            }).then(() => {
                console.log("Foi copiado " + code + " para a clipboard");
            });

            //Optional
            const { type, value } = await Clipboard.read();
            console.log(`Got ${type} from clipboard: ${value}`);
        },



        async getAccess() {
            const data = {
                email: email,
                password: password,
                language: "EN",
            };
            await axios
                .post(base_url + "api/login/", data)
                .then((resp) => {
                    const credentials = resp.data;
                    this.ac = credentials.access;
                })
                .catch((err) => {
                    console.log(err);
                });

            // console.log(this.ac); //woks
        },

        async GetLabels() {
            const data = {
                email: email,
                password: password,
                language: "EN",
            };
            await axios
                .post(base_url + "api/login/", data)
                .then((resp) => {
                    const credentials = resp.data;
                    this.ac = credentials.access;
                })
                .catch((err) => {
                    console.log(err);
                });


        },

        async LoadUserData() {

            // console.log(this.ac);
            await axios
                .get(base_url + "api/user-avatar/", {
                    headers: {
                        authorization: "Bearer " + this.ac,
                    },
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then((response) => (this.aa = response.data));

            await axios
                .get("https://milage.ualg.pt/mlv2/api/user-account-info/", {
                    headers: {
                        authorization: "Bearer " + this.ac,
                    },
                })

                .catch(function (error) {
                    console.log(error);
                })
                .then((resp) => {
                    console.log(resp.data);
                    this.userData.name = resp.data.name;
                    this.userData.nickname = resp.data.nickname;
                    this.userData.birthdate = resp.data.birthdate;
                    this.userData.email = resp.data.email;
                    this.userData.student_code = resp.data.student_code;
                    this.userData.avatar = resp.data.avatar;

                });


        },

        async profilePicture() {
            await this.getAccess();
            await axios
                .get(base_url + "api/user-avatar/", {
                    headers: {
                        authorization: "Bearer " + this.ac,
                    },
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then((response) => (this.aa = response.data));


        },

    },

});
</script>

<style scoped>
body {
    font-family: 'Roboto', sans-serif;
}

.item-right {
    top: 0px;
    right: 0px;
    flex-direction: column;
    float: right;
    align-items: end !important;
}

.username {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 19px;
    text-align: center;
    padding-bottom: 10px;
}

.pen-icon {
    float: right;
    font-size: 0.75rem;
}

.code {

    padding: 10px 0;
    text-align: center;
    align-items: center;
    font-weight: 700;
    font-size: 30px;
    line-height: 35px;
    cursor: default;
}

#number {

    top: 3.5px;
    padding: 10px 0;
    text-align: center;
    align-items: center;
    font-weight: 750;
    font-size: 30px;
    line-height: 35px;
}


.CopySend {
    position: relative;
    bottom: 7px;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: #969696;
}

#code {
    padding-top: 10px;
    font-style: normal;
    font-weight: 750;
    font-size: 22px;
    line-height: 19px;
    text-align: center;
}

#rectangle_title {

    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    text-align: center;
    color: #969696;
}

.profile-data {
    text-align: center;
}

.rectangle140 {
    width: 310px;
    align-items: center;
    text-align: center;
    padding: 10px 10px 10px 10px;
    background: #EFEFEF;
    border-radius: 10px;
}

.rectangle121 {
    width: 310px;
    height: 60px;
    align-items: center;
    background: #EFEFEF;
    border-radius: 10px;
    align-items: flex-end;
}

p {
    margin-top: 0px;
    margin-bottom: 0px;
}

.profile-pic {
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1));
    color: transparent;
    transition: all 1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 1s ease;
    padding-bottom: 20px;

}

.profile-pic input {
    display: none;
}

.profile-pic img {
    position: absolute;
    object-fit: cover;
    width: 115px;
    height: 115px;
    border-radius: 100%;
    z-index: 0;
}

.profile-pic .-label {
    cursor: pointer;
    width: 115px;
    height: 115px;
}

* {
    margin: 0;
}

.profile-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    /* border-bottom: 1px solid gainsboro; */
}

.profile-info {
    margin-top: 0.5rem;
}

.display-user-data {
    text-align: center;
    font-size: 1rem;
    line-height: 170%;
}

.profile-stats {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
}

.profile-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 70px;
    cursor: pointer;
}
</style>
