Vue.component('champion-item', {
       props: ['champion'],
       template: `<div class="champion-item">{{ champion.name }}</div>`
})

var vm = new Vue({
       el: '#app',
       data: {
              champClasses: ['science', 'skill', 'mutant', 'tech', 'cosmic', 'mystic'],
              champSizes: ['s', 'm', 'l', 'xl'],
              champTiers: [1, 2, 3],
              champAbilities: [{
                            id: 'canReduceBleed',
                            label: 'Can Reduce Bleed'
                     },
                     {
                            id: 'canReducePoison',
                            label: 'Can Reduce Poison'
                     },
                     {
                            id: 'canReduceShock',
                            label: 'Can Reduce Shock'
                     },
                     {
                            id: 'canReduceIncinerate',
                            label: 'Can Reduce Incinerate'
                     },
                     {
                            id: 'canReduceColdsnap',
                            label: 'Can Reduce Coldsnap'
                     },
                     {
                            id: 'canReduceDebuffs',
                            label: 'Can Reduce Debuffs'
                     },
                     {
                            id: 'canReduceHealing',
                            label: 'Can Reduce Healing'
                     },
                     {
                            id: 'canReduceEvade',
                            label: 'Can Reduce Evade'
                     },
                     {
                            id: 'canReduceAbilityAccuracy',
                            label: 'Can Reduce Ability Accuracy'
                     },
                     {
                            id: 'canReducePowerGain',
                            label: 'Can Reduce Power Gain'
                     },
                     {
                            id: 'canReduceBuffs',
                            label: 'Can Reduce Buffs'
                     },
                     {
                            id: 'canBreakArmor',
                            label: 'Can Break Armor'
                     },
                     {
                            id: 'canSurviveSP3',
                            label: 'Can Survive SP3'
                     },
                     {
                            id: 'hasBuffs',
                            label: 'Has Buffs'
                     },
                     {
                            id: 'hasDebuffs',
                            label: 'Has Debuffs'
                     },
                     {
                            id: 'hasTrueStrike',
                            label: 'Has True Strike'
                     },
                     {
                            id: 'hasHealing',
                            label: 'Has Healing'
                     }
              ],
              selectedTags: [],
              selectedClasses: [],
              selectedSizes: [],
              selectedTiers: [],
              selectedAbilities: []
       },
       computed: {
              champTags() {
                     return _.uniq(_.flatten(_.map(champData, 'tags'))).sort();
              },
              getFilteredChamps() {
                     return this.getBySize(
                            this.getByTier(
                                   this.getByClass(
                                          this.getByTag(
                                                 this.getByAbility(champData, this.selectedAbilities),
                                                 this.selectedTags),
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

                            var hasTag = _.some(champTags, tag => {
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
              },
              getByAbility: function (champsList, selectedAbilities) {
                     if (!selectedAbilities.length) return champsList

                     var unfilteredList = _.clone(champsList);
                     var abilityFilteredList = [];

                     unfilteredList.forEach(champ => {

                            var champAbilities = Object.keys(_.pickBy(champ.abilities));

                            console.log(champ.name + ": " + champAbilities);

                            var hasAbility = _.every(selectedAbilities, ability => {
                                   return _.indexOf(champAbilities, ability) !== -1
                            });

                            if (hasAbility) {
                                   abilityFilteredList.push(champ);
                            }
                     });

                     return abilityFilteredList;
              }
       }
});