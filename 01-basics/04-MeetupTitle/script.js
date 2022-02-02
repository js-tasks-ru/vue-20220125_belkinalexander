import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const Root = defineComponent({
  name: 'Root',

  data() {
    return {
      meetupIndexArray: [1, 2, 3, 4, 5],
      selectedMeetup: 0,
      meetupTitle: '',
    };
  },
  watch: {
    selectedMeetup(meetupId) {
      if (meetupId) fetchMeetupById(meetupId).then(({ title }) => this.meetupTitle = title);
    },
  },
});

createApp(Root).mount('#app');
