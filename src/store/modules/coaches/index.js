import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default{
  namespaced: true,
  state(){
    return {
      lastFetch: null,
      coaches: [
        {
          id: 'c1',
          firstName: 'Muhammad',
          lastName: 'Yunus',
          areas: ['frontend', 'backend'],
          description:
            "I'm Muhammad and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30
        },
        {
          id: 'c2',
          firstName: 'Abdussomad',
          lastName: 'Dev',
          areas: ['frontend', 'career'],
          description:
            'I am Abdussomad and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 20
        },
        {
          id: 'c3',
          firstName: 'Mabrur',
          lastName: 'Hayitboyev',
          areas: ['frontend', 'backend'],
          description:
            'I am Mabrur and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
          hourlyRate: 25
        }
      ]
    }
  },
  mutations,
  actions,
  getters
}