<template>
    <ion-app>
        <ion-page>
            <ion-content :fullscreen="true">
                <form>
                    <div class="profile-pic">
                        <label class="-label" for="file">
                            <img id="iconcam" :src="icons.camera" alt="" @click="takePhoto" />
                        </label>
                        <img :src="aa.avatar" id="output" />
                    </div>

                    <div class="form-container">
                        <!-- name -->
                        <div class="form-control">
                            <customized-input class="input-field" input-type="text" v-model:inputValue="userData.name"
                                :cst-title="name_label" :cst-placeholder="name_placeholder"
                                :border-color="inputNameBorderColor" :label-color="inputNameLabelColor"
                                @on-focus-out="getInputValue" @focusin="setDefaultColors('name')">
                            </customized-input>
                            <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                v-if="ShowErrorName">
                                <template v-slot:errorText> {{  ErrorName  }} </template>
                            </error-message>
                        </div>
                        <!-- nickname -->
                        <div class="form-control">
                            <customized-input class="input-field" input-type="text"
                                v-model:inputValue="userData.nickname" :cst-title="nickname_label"
                                :cst-placeholder="nickname_placeholder" :border-color="inputNicknameBorderColor"
                                :label-color="inputNicknameLabelColor" @on-focus-out="getInputValue"
                                @focusin="setDefaultColors('nickname')">
                            </customized-input>
                            <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                v-if="ShowErrorNickname">
                                <template v-slot:errorText> {{  ErrorNickname  }} </template>
                            </error-message>
                        </div>
                        <!-- birthdate -->
                        <div class="form-control">
                            <customized-input class="input-field" input-type="text"
                                v-model:inputValue="userData.birthdate" :cst-title="birthdate_label"
                                :cst-placeholder="birthdate_placeholder" :border-color="inputBirthdateBorderColor"
                                :label-color="inputBirthdateBorderColor" @on-focus-out="getInputValue"
                                @focusin="setDefaultColors('birthdate')">
                            </customized-input>
                            <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                v-if="ShowErrorBirthdate">
                                <template v-slot:errorText> {{  ErrorBirthdate  }} </template>
                            </error-message>

                        </div>

                        <div id="validate_email">
                            <!-- email -->
                            <div class="form-control">
                                <customized-input class="input-field" input-type="text"
                                    v-model:inputValue="userData.user" :cst-title="email_label"
                                    :cst-placeholder="email_placeholder" :border-color="inputMailBorderColor"
                                    :label-color="inputMailLabelColor" @on-focus-out="getInputValue"
                                    @focusin="setDefaultColors('mail')">
                                </customized-input>
                                <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                    v-if="ShowErrorMail">
                                    <template v-slot:errorText> {{  ErrorMail  }} </template>
                                </error-message>
                            </div>
                            <!-- confirm email -->
                            <div class="form-control">
                                <customized-input class="input-field" input-type="text"
                                    v-model:inputValue="userData.user2" :cst-title="email2_label"
                                    :cst-placeholder="email2_placeholder" :border-color="inputMailBorderColor"
                                    :label-color="inputMailLabelColor" @on-focus-out="getInputValue"
                                    @focusin="setDefaultColors('mail')">
                                </customized-input>

                                <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                    v-if="ShowErrorMail">
                                    <template v-slot:errorText> {{  ErrorMail2  }} </template>
                                </error-message>
                            </div>
                            <error-message :iconSrc="this.icons.error_icon" class="error-match-position"
                                v-if="ShowErrorMailMatch">
                                <template v-slot:errorText> {{  ErrorMailMatch  }} </template>
                            </error-message>
                        </div>

                        <div id="validate_password">
                            <!-- password -->
                            <div class="form-control">
                                <customized-input class="input-field" input-type="text"
                                    v-model:inputValue="userData.password" :cst-title="password_label"
                                    :cst-placeholder="password_placeholder" :border-color="inputPass1BorderColor"
                                    :label-color="inputPass1BorderColor" @focusin="setDefaultColors('password')"
                                    @on-focus-out="getInputValue">
                                </customized-input>

                                <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                    v-if="ShowErrorPassword">
                                    <template v-slot:errorText> {{  ErrorPassword  }} </template>
                                </error-message>
                            </div>
                            <!-- confirm password-->
                            <div class="form-control">
                                <customized-input class="input-field" input-type="text"
                                    v-model:inputValue="userData.password2" :cst-title="password2_label"
                                    :cst-placeholder="password2_placeholder" :border-color="inputPass2BorderColor"
                                    :label-color="inputPass2BorderColor" @on-focus-out="getInputValue"
                                    @focusin="setDefaultColors('password')">
                                </customized-input>

                                <error-message :iconSrc="this.icons.error_icon" class="error-message-position"
                                    v-if="ShowErrorPassword2">
                                    <template v-slot:errorText> {{  ErrorPassword2  }} </template>
                                </error-message>
                            </div>

                            <error-message :iconSrc="this.icons.error_icon" class="error-match-position"
                                v-if="ShowErrorPasswordMatch">
                                <template v-slot:errorText> {{  ErrorPasswordMatch  }} </template>
                            </error-message>

                        </div>
                    </div>
                    <ion-button class="btn" @click="SendEdit">{{ button }}</ion-button>
                </form>

            </ion-content>

        </ion-page>
    </ion-app>
