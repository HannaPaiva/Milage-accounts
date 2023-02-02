<template>

  <div class="profile-pic">
    <label class="-label" for="file">
      <img id="iconcam" :src="static_base_url + configs.camera" alt="" @click="takePhoto" />
    </label>
    <!-- <input id="file" type="file" name="AvatarImageComponent" /> -->
    <img :src="aa.avatar" id="output" width="200" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
var email = "student@milage.pt";
var password = "123$test";
const base_url = "https://milage.ualg.pt/mlv2/";

const axios = require("axios").default;
export default defineComponent({
  name: "user-avatar",
  data() {
    return {

      mounted: function () {
   
      },

      ac: null,
      aa: { avatar: null },
      configs: { camera: null },
      static_base_url: "https://milage.ualg.pt/milv2static/",
      takenImageUrl: null,
      image_load: null,

    };
  },

  props: {
    buttonColor: String,
    buttonFill: String,
    textColor: String,
    navigateTo: String,
  },


  methods: {
    async getFile(event) {
      console.log(event);
      let formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      var config = {
        method: "post",
        url: "https://milage.ualg.pt/mlv2/api/user-avatar/",
        headers: {
          authorization: "Bearer " + this.ac,
        },
        data: formData,
      };

      console.log(event.target.files[0]);
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async preload() {
      var endpoint = "api/labels/EN0521/";
      // await this.getAccess()
      await axios
        .get(base_url + endpoint, {})

        .catch(function (error) {
          console.log(error);
        })
        .then((response) => (this.configs = response.data.icons));
      console.log(this.configs);
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
        method: "post",
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

  },

  computed: {
    btnFontStyle() {
      return {
        "--family":
          this.$store.state.fonts.btn.font[0] +
          ", " +
          this.$store.state.fonts.btn.font[1],
        "--transform": this.$store.state.fonts.btn.transform,
        "--weight": this.$store.state.fonts.btn.weight,
        "--size": this.$store.state.fonts.btn.size,

      };
    },
  },
});
</script>

<style scoped>
.profile-pic {
  color: transparent;
  transition: all 1s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 1s ease;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 165px;
  height: 165px;
  /* box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35); */
  border-radius: 100px;
  z-index: 0;
}

.profile-pic #iconcam {
  display: none;
}

.profile-pic:hover #iconcam {
  display: flex;
  height: 45px;
  width: 50px;
  border: none;
  border-radius: 0px;
  box-shadow: none;
}

.profile-pic .-label {
  cursor: pointer;
  height: 165px;
  width: 165px;
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
</style>
