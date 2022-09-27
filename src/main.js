import { createApp, provide } from 'vue'
import '../node_modules/bulma/css/bulma.min.css'
import { GraphQLClient} from 'graphql-request'

import App from './App.vue'
import * as gqlquery from '../graphql/queries/queries.js'


async function main() {
    const endpoint= 'https://rlwhlhzwqjpgcskfmeik.supabase.co/graphql/v1'
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2hsaHp3cWpwZ2Nza2ZtZWlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTIwMjk2MywiZXhwIjoxOTc2Nzc4OTYzfQ.3ogB3rHmLDlbWL7lkTzlcRrxtDzy7AIcjxfmwhg-pw8',
            authorization: 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsd2hsaHp3cWpwZ2Nza2ZtZWlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTIwMjk2MywiZXhwIjoxOTc2Nzc4OTYzfQ.3ogB3rHmLDlbWL7lkTzlcRrxtDzy7AIcjxfmwhg-pw8'
        }
    })

    // Query Body from the ../graphql/queries/queries.js file
    const lotsQuery = gqlquery.getLotsHome

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