</template>

<script>
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import CustomizedInput from '@/views/components/CustomizedInput.vue';
import ErrorMessage from '@/views/components/ErrorMessage.vue';
import { IonContent, IonPage, IonButton, IonApp } from '@ionic/vue';
var email = "student@milage.pt";
var password = "123$test";
const base_url = "https://milage.ualg.pt/mlv2/";
const axios = require("axios").default;

export default {
    mounted: async function () {
        await this.getAccess();
        await this.preload();
        await this.LoadUserData();
        await this.profilePicture();
    },

    computed: {

    },
    components: {
        CustomizedInput,
        ErrorMessage,
        IonApp,
        IonContent,
        IonPage,
        IonButton
    },

    data() {
        return {
            button: "",
            ac: null,
            aa: { avatar: null },
            configs: { camera: null },
            static_base_url: "https://milage.ualg.pt/milv2static/",
            takenImageUrl: null,
            image_load: null,
            errors: {
                match: "", 
                required: ""
            },
            userData: {
                user: "",
                user2: "",
                name: "",
                nickname: "",
                birthdate: "",
                password: "",
                password2: ""

            },
            name_label: "",
            name_text: '',
            name_placeholder: "",

            nickname_label: "",
            nickname_text: '',
            nickname_placeholder: "",

            birthdate_label: "",
            birthdate_text: '',
            birthdate_placeholder: "",

            email_label: "",
            email_text: '',
            email_placeholder: "",

            email2_label: "",
            email2_text: '',
            email2_placeholder: "",

            password_label: "",
            password_text: '',
            password_placeholder: "",

            password2_label: "",
            password2_text: '',
            password2_placeholder: "",


            inputCodeBorderColor: '--ion-color-default-body',
            inputCodeLabelColor: '--ion-color-default-header',
            Error: "",

            ErrorName: "",

            ErrorMail: "",
            ErrorMail2: "",

            ErrorPassword: "",
            ErrorPassword2: "",

            ErrorNickname: "",
            ErrorBirthdate: "",

            ShowErrorName: false,
            ShowErrorMail: false,
            ShowErrorMail2: false,

            ShowErrorPassword: false,
            ShowErrorPassword2: false,
            ShowErrorPasswordMatch: false,

            ShowErrorNickname: false,
            ShowErrorBirthdate: false,


            inputBirthdateBorderColor: "--ion-color-default-body",
            inputBirthdateColor: "--ion-color-default-body",

            inputNameBorderColor: "--ion-color-default-body",
            inputNameLabelColor: "--ion-color-default-body",

            inputNicknameBorderColor: "--ion-color-default-body",
            inputNicknameLabelColor: "--ion-color-default-body",

            inputMailBorderColor: "--ion-color-default-body",
            inputMailLabelColor: "--ion-color-default-body",

            inputPass1BorderColor: "--ion-color-default-body",
            inputPass1LabelColor: "--ion-color-default-body",

            inputPass2BorderColor: "--ion-color-default-body",
            inputPass2LabelColor: "--ion-color-default-body",

            icons: { camera: null, error_icon: null },


        };
    },

    methods: {

        async SendEdit() {
            var validateError = await this.ValidateInput();
            if (validateError == false) {
                console.log("There is an error in the input");
            } else {
                await this.UpdateProfile();
            }
        },

        async ValidateInput() {
            var error = true;

            if (this.ValidateName() == false) {
                this.inputNameBorderColor = '--ion-color-secondary';
                this.inputNameLabelColor = '--ion-color-secondary';
                this.ShowErrorName = true;
                error = false;
            }

            if (this.ValidateNickname() == false) {
                this.inputNicknameBorderColor = '--ion-color-secondary';
                this.inputNicknameLabelColor = '--ion-color-secondary';
                this.ShowErrorNickname = true;
                error = false;
            }

            if (this.ValidateBirthdate() == false) {
                this.inputBirthdateBorderColor = '--ion-color-secondary';
                this.inputBirthdateLabelColor = '--ion-color-secondary';
                this.ShowErrorBirthdate = true;
                error = false;
            }

            if (this.ValidateMail() == false) {
                this.inputMailBorderColor = '--ion-color-secondary';
                this.inputMailLabelColor = '--ion-color-secondary';
                this.ShowErrorMail = true;
                error = false;
            }
            if (this.CompareMail() == false) {
                this.inputMailBorderColor = '--ion-color-secondary';
                this.inputMailLabelColor = '--ion-color-secondary';
                this.ShowErrorMailMatch = true;
                error = false;
            }

            if (this.ComparePassword() == false) {
                this.inputPass1BorderColor = '--ion-color-secondary';
                this.inputPass1LabelColor = '--ion-color-secondary';
                this.inputPass2BorderColor = '--ion-color-secondary';
                this.inputPass2LabelColor = '--ion-color-secondary';
                this.ShowErrorPasswordMatch = true;
                error = false;
            }
            return error;
        },

        ValidateName() {

            var error;
            if (this.userData.name == "") {
                this.ErrorName = "The field name is required";
                error = false;
            }
            else {

                var re = /[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+/;

                error = re.test(this.userData.name);
                this.ErrorName = "Please insert a valid name";
            }
            return error;
        },


        ValidateNickname() {
            var error;
            if (this.userData.nickname == "") {
                this.ErrorNickname = "The field nickname is required";
                error = false;
            }
            else {
                // another condition, like if already exists in the database...
            }
            return error;
        },

        ValidateBirthdate() {
            var error;
            if (this.userData.birthdate == "") {
                this.ErrorBirthdate = "The field birthdate is required";
                error = false;
            }
            return error;
        },


        ValidateMail() {
            var error = true;
            if (this.userData.user == "") {
                this.ErrorMail = "The field e-mail is required";
                error = false;
            }

            if (this.userData.user2 == "") {
                this.ErrorMail2 = "The field e-mail is required";
                error = false;
            }

            var re = /\S+@\S+\.\S+/;

            if (!re.test(this.userData.user)) {
                this.ErrorMail = "Please insert a valid e-mail";
                error = false;
            }

            if (!re.test(this.userData.user2)) {
                this.ErrorMail2 = "Please insert a valid e-mail";
                error = false;
            }


            return error;

        },


        CompareMail() {
            var error;
            if (this.userData.user != this.userData.user2) {
                this.ErrorMailMatch = this.errors.match;
                error = false;
            }
            return error;
        },

        ComparePassword() {
            var error;
            if (this.userData.password != this.userData.password2) {
                this.ErrorPasswordMatch = this.errors.match;
                error = false;
            }
            return error;
        },

        setDefaultColors(input) {

            switch (input) {
                case 'name':
                    this.inputNameBorderColor = '--ion-color-default-body';
                    this.inputNameLabelColor = '--ion-color-default-body';
                    this.ShowErrorName = false;

                    break;

                case 'nickname':
                    this.inputNicknameBorderColor = '--ion-color-default-body';
                    this.inputNicknameLabelColor = '--ion-color-default-body';
                    this.ShowErrorNickname = false;
                    break;

                case 'mail':
                    this.inputMailBorderColor = '--ion-color-default-body';
                    this.inputMailLabelColor = '--ion-color-default-body';
                    this.ShowErrorMail = false;
                    this.ShowErrorMailMatch = false;
                    break;

                case 'birthdate':

                    this.inputBirthdateBorderColor = '--ion-color-default-body';
                    this.inputBirthdateLabelColor = '--ion-color-default-body';
                    this.ShowErrorBirthdate = false;
                    break;


                case 'password':
                    this.inputPass1BorderColor = '--ion-color-default-body';
                    this.inputPass1LabelColor = '--ion-color-default-body';
                    this.inputPass2BorderColor = '--ion-color-default-body';
                    this.inputPass2LabelColor = '--ion-color-default-body';
                    this.ShowErrorPassword = false;
                    this.ShowErrorPassword2 = false;
                    this.ShowErrorPasswordMatch = false;

                    break;
            }

        },

        async preload() {
            var endpoint = "api/labels/EN0524/";


            await axios
                .get(base_url + endpoint, {})
                .catch(function (error) {
                    console.log(error);
                })
            
                .then((response) => {
                    console.log(response.data);
                    this.icons.camera = this.static_base_url + response.data.icons.camera;
                    this.icons.error_icon = this.static_base_url + response.data.icons.error_icon;
                    this.errors.match = response.data.errors.match;


                    this.name_label = response.data.labels.name;
                    this.nickname_label = response.data.labels.nick;
                    this.birthdate_label = response.data.labels.birth;
                    this.email_label = response.data.labels.email;
                    this.email2_label = response.data.labels.email2;
                    this.password_label = response.data.labels.password;
                    this.password2_label = response.data.labels.password2;

                    this.name_placeholder = response.data.helps.name;
                    this.nickname_placeholder = response.data.helps.nick;
                    this.email_placeholder = response.data.helps.email;
                    this.email2_placeholder = response.data.helps.email2;
                    this.birthdate_placeholder = response.data.helps.birth;
                    this.password_placeholder = response.data.helps.password;
                    this.password2_placeholder = response.data.helps.password2;

                    this.button = response.data.labels.button;
                 

                });
        
        },

        async LoadUserData() {

            //Load avatar
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

            //Load input fields
            await axios
                .get("https://milage.ualg.pt/mlv2/api/profile/", {
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
                    this.userData.user = resp.data.user;
                    this.userData.user2 = resp.data.user;

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

        async takePhoto() {
            //block 1
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                source: CameraSource.Prompt,
                resultType: CameraResultType.Uri,
            });
            console.log(image);
            //block 2
            this.aa.avatar = image.webPath;
            await fetch(image.webPath)
                .then((response) => response.blob())
                .then((blob) => {
                    this.image_load = new File([blob], "user_avatar.png", {
                        type: "image/png",
                    });

                    console.log(this.image_load);
                });

            await this.putPhoto(this.image_load);
        },

        async putPhoto(file) {
            let formData = new FormData();
            formData.append("avatar", file);

            var config = {
                method: "put",
                url: "https://milage.ualg.pt/mlv2/api/user-avatar/",
                headers: {
                    authorization: "Bearer " + this.ac,
                },
                data: formData,
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);

                });
            this.profilePicture();
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

        },


        async UpdateProfile() {

            var data = new FormData();

            data.append('name', this.userData.name);
            data.append('nickname', this.userData.nickname);
            data.append('email', this.userData.user);
            data.append('birthdate', this.userData.birthdate);

            var config = {
                method: 'put',
                url: 'https://milage.ualg.pt/mlv2/api/profile/',
                headers: {
                    'Authorization': 'Bearer ' + this.ac,

                },
                data: data
            };

            axios(config)

                .then((response) => {
                    console.log(response);
                    this.$router.push({ path: response.data.router });
                })

                .catch(function (error) {
                    console.log(error);

                });

        }


    },

};
</script>

