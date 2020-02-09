<script>
import PropertyCard from '@/components/PropertyCard';
import axios from 'axios';
export default {
  name: 'Properties',
  data() {
    return {
      properties: [],
      message: '',
    };
  },
  components: { PropertyCard },
  mounted() {
    axios
      .get('api/properties')
      .then(res => (this.properties = res.data.properties))
      .catch(error => {
        console.log('la la la');
      });
  },
};
</script>

<template>
  <div class="mt-20">
    <h4 class="text-2xl" v-if="message !== ''">{{ message }}</h4>
    <PropertyCard
      v-else
      data-testid="property"
      v-for="property in properties"
      :key="property.id"
      :property="property"
    />
  </div>
</template>
