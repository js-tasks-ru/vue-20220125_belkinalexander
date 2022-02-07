import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      meetup: null,
      isError: false,
      isLoad: false,
      errorMessage: '',
    };
  },

  watch: {
    meetupId: {
      handler(id) {
        this.getMeetup(id);
      },
      immediate: true,
    },
  },

  methods: {
    getMeetup(id) {
      this.isError = false;
      this.isLoad = true;
      fetchMeetupById(id)
        .then((response) => {
          this.meetup = response;
          if (!this.meetup) {
            this.isError = true;
            this.errorMessage = 'Not found';
          }
        })
        .catch((e) => {
          this.isError = true;
          this.errorMessage = e.message;
        })
        .finally(() => { this.isLoad = false });
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="!isError && !isLoad" :meetup="meetup"/>

      <ui-container v-if="isLoad">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="isError && !isLoad">
        <ui-alert>{{ errorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});
