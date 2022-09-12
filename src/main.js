import { createApp, provide } from 'vue'
import '../node_modules/bulma/css/bulma.min.css'
import App from './App.vue'
import gql from 'graphql-tag'
import { GraphQLClient} from 'graphql-request'

async function main() {
    const endpoint= 'https://rlwhlhzwqjpgcskfmeik.supabase.co/graphql/v1'
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2hsaHp3cWpwZ2Nza2ZtZWlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTIwMjk2MywiZXhwIjoxOTc2Nzc4OTYzfQ.3ogB3rHmLDlbWL7lkTzlcRrxtDzy7AIcjxfmwhg-pw8',
            authorization: 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2hsaHp3cWpwZ2Nza2ZtZWlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTIwMjk2MywiZXhwIjoxOTc2Nzc4OTYzfQ.3ogB3rHmLDlbWL7lkTzlcRrxtDzy7AIcjxfmwhg-pw8'
        }
    })
    const lotsQuery = gql`
        query getLots ($after: Cursor ){
            parking_lots_generalCollection (after: $after orderBy: {parking_lot_number: AscNullsFirst}){
                edges {
                    node {
                        parking_lot_id
                        parking_lot_name
                        parking_lot_number
                        parking_lots_access {
                            gated
                            requires_ac
                            requires_fob
                            gate_hour_from
                            gate_hour_to
                        }
                        parking_lots_addressCollection {
                            edges {
                                node {
                                    street_number
                                    street_name
                                    street_postal_code
                                    jurisdiction {
                                        jurisdiction_name
                                        jurisdiction_tax
                                        transport_tax
                                    }
                                    monthly_ratesCollection {
                                        edges {
                                            node {
                                                base_price
                                                activation_fee
                                                rate_hour_from
                                                rate_hour_to
                                                rate_days
                                                rate_details
                                                monthly_rates_type {
                                                    rate_name
                                                    rate_details
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
        }
    `

    let currentPaging = true
    let nextCursor = null
    let arr = []

    while(currentPaging) {
        const data = await graphQLClient.request(lotsQuery, {
            after: nextCursor
        })
        nextCursor = data.parking_lots_generalCollection.pageInfo.endCursor
        arr.push(...data.parking_lots_generalCollection.edges)
        currentPaging = data.parking_lots_generalCollection.pageInfo.hasNextPage
    }
    // console.log(arr)

    return arr
}

let fullArr = await main().catch((error) => console.log(error))

const app = createApp(App).provide('testProv', fullArr).mount('#app')
