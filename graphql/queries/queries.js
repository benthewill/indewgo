import gql from "graphql-tag";

export {
    getLotsHome,
    getCitiesDetails
}

const getLotsHome = gql`
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

const getCitiesDetails = gql`
      query getCities {
        city_detailsCollection {
          edges {
            node {
              city_id
              city_name
              provincial_transport_tax
              goods_and_services_tax
              additional_tax
              patrol_jurisdiction
            }
          }
        }
      }
    `

