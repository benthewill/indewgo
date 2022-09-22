<script>
  import { useMutation } from '@urql/vue';

  export default{
    data() {
      return {
        newLotName: '',
        newLotNumber: ''
      }
    },
    methods: {
      simpleMutation() {
        const {executeMutation} = useMutation(`
          mutation ($newName: String!, $newNumber: Int!) {
            insertIntoparking_lots_generalCollection(
                objects: { parking_lot_name: $newName, parking_lot_number: $newNumber }
            ) {
                records {
                    parking_lot_id
                    parking_lot_name
                    parking_lot_number
                }
            }
        }
        `)

        let variables = {
          newName: this.newLotName,
          newLotNumber: this.newLotNumber
        }


        executeMutation(variables).then((result) => {
          console.log(result)
        })

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
    <label class="label">Parking Lot Number : {{ newLotNumber }}</label>
    <div class="control">
      <input v-model="newLotNumber" class="input" type="text" placeholder="Type New Lot Number Here">
    </div>
  </div>
  <div class="field">
    <div class="control">
      <button @click="simpleMutation()" class="button is-primary" >Submit</button>
    </div>
  </div>
</template>