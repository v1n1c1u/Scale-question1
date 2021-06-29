document.addEventListener('DOMContentLoaded', async function () {

    var api = await get_api();
    const page_limit = 3; //trocar o '3' por 'api.total_pages' para usar o total de paginas mandado pela api;
    const profiles_per_page = 2; //trocar o '2' por 'api.per_page' para usar o número de perfis por página mandado pela api;
    var page_num = api.page;

    set_footnote(api.support);

    var last_profile = await load_profile(-1, profiles_per_page);

    handle_pagination_buttons(page_num, page_limit, last_profile, profiles_per_page);
});
async function handle_pagination_buttons(page_num, page_limit, last_profile, profiles_per_page) {
    const div = document.querySelector("#info-display");
    const previous_button = document.querySelector("#previous-button");
    const next_button = document.querySelector("#next-button");
    const current_page = document.querySelector("#page-number");
    current_page.innerText = page_num;
    var profile = last_profile;
    if (page_limit == 1) {
        previous_button.style.display = 'none';
        next_button.style.display = 'none';
    } else {
        previous_button.style.display = 'none';

        next_button.onclick = async function () {
            page_num++;
            current_page.innerText = page_num;
            previous_button.style.display = 'inline-block';
            profile = await load_profile(profile, profiles_per_page);
            if (page_num == page_limit) {
                next_button.style.display = 'none';
            }
        };
        previous_button.onclick = async function () {
            page_num--;
            current_page.innerText = page_num;
            next_button.style.display = 'inline-block';
            profile = await load_profile(profile - profiles_per_page - 2, profiles_per_page);
            if (page_num == 1) {
                previous_button.style.display = 'none';
            }
        };
    }
}
async function load_profile(last_profile, profiles_per_page) {
    return await
        fetch("https://reqres.in/api/users", { method: 'GET' })
            .then(response => response.json())
            .then(profiles => {
                var div_to_append = document.querySelector('#display');
                div_to_append.innerHTML = "";
                if (profiles.length == 0) {
                    const message = document.createElement('div')
                    message.innerHTML = "<p> There are no profiles yet</p>";
                    message.style.padding = '10px';
                    div_to_append.append(message);
                } else {
                    var profile_quantity = 0;
                    var profile = last_profile;
                    while (profile_quantity < profiles_per_page) {
                        profile++;
                        if (profiles.data.length <= profile) {
                            break;
                        }
                        var profile_display_div = document.createElement('div');
                        profile_display_div.className = "profile";
                        div_to_append.append(profile_display_div);

                        var avatar_display = document.createElement('div');
                        avatar_display.className = "profile-photo-display";
                        avatar_display.style.backgroundImage = `url(${profiles.data[profile].avatar})`;
                        profile_display_div.append(avatar_display);

                        var info_display = document.createElement('div');
                        info_display.className = "info-display";
                        info_display.innerHTML = `
                            <p><span class="title"> First Name: </span> <span class="profile-info">${profiles.data[profile].first_name}</span></p>
                            <p><span class="title"> Last Name: </span> <span class="profile-info">${profiles.data[profile].last_name}</span></p>
                            <p><span class="title"> Email: </span> <span class="profile-info">${profiles.data[profile].email}</span></p>`;
                        profile_display_div.append(info_display);
                        profile_quantity++;
                    }
                    return profile;
                }
            });
}
async function get_api() {
    var response = await fetch("https://reqres.in/api/users", { method: 'GET' });
    var json = await response.json();
    return json;
}

async function set_footnote(info) {
    const footnote_header = document.querySelector('#footnote-header');
    footnote_header.innerHTML = `<a href="${info.url}">Support</a>`;
    const footnote_text = document.querySelector('#footnote-text');
    footnote_text.innerText = info.text;
}