<script xmlns="http://www.w3.org/1999/html">
  export default {
    props: ['contents'],
    inject: ['testProv'],

    mounted() {
      console.log(this.testProv)
    },
    data() {
      return {
        lots: this.testProv
      }
    }
  }
</script>

<template>
  <div>
    <section class="section">
      <h1 class="title is-3">indewgo.</h1>
      <h1 class="subtitle is-9">parking lot management system.</h1>
      <h1 class="subtitle is-3 is-family-code">[GraphQL-Request Infinite Fetch Prototype v.0.5]</h1>
      <p>tech stack:
        <span class="tag is-primary is-light">vue.js</span>
        <span class="tag is-link is-light">postgreSQL</span>
        <span class="tag is-info is-light">bulma</span>
        <span class="tag is-warning is-light">supabase</span>
        <span class="tag is-link is-light">graphql-request</span>
      </p>
    </section>
  </div>

  <section class="section" v-if="lots">
    <div class="card is-family-monospace" v-for="row in lots">
      <div class="card-header">
        <p class="card-header-title">
          ID# <span class="is-bold">{{row.node.parking_lot_id, "\t"}} </span>  Lot Number :
          <span>{{row.node.parking_lot_number}}</span>
        </p>
        <p></p>
      </div>
      <div class="card-content">
        <p class="title is-4">{{row.node.parking_lot_name}}</p>
        <p>Gated : {{row.node.parking_lots_access.gated}}</p>
        <p>Access :
          <span v-if="row.node.parking_lots_access.requires_ac = true">Access Card</span> -
          <span v-if="row.node.parking_lots_access.requires_fob = true">FOB</span><br>
        </p>

        <div v-for="address in row.node.parking_lots_addressCollection.edges">
          <p class="is-size-5 has-text-weight-bold is-family-monospace"><br>
            {{address.node.street_number}}
            {{address.node.street_name}}
            {{address.node.street_postal_code}}
          </p>

          <p class="is-size-6 has-text-weight-medium" v-if="address.node.monthly_ratesCollection.edges.length">Monthly Rates: <br></p>
          <p class="is-size-6 has-text-weight-medium" v-if="!address.node.monthly_ratesCollection.edges.length">No Monthly Rates available for this Lot.<br></p>
          <ul  v-for="rate in address.node.monthly_ratesCollection.edges">
            <li>
              <p>
                - <span class="has-text-weight-semibold">Base Price: </span> $ {{rate.node.base_price}} - {{rate.node.rate_details}} {{rate.node.monthly_rates_type.rate_name}}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>

</style>
