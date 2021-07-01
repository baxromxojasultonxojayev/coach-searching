<template>
  <div>
    <base-diolog :show="!!error" title="An error occured" @close="handleError">
      <p>{{error}}</p>
    </base-diolog>
    <section>
      <coach-filter @change-filter='setFilters'>

      </coach-filter>
    </section>  
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">LogIn to Register as a Coach</base-button>
          <base-button v-if="isLoggedIn && !isLoading && !isCoach" link to="/register">Register as Coach </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item 
            v-for="coach in filteredCoaches" 
            :key="coach.id" 
            :id="coach.id" 
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
          <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
            {{ coach.firstName }}
          </li> -->
        </ul>
        <h2 v-else>No Coaches found...</h2>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data(){
    return{
      isLoading: false,
      error: null,
      activeFilter: {
        frontend: true,
        backend: true,
        career: true
      },
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters.isAuthonticated
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    },
    filteredCoaches() {
      const coaches =  this.$store.getters['coaches/coaches']
      return coaches.filter(coach => {
        if(this.activeFilter.frontend && coach.areas.includes('frontend')){
          return true
        }
        if(this.activeFilter.backend && coach.areas.includes('backend')){
          return true
        }
        if(this.activeFilter.career && coach.areas.includes('career')){
          return true
        }
      console.log(coaches);
        return false
      })
    },
    hasCoaches() {
      return !this.isLoading &&  this.$store.getters['coaches/hasCoaches']
    }
  },
  created(){
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilter = updatedFilters
    },
    async loadCoaches(refresh = false){
      this.isLoading = true
      try{
        await this.$store.dispatch('coaches/loadCoaches',{
          forceRefresh: refresh
        })
      }
      catch(error){
        this.error = error.message || 'Something went wrong'
      }
      this.isLoading = false
    },
    handleError(){
      this.error = null
    }
  }
}
</script>

<style scoped>
  ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
} 
</style>