<script>
import PropertyCard from '@/components/PropertyCard';
import axios from 'axios';
import { mapActions } from 'vuex';

const actions = mapActions(['resetReviews']);

export default {
  name: 'Properties',
  data() {
    return {
      properties: [],
      message: '',
    };
  },
  components: { PropertyCard },
  async mounted() {
    try {
      const response = await axios.get('api/properties');
      this.properties = response.data.properties;
    } catch (error) {
      this.message = error.response.data;
    }
  },
  methods: {
    ...actions,
    clearReviews() {
      this.resetReviews();
    },
  },
};
</script>

<template>
  <div>
    <button @click="clearReviews()">Close all reviews</button>
    <div class="mt-20">
      <h4 data-testid="error" class="text-2xl" v-if="message !== ''">{{ message }}</h4>
      <PropertyCard
        v-else
        data-testid="property"
        v-for="property in properties"
        :key="property.id"
        :property="property"
      />
    </div>
  </div>
</template>
