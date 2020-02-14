<template lang="pug">
tr(v-if="editmode === false").skills-table__row
    td.skills-table__skill-title {{ skill.title }}
    td.skills-table__skill-percent {{ skill.percent }}
    td.skills-table__skill-percent-sign %
    td.skills-table__skill-controls
        button(type="button" @click="editmode = true").iconed-btn.iconed-btn--type--gray-pencil
        button(type="button" @click="removeExistedSkill").iconed-btn.iconed-btn--type--trash
tr(v-else).skills-table__row
    td.skills-table__skill-title
      input(v-model="editedSkill.title" type="text" placeholder="Название").admin-input 
    td.skills-table__skill-percent
      input(v-model="editedSkill.percent" type="text" placeholder="Процент").admin-input  
    td.skills-table__skill-percent-sign %
    td.skills-table__skill-controls
        button(type="button" @click="editExistedSkill").iconed-btn.iconed-btn--type--tick
        button(type="button" @click="editmode = false").iconed-btn.iconed-btn--type--cross      
</template>

<script>

import { mapActions } from "vuex";

export default {
  props: {
    skill: {
      type: Object,
      /** default может быть пустым, но 
       * обязательно должен быть, чтобы
       * не получилось undefined */
      default: () => {},
      required: true
    }
  },
  data(){
    return{
      editmode: false,
      /** Передаём копию объекта скилла, чтобы
       * производить операции над ней, а потом 
       * заменить оригинальный */
      editedSkill: {...this.skill}  
    }
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    async removeExistedSkill(){
      try {
        await this.removeSkill(this.skill);
      } catch (error){
        
      } 
    },
    async editExistedSkill(){
        try {
          await this.editSkill(this.editedSkill);
          this.editmode = false;
        } catch (error) {
          
        }
      }
  }
}
</script>

<style lang="postcss" scoped>

@import "../../styles/misc/variables.pcss";
@import "../../styles/misc/mixins.pcss";

.skills-table__row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.skills-table__skill-title {
  margin-right: auto;
}

.skills-table__skill-percent {
  margin-right: 10px;
}

.skills-table__skill-percent-sign {
  margin-right: 15%;
}

.skills-table__skill-controls{
  display: flex;
  align-items: center;
  width: 55px;
  justify-content: space-between;
}


</style>