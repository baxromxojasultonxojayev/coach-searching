<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <p>${{ rate }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Qiziqarlimi? U holda Bog'lanishni bosing</h2>
          <router-link link :to="contactlink">Bog'lanish</router-link>
        </header>
        <router-view></router-view>
      </base-card>
    </section>

    <section>
      <base-card>
        <base-badge 
          v-for="area in areas" 
          :key="area" 
          :type="area" 
          :title="area">
        </base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>


<script>
export default {
  props: ['id'],
  data() {
    return{
      selectedCoach: null
    }
  },
  computed: {
    fullName(){
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName 
    },
    areas() {
      return this.selectedCoach.areas
    },
    rate() {
      return this.selectedCoach.hourlyRate
    },
    description() {
      return this.selectedCoach.description
    },
    contactlink() {
      return this.$route.path + '/' + this.id + '/contact'

      // return this.$route.path + '/:contact'
    }
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(coach => coach.id === this.id)
  }
}
</script>