Vue.component('champion-item', {
  props: ['champion'],
  template: 
    `<details class="champion-item">
        <summary>{{ champion.name }}</summary>
        <ul class="champion-details">
            <li>Class: {{ champion.class }}</li>
            <li>Tier: {{ champion.tier }}</li>
            <li>Size: {{ champion.size }}</li>
            <li>Tags: {{ champion.tags }}</li>
        </ul>
        <ul class="champion-abilities">
            <li>Can Reduce Damage From: ?</li>
            <li>Can Deal Damage With: ?</li>
            <li>Buffs / Debuffs: ?</li>
        </ul>
    </details>`
})

var vm = new Vue({
    el: '#app',
    data: {
       champsList: champData,
       champClasses: [
              { id: 1, value: 'science' },
              { id: 2, value: 'skill' },
              { id: 3, value: 'mutant' },
              { id: 4, value: 'tech' },
              { id: 5, value: 'cosmic' },
              { id: 6, value: 'mystic' }
       ],
       champSizes: [
              { id: 1, value: 's' },
              { id: 2, value: 'm' },
              { id: 3, value: 'l' },
              { id: 4, value: 'xl' }
       ],
       champTiers: [
              { id: 1, value: 1 },
              { id: 2, value: 2 },
              { id: 3, value: 3 }
       ],
       selectedTags: [],
       selectedClasses: [],
       selectedSizes: [],
       selectedTiers: []
       },
       computed: {
              champTags() {
                     return _.uniq(_.flatten(_.map(this.champsList, 'tags'))).sort();
              },
              filteredChamps() {
                     return getBySize(
                                   getByTier(
                                          getByClass(
                                                 getByTag(this.champsList, this.selectedTags), 
                                          this.selectedClasses), 
                                   this.selectedTiers), 
                            this.selectedSizes);
              }
       },
       methods: {
              getByClass: function (champsList, selectedClasses) {
                     if (!selectedClasses.length) return champsList
                     return _.filter(champsList, selectedClasses)
              },
              getByTag: function (champsList, selectedTags) {
                     if (!selectedTags.length) return champsList
                     return _.filter(champsList, selectedTags)
              },
              getBySize: function (champsList, selectedSizes) {
                     if (!selectedSizes.length) return champsList
                     return _.filter(champsList, selectedSizes)
              },
              getByTier: function (champsList, selectedTiers) {
                     if (!selectedTiers.length) return champsList
                     return _.filter(champsList, selectedTiers)
              },
              updateClasses: function () {
                     console.log('update classes');
                     this.selectedClasses = '';
              },
              updateTags: function () {
                     console.log('update tags');
                     this.selectedTags = '';
              },
              updateSizes: function () {
                     console.log('update sizes');
                     this.selectedSizes = '';
              },
              updateTiers: function () {
                     console.log('update tiers');
                     this.selectedTiers = '';
              }
       }
});
