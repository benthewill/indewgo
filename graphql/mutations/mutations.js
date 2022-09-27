import gql from "graphql-tag";

export {
    addLotGeneral,
    addAddressDetails
}

const addLotGeneral = gql`
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
    `

const addAddressDetails = gql`
          mutation ($addresses: [parking_lots_addressInsertInput!]!) {
          insertIntoparking_lots_addressCollection(objects: $addresses){
              records{
                  street_number
                  street_name
                  street_postal_code
              }
          }
      }
      `