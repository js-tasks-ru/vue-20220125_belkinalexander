<template>
  <fieldset class="agenda-item-form" @change="changeHandler">
    <button type="button" class="agenda-item-form__remove-button" @click="removeHandler">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type"/>
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input v-model="localAgendaItem.startsAt" type="time" placeholder="00:00" name="startsAt" />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input v-model="localAgendaItem.endsAt" type="time" placeholder="00:00" name="endsAt" />
        </ui-form-group>
      </div>
    </div>

    <ui-form-group :label="formGroupTopicName">
      <ui-input v-model="localAgendaItem.title" name="title" />
    </ui-form-group>
    <ui-form-group v-if="localAgendaItem.type === 'talk'" label="Докладчик">
      <ui-input v-model="localAgendaItem.speaker" name="speaker" />
    </ui-form-group>
    <ui-form-group v-if="['talk', 'other'].includes(localAgendaItem.type)" label="Описание">
      <ui-input v-model="localAgendaItem.description" multiline name="description" />
    </ui-form-group>
    <ui-form-group v-if="localAgendaItem.type === 'talk'" label="Язык">
      <ui-dropdown v-model="localAgendaItem.language" title="Язык" :options="$options.talkLanguageOptions" name="language" />
    </ui-form-group>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  emits: ['remove', 'update:agendaItem'],

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  computed: {
    formGroupTopicName() {
      switch (this.localAgendaItem.type) {
        case 'talk': return 'Тема';
        case 'other': return 'Заголовок';
        default: return 'Нестандартный текст (необязательно)';
      }
    },
  },

  watch: {
    'localAgendaItem.startsAt'(startNew, startOld) {
      const startNewSplit = startNew.split(':');
      const startOldSplit = startOld.split(':');
      const endSplit = this.localAgendaItem.endsAt.split(':');
      const startNewDate = new Date(1971, 1, 1, startNewSplit[0], startNewSplit[1], 0).getTime();
      const startOldDate = new Date(1971, 1, 1, startOldSplit[0], startOldSplit[1], 0).getTime();
      const endDate = new Date(1971, 1, 1, endSplit[0], endSplit[1], 0).getTime();
      const diff = new Date(endDate + startNewDate - startOldDate);
      const diffMin = diff.getMinutes() < 10 ? `0${diff.getMinutes()}` : diff.getMinutes();
      const diffHour = diff.getHours() < 10 ? `0${diff.getHours()}` : diff.getHours();
      this.localAgendaItem.endsAt = `${diffHour}:${diffMin}`;
    },
  },

  methods: {
    removeHandler() {
      this.$emit('remove');
    },
    changeHandler() {
      this.$emit('update:agendaItem', { ...this.localAgendaItem });
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
