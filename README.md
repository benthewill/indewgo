# InDewGo

## A parking lot management web-app aiming to be the single source of truth for information for all parking lots in Indigo Park - BC.

### Features

At the moment, it is intended to have the following features **before shipping the first beta release** to Guest Services management:
1. Card-based view of parking lots and their relevant details.
2. Easily insert or update new parking lots with their relevant details. 
3. Easily accessible and robust search filters for various elements for quick lookup in the immediate events of inquiry, internal and external.
4. Simple user authentication with admin and agent roles.
5. Notification Board for updates and guest services requesting permissions for certain parking lot rate inquiry and application.
6. Automatic generation of documents and e-mail templates. Fields will be available and/or editable so that guest services can just fill relevant information of the customer's details:
   1. Welcome Letters
   2. Rates Inquiry Templates
   3. Monthly Parking Contracts
   4. Cancellation E-mail
   5. Notice Disputes:
      1. Reduction Response
      2. Void Response
   6. Lot-specific Memo

**Future Release features**:
1. API connection to:
   1. Parking Lot availabilities
   2. Parking Notices API
   3. Daily Payments and Coupons from PbP, IndigoApp, Ventek
   4. PayMachine Details from Ventek
2. Personalized and easily-editable dashboard with blocks relevant to users.
3. Connect personal Indigo e-mails to InDewGo.


### Current Tech Stack:
> **Language** : js
>
>**Libraries** : 
@types/big.jsand big.js for calculating accurate decimals for tax purposes.
>
>**Framework** : vue
>
>**Build Dev** : vite
>
>**CSS Library** : bulma
>
>**Database** : PostgreSQL
>
>**Back-end** :  supabase
>
>**Tools** : DataGrip Webstorm
