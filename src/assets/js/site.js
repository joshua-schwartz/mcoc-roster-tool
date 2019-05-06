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
       champClasses: ['science','skill','mutant','tech','cosmic','mystic'],
       champSizes: ['s','m','l','xl'],
       champTiers: [1,2,3],
       selectedTags: [],
       selectedClasses: [],
       selectedSizes: [],
       selectedTiers: []
       },
       computed: {
              champTags() {
                     return _.uniq(_.flatten(_.map(champData, 'tags'))).sort();
              },
              getFilteredChamps() {
                     return this.getBySize(
                            this.getByTier(
                                   this.getByClass(
                                          this.getByTag(champData, this.selectedTags), 
                                   this.selectedClasses), 
                            this.selectedTiers), 
                     this.selectedSizes);
              }
       },
       methods: {
              getByClass: function (champsList, selectedClasses) {
                     if (!selectedClasses.length) return champsList
                     
                     var fullList = [];

                     selectedClasses.forEach(item => {
                            var singleFilterList = _.filter(_.clone(champsList), ['class', item]);
                            
                            fullList = _.concat(fullList, singleFilterList);
                     });
                     
                     return fullList;
              },
              getByTag: function (champsList, selectedTags) {
                     if (!selectedTags.length) return champsList

                     var unfilteredList = _.clone(champsList);
                     var tagFilteredList = [];
                            
                     unfilteredList.forEach(champ => {
                            
                            var champTags = champ.tags;

                            var hasTag = champTags.some(tag => {
                                   return _.indexOf(selectedTags, tag) !== -1
                            });

                            if (hasTag) {
                                   tagFilteredList.push(champ);
                            }
                     });
                     
                     return tagFilteredList;
              },
              getBySize: function (champsList, selectedSizes) {
                     if (!selectedSizes.length) return champsList

                     var fullList = [];

                     selectedSizes.forEach(item => {
                            var singleFilterList = _.filter(_.clone(champsList), ['size', item]);
                            
                            fullList = _.concat(fullList, singleFilterList);
                     });
                     
                     return fullList;
              },
              getByTier: function (champsList, selectedTiers) {
                     if (!selectedTiers.length) return champsList

                     var fullList = [];

                     selectedTiers.forEach(item => {
                            var singleFilterList = _.filter(_.clone(champsList), ['tier', item]);
                            
                            fullList = _.concat(fullList, singleFilterList);
                     });
                     
                     return fullList;
              }
       }
});
