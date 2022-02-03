import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      require: true,
    },
  },

  computed: {
    agendaItemIcon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },
    agendaItemTitle() {
      return this.agendaItem.title || agendaItemDefaultTitles[this.agendaItem.type];
    },
    agendaItemTime() {
      return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agendaItemIcon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItemTime }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaItemTitle }}</h3>
        <p class="agenda-item__talk" v-if="this.agendaItem.type === 'talk'">
          <span>{{ this.agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ this.agendaItem.language }}</span>
        </p>
        <p>{{ this.agendaItem.description || '' }}</p>
      </div>
    </div>`,
});
