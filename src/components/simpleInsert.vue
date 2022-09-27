<script>
import {useMutation, useQuery} from '@urql/vue';
import {reactive, ref} from 'vue';

import * as gqlquery from '../../graphql/queries/queries.js'
import * as gqlmutation from '../../graphql/mutations/mutations.js'

export default{
    setup() {
      const addingLot = useMutation(gqlmutation.addLotGeneral)
      const addingAddress = useMutation(gqlmutation.addAddressDetails)

      const queryCities = useQuery({query: gqlquery.getCitiesDetails})

      const newLotName = ref('')
      const newLotNum = ref('')
      const newLotId = ref('')

      const newAddresses = reactive([{
        city_id: 1,
        gate_hour_from: '',
        gate_hour_to:'',
        gated: true,
        parking_lot_id: 1002,
        street_name:'',
        street_number:'',
        street_postal_code: ''
      }])

      return {
        newLotName,
        newLotNum,
        newAddresses,
        newLotId,
        citiesData: {
          fetching: queryCities.fetching,
          data: queryCities.data,
          error: queryCities.error
        },
        add: async () => {
          await addingLot.executeMutation({
              newName: newLotName.value,
              newNumber: newLotNum.value
          })
              .then( (res) => {
                console.log(res.data.insertIntoparking_lots_generalCollection.records[0].parking_lot_id)

                newAddresses.forEach(item => item.parking_lot_id = res.data.insertIntoparking_lots_generalCollection.records[0].parking_lot_id)

                console.log(newAddresses)

                addingAddress.executeMutation({
                  addresses: newAddresses
                })
              })
        },
        addAddress: () => {
          newAddresses.push({
            city_id: 1,
            gate_hour_from: '',
            gate_hour_to: '',
            gated: true,
            parking_lot_id: 1002,
            street_name: '',
            street_number: '',
            street_postal_code: ''
          })

          console.log(newAddresses[0])
        }
      }

    },
    data() {
      return {
      }
    },
    computed: {
      computedCities() {
        let upToData = this.citiesData.data
        let upToValue = {...upToData.value}
        let upToDetails = {...upToValue.city_detailsCollection}
        return {
          fetching: this.citiesData.fetching,
          data: upToDetails.edges,
          error: this.citiesData.error
        }
      }
    }

  }
</script>

<template>
  <h1 class="title is-4">Simple Mutation Field</h1>
  <div class="field">
    <label class="label">Parking Lot Name : {{ newLotName }}</label>
    <div class="control">
      <input v-model="newLotName" class="input" type="text" placeholder="Type New Lot Name Here">
    </div>
  </div>
  <div class="field">
    <label class="label">Parking Lot Number : {{ newLotNum }}</label>
    <div class="control">
      <input v-model="newLotNum" class="input" type="text" placeholder="Type New Lot Number Here">
    </div>
  </div>
  <div class="field">
    <label class="label">Address(es) : </label>

    <div class="field">
      <p>{{newAddresses}}</p>
    </div>


<!--    <div class="block">-->
<!--      <p> {{ computedCities }} </p>-->
<!--    </div>-->

    <div class="field">
      <div class="control">
        <button @click="addAddress" class="button is-info is-light" >+</button>
      </div>
    </div>

    <div v-for="(address, index) in newAddresses">
      <div class="field">
        <div class="control">
          <input v-model="newAddresses[index].street_number" class="input" type="text" placeholder="Street Number">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="newAddresses[index].street_name" class="input" type="text" placeholder="Street Number">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="newAddresses[index].street_postal_code" class="input" type="text" placeholder="Street Postal Code">
        </div>
      </div>


<!--      MULTIPLE OPTIONS-->
      <div class="field">
        <div class="select is-info" v-if="computedCities.data">
          <select v-model="newAddresses[index].city_id">
            <option v-for="(city, index) in computedCities.data" :value="city.node.city_id">{{ city.node.city_name }}</option>
          </select>
        </div>
      </div>

      <div class="field">
        <div class="subtitle is-5" v-if="computedCities.fetching === true">
          Loading...
        </div>
      </div>


      <div class="field">
        <div class="control">
          <input v-model="newAddresses[index].gate_hour_from" class="input" type="number" placeholder="Gate Open From">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input v-model="newAddresses[index].gate_hour_to" class="input" type="number" placeholder="Gate Open To">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox" v-model="newAddresses[index].gated">
            Is the address gated?
          </label>
        </div>
      </div>

    </div>
  </div>



  <div class="field">
    <div class="control">
      <button @click="add" class="button is-primary" >Submit</button>
    </div>
  </div>
</template>