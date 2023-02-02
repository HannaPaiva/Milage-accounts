export default {

    SAVE_GENERAL_INFORMATION(state, data) {
        state.general_info.labels.worksheets_difficulty_levels =
            data.labels.worksheets_difficulty_levels;

        state.general_info.icons.notifications =
            data.icons.notifications;
        state.general_info.icons.messages = data.icons.messages;
        state.general_info.icons.arrow_down = data.icons.arrow_down;
        state.general_info.iconsdark.notifications =
            data.iconsdark.notifications;
        state.general_info.iconsdark.messages = data.iconsdark.messages;
        state.general_info.iconsdark.arrow_down =
            data.iconsdark.arrow_down;
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
        state.current_user_info.arrayIndex =
            current_user_info.arrayIndex;
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
        state.header.labels.drpdown_btns =
            header_data.labels.drpdown_btns;

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
}