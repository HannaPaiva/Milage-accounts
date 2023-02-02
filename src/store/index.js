import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      fonts: {
        text: {
          font: ["Roboto", "sans-serif"],
          transform: "none",
          weight: "normal",
          size: "12px",
        },
        main_title: {
          font: ["Roboto", "sans-serif"],
          transform: "uppercase",
          weight: "bold",
          size: "16px",
        },
        nore16: {
          font: ["Roboto", "sans-serif"],
          transform: "none",
          weight: "normal",
          size: "16px",
        },
        nore10: {
          font: ["Roboto", "sans-serif"],
          transform: "none",
          weight: "normal",
          size: "10px",
        },
        nore30: {
          font: ["Roboto", "sans-serif"],
          transform: "none",
          weight: "bold",
          size: "30px",
        },
        cabo14: {
          font: ["Roboto", "sans-serif"],
          transform: "uppercase",
          weight: "bold",
          size: "14px",
        },
      },

      UserAccess: "",
      static_base_url: "https://milage.ualg.pt/milv2static/",
      static_base_url_accounts: "https://milage.ualg.pt/milv2static/",
      base_url: "https://milage.ualg.pt/mlv2/api",
      general_info: {
        labels: {
          worksheets_difficulty_levels: [],
        },
        icons: {
          notifications: [],
          messages: [],
          arrow_down: null,
        },
        iconsdark: {
          notifications: [],
          messages: [],
          arrow_down: null,
        },
        colors: {
          normal_color: [],
          is_draft_color: [],
          is_editable_color: [],
          colors_sectors: [],
        },
        colors_dark: {
          normal_color: [],
          is_draft_color: [],
          is_editable_color: [],
          colors_sectors: [],
        },
      },
      dropdown_labels: {
        title_label: null,
        apply_label: null,
      },
      user_info: {
        drpdown_btns: null,
        drpdown_list: [
          {
            name: null,
            uuid: null,
            avatar: null,
            router: null,
            checked: null,
          },
        ],
        msg_notifications: [],
      },
      current_user_info: {
        header_button_array: [
          {
            btn_label: null,
            btn_number: null,
            btn_router: null,
          },
        ],
        dropdown_button_array: [
          {
            btn_name: null,
            btn_router: null,
          },
        ],
        current_notifications: null,
        current_messages: null,
        avatar: null,
        name: null,
        router: null,
        uuid: null,
        arrayIndex: null,
        floating_buttons: null,
        btn_solve_assess: null,
      },
      header: {
        labels: {
          title: "",
          drpdown_btns: "",
        },
        commands: {
          avatar_user_router: "",
          msg_notifications_routers: "",
          drpdown_routers: "",
        },
      },
      active_buttons: [],
      footer_data: {},
      active_buttons_class: [],
      cards: [],
      add_remove: {
        data: {
          labels: {
            btn_add: "",
            btn_remove: "",
          },
          icons: {
            btn_add_icon: "",
            btn_remove_icon: "",
          },
          iconsdark: {
            btn_add_icon: "",
            btn_remove_icon: "",
          },
        },
        list: {},
        current_item_index: {},
      },

      scr0523B: {
        router_link: "",
        showErrorMessage: false,
        showErrorButton: false,
        inputCodeBorderColor: "--ion-color-default-body",
        inputCodeLabelColor: "--ion-color-default-header",
        labels: {
          button: "",
          title: "An email was sent to your mentor",
          code: "",
          lines: [],
        },
        helps: {
          code: "",
        },
        icons: {
          icon1: "",
          error_icon: "",
        },
        iconsdark: {
          icon1: "",
          error_icon: "",
        },
        errors: {
          errorMessage: "An error occured.",
          empty: "",
        },
        userInput: {
          code: "",
        },
      },

      scr0523A: {
        router_link: "",
        showErrorMessage: false,
        showErrorButton: false,
        inputCodeBorderColor: "--ion-color-default-body",
        inputCodeLabelColor: "--ion-color-default-header",
        labels: {
          button: "",
          title: "Send code",
          code: "",
          lines: ["Enter you mentor’s email below to send this code."],
        },
        helps: {
          code: "Enter your mentor’s email",
        },
        icons: {
          icon1: "",
          error_icon: "",
        },
        iconsdark: {
          icon1: "",
          error_icon: "",
        },
        errors: {
          errorMessage: "An error occured.",
          empty: "",
        },
        userInput: {
          code: "",
        },
      },

      scr0522: {
        send: "user-account-send-code",
        router_link: "",
        showErrorMessage: false,
        showErrorButton: false,
        inputCodeBorderColor: "--ion-color-default-body",
        inputCodeLabelColor: "--ion-color-default-header",
        labels: {
          button: "",
          title: "Person's name",
          code: "",
          lines: ["Enter you mentor’s email below to send this code."],
        },
        helps: {
          code: "Enter your mentor’s email",
        },
        icons: {
          icon1: "",
          error_icon: "",
        },
        iconsdark: {
          icon1: "",
          error_icon: "",
        },
        errors: {
          errorMessage: "An error occured.",
          empty: "",
        },
        userData: {},
        userInput: {
          code: "",
        },
      },
      scr0521: {
        labels: {
          sections: [],
          options: [],
        },

        commands: {
          options: [],
        },

        icons: {
          options: [],
        },
      },
    };
  },
  mutations: {
    SaveProfilePicture(state, data) {
      state.scr0522.userData.avatar = data.avatar;
    },


    SAVE_GENERAL_INFORMATION(state, data) {
      state.general_info.labels.worksheets_difficulty_levels =
        data.labels.worksheets_difficulty_levels;

      state.general_info.icons.notifications = data.icons.notifications;
      state.general_info.icons.messages = data.icons.messages;
      state.general_info.icons.arrow_down = data.icons.arrow_down;
      state.general_info.iconsdark.notifications = data.iconsdark.notifications;
      state.general_info.iconsdark.messages = data.iconsdark.messages;
      state.general_info.iconsdark.arrow_down = data.iconsdark.arrow_down;
      state.general_info.colors = data.colors;
      state.general_info.colors_dark = data.colors_dark;
    },

    SAVE_ACTIVE_BUTTONS(state, active_buttons) {
      state.active_buttons = active_buttons;
    },
    SAVE_FOOTER_LABELS(state, footer_data) {
      state.footer_data = footer_data;
    },
    SAVE_ACTIVE_BUTTONS_CLASS(state, active_buttons_class) {
      state.active_buttons_class = active_buttons_class;
    },
    UPDATE_USER_INFO(state, user_info) {
      state.user_info.drpdown_btns = user_info.drpdown_btns;
      state.user_info.drpdown_list = user_info.drpdown_list;
      state.user_info.msg_notifications = user_info.msg_notifications;
    },
    UPDATE_CURRENT_USER_PROFILE(state, current_user_info) {
      state.current_user_info.avatar = current_user_info.avatar;
      state.current_user_info.name = current_user_info.name;
      state.current_user_info.router = current_user_info.router;
      state.current_user_info.uuid = current_user_info.uuid;
      state.current_user_info.arrayIndex = current_user_info.arrayIndex;
      state.current_user_info.floating_buttons =
        current_user_info.floating_buttons;
      state.current_user_info.btn_solve_assess =
        current_user_info.btn_solve_assess;
    },
    UPDATE_CURRENT_USER_NOTIFICATION(state, current_user_info) {
      state.current_user_info.current_notifications =
        current_user_info.current_notifications;
    },
    UPDATE_CURRENT_USER_MESSAGES(state, current_user_info) {
      state.current_user_info.current_messages =
        current_user_info.current_messages;
    },
    UPDATE_CURRENT_USER_BTNS(state, current_user_info) {
      state.current_user_info.header_button_array =
        current_user_info.header_button_array;
      state.current_user_info.dropdown_button_array =
        current_user_info.dropdown_button_array;
    },
    UPDATE_DROPDOWN_LABELS(state, data) {
      state.dropdown_labels.title_label = data.title_label;
      state.dropdown_labels.apply_label = data.apply_label;
    },
    SAVE_HOMEPAGE_HEADER_DATA(state, header_data) {
      state.header.labels.title = header_data.labels.title;
      state.header.labels.drpdown_btns = header_data.labels.drpdown_btns;

      state.header.commands.avatar_user_router =
        header_data.commands.avatar_user_router;
      state.header.commands.msg_notifications_routers =
        header_data.commands.msg_notifications_routers;
      state.header.commands.drpdown_routers =
        header_data.commands.drpdown_routers;
    },
    SAVE_USER_CARDS_LIST(state, list) {
      state.cards = list;
    },
    SAVE_ADD_REMOVE_LABELS(state, data) {
      state.add_remove.data = data;
    },
    UPDATE_ADD_REMOVE_LIST(state, data) {
      state.add_remove.list = data;
    },
    UPDATE_CURRENT_ITEM_INDEX_ADD_REMOVE_LIST(state, data) {
      state.add_remove.current_item_index = data;
    },

    SCREEN_0523B(state, data) {
      console.log(data);
      state.scr0523B.labels.title = data.labels.title;
      state.scr0523B.icons.img1 = data.icons.img1;
    },
  },

  getters: {
    get_send_code_A_title(state) {
      return state.scr0523A.labels.title;
    },
    get_send_code_B_title(state) {
      return state.scr0523B.labels.title;
    },

    get_send_code_A_lines(state) {
      return state.scr0523A.labels.lines;
    },
    get_send_code_A_placeholder(state) {
      return state.scr0523A.helps.code;
    },

    // SCREEN_0521(state, data) {
   
    //   state.scr0521.labels.sections = data.labels.sections;
    //   state.scr0521.labels.options = data.labels.options;
    //   state.scr0521.commands.options = data.commands.options;
    //   state.scr0521.icons.options = data.icons.options;
    //   state.scr0521.button = data.labels.button;
    // },
  },
});

export default store;
