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
                        parking_lot_name
                        parking_lot_number
                        parking_lots_addressCollection{
                            edges{
                                node{
                                    street_number
                                    street_name
                                    street_postal_code
                                    gated
                                    city_details{
                                        city_name
                                    }
                                    daily_ratesCollection{
                                        edges{
                                            node{
                                                duration
                                                base_price
                                                daily_rate_payment_methodsCollection{
                                                    edges{
                                                        node{
                                                            daily_rate_payment_method_types{
                                                                payment_method_type_name
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    monthly_ratesCollection{
                                        edges{
                                            node{
                                                base_price
                                                monthly_rates_type{
                                                    rate_name
                                                    rate_type_details
                                                }
                                                activation_fee
                                                rate_hour_from
                                                rate_hour_to
                                                clearance_levels
                                                clearance_lot_types
                                                monthly_rates_confirmation_externalCollection{
                                                    edges{
                                                        node{
                                                            request_method
                                                            external_contacts{
                                                                first_name
                                                                middle_name
                                                                last_name
                                                                title
                                                                contact_email
                                                            }
                                                        }
                                                    }
                                                }
                                                monthly_rates_confirmation_internalCollection{
                                                    edges{
                                                        node{
                                                            request_method
                                                            estimated_duration
                                                            internal_members{
                                                                first_name
                                                                middle_name
                                                                last_name
                                                                title
                                                                contact_email
                                                            }
                                                        }
                                                    }
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