<style scoped>
* {
    box-sizing: none;
}


.error-message-position {
    position: relative;
    top: 60px;

    display: block;

}

.error-match-position {
    right: 7.5%;
    position: relative;
    display: block;
    text-align: right;
}

.input-field .date {
    flex: none;
}

#validate_email {
    margin-top: 1em;
}

#validate_password {
    margin-top: 1em;
}

.form-container {

    justify-content: center;
    align-items: center;
    text-align: center;
}

.form-control {
    /* width: 100%; */
    padding: 1% 45px 79px 10%;
}

.input-field {
    position: absolute;
    display: block;
    width: 80%;
    height: 60px;

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
    width: 100px;
    height: 100px;
    border-radius: 100%;

    z-index: 0;
}

.profile-pic #iconcam {
    display: none;
}

.profile-pic:hover #iconcam {
    display: flex;
    height: 35px;
    width: 40px;
    border: none;
    border-radius: 0px;
    box-shadow: none;
}

.profile-pic .-label {
    cursor: pointer;
    width: 100px;
    height: 100px;
}

.profile-pic:hover .-label {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    transition: background-color 0.2s ease-in-out;
    border-radius: 100px;
    margin-bottom: 0;
}

.btn {
    margin-top: 1em;
    position: relative;
    align-content: center;
    height: 50px;
    left: 10%;
    top: 85.7142857142857%;
    width: 80%;
    text-align: center;
    border-radius: 10px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    font-weight: normal;

}
</style>