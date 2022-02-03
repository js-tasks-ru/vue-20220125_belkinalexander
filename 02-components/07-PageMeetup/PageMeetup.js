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
      meetup: {},
      isError: false,
      isLoad: false,
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
          this.isError = !this.meetup;
        })
        .catch(() => { this.isError = true })
        .finally(() => { this.isLoad = false });
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="!this.isError && !this.isLoad" :meetup="this.meetup"/>

      <ui-container v-if="this.isLoad">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="this.isError && !this.isLoad">
        <ui-alert>Test Error</ui-alert>
      </ui-container>
    </div>`,
});
