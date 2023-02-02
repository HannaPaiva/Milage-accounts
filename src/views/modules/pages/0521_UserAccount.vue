<template>
    <ion-app>
        <ion-page>
            <ion-content>
                <div style="width:100%">
                    <div v-for="(section, index) in labels.sections" :key="index">
                        <div class="main-title" :style="style_title"> {{  section  }} </div>

                        <div class="link-list">
                            <ion-item v-for="(option, item) in labels.options[index]" :key="option"
                                @click="ChangeRoute('/' + commands.options[index][item])">
                                <ion-icon :src="static_link + icons.options[index][item]"></ion-icon>
                                <ion-label class="info-text">{{  option  }} </ion-label>
                            </ion-item>
                        </div>
                    </div>
                </div>
                <ion-button class="btn">{{  button  }}</ion-button>
            </ion-content>
        </ion-page>
    </ion-app>
</template>
<script>

import { defineComponent } from "vue";
import { IonIcon, IonPage, IonApp } from '@ionic/vue';
const axios = require('axios').default;
var email = "student@milage.pt";
var password = "123$test";
const base_url = "https://milage.ualg.pt/mlv2/";
export default defineComponent({
    components: {
        IonIcon,
        IonPage,
        IonApp,
    },

    mounted: async function () {
        // await this.getAccess();
        await this.BeforeLoad();
    },

    computed: {
        static_link() {
            return this.$store.state.static_base_url_accounts;
        },

        style_title() {
            return {
                '--main_title_font': this.main_title_font[0] + ", " + this.main_title_font[1],
                '--main_title_color': this.main_title_color,
                '--main_title_transform': 'none',
                '--main_title_weight': this.main_title_weight,
                '--main_title_size': this.main_title_size,
            };
        },


    },

    data() {
        return {
            main_title_font: [
                "Roboto",
                "sans-serif"
            ],

            main_title_transform: "uppercase",
            main_title_weight: "bold",
            main_title_size: "0.75rem",
            button: "",
            labels: {
                title: "",
                info_labels: [

                ],
                sections: [

                ],
                options: [

                ],
                button: "",
                btns_subtitles: [

                ]
            },
            helps: {},
            icons: {
                btns_normal_icons: [

                ],
                btns_selected_icons: [

                ],
                options: [

                ]
            },
            iconsdark: {
                btns_normal_icons: [

                ],
                btns_selected_icons: [

                ],
                options: [

                ]
            },
            errors: {},
            commands: {
                btn_routers: [

                ],
                selected_button: 4,
                info_routers: [

                ],
                msg_notifications_routers: [

                ],
                drpdown_routers: [

                ],
                avatar_user_router: "",
                button_router: "login",
                options: [

                ]
            },
        }


    },

    methods: {


        async ChangeRoute(route) {
            this.$router.push(route);
        },

        async BeforeLoad() {
            await this.getAccess();
            await axios
                .get('https://milage.ualg.pt/mlv2/api/labels/EN0521/', {
                    // headers: {
                    //     authorization: "Bearer " + this.ac,
                    // },
                }).catch(function (error) {
                    console.log(error);
                })
                .then((resp) => {
                    console.log(resp.data);
                    this.labels.sections = resp.data.labels.sections;
                    this.labels.options = resp.data.labels.options;
                    this.commands.options = resp.data.commands.options;
                    this.icons.options = resp.data.icons.options;
                    this.button = resp.data.labels.button;
                });

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

            console.log(this.ac); //woks
        },


    },

});
</script>

<style scoped>
.link-list {
    padding-bottom: 50px;

}


ion-title {
    font-family: var(--main_title_font);

    font-weight: var(--main_title_weight);

}

ion-item {
    --border-color: #E3F5FB;
    padding-bottom: 20px;
}

.list-link {
    display: inline-block;
}


.main-title {
    font-family: var(--main_title_font);
    text-transform: var(--main_title_transform);
    font-weight: var(--main_title_weight);
    text-align: center;
    padding-bottom: 20px;
    padding-top: 20px;
    font-style: normal;

    font-size: 16px;
    line-height: 19px;



}

.info-text {
    padding-left: 15px;
}

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


p {
    margin-top: 0px;
    margin-bottom: 0px;
}

.input-code {
    position: absolute;
    width: 74%;
    height: 13.22%;

}


.button-bottom {

    position: absolute;
    width: 74%;
    height: 08.21428571428571%;
    left: 14.33%;
    top: 85.7142857142857%;
}

.btn {
    margin-top: 1em;
    position: relative;
    align-content: center;
    height: 50px;
    left: 10%;
    top: -8%;
    width: 80%;
    text-align: center;
    border-radius: 10px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    font-weight: normal;
    --background: #E53D00;

}
</style>
