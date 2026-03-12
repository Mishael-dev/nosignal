## Tables
### Products

* ID: Unique identifier for the product
* Name: Name of the product
* Size: Size of the product (e.g., S, M, L)
* Color: Color of the product
* Description: Detailed description of the product
* Price: Price of the product
* Category: Category this product belongs to
* Images: Links to product images

### User

* Firstname: User's first name
* Email: User's email address
* Phone: User's contact number

### Orders

* ID: Unique identifier (Primary Key)
* User ID: Reference to the user who placed the order
* Status: pending, paid, shipped, delivered — Current state of the order
* Payment status: unpaid, paid, pending — Status of payment for the order
* Total amount: Total price of the order
* Full name: Name of the recipient for this specific order
* Phone number: Contact number for delivery
* Street address: Delivery street address
* City: Delivery city
* State: Delivery state/region
* Paystack reference: Unique ID from Paystack for payment verification
* Created at: Date and time of purchase

### Order Items

* Order: Reference to the parent order
* Product: Reference to the ordered product
* Quantity: Number of units of the product in the order

### Newsletter Subscriptions

* Firstname: Subscriber's first name
* Email: Subscriber's email address

## ERD

```mermaid
erDiagram
    PRODUCTS {
        int ID "Unique identifier for the product"
        string Name "Name of the product"
        string Size "Size of the product (e.g., S, M, L)"
        string Color "Color of the product"
        string Description "Detailed description of the product"
        float Price "Price of the product"
        string Category "Category this product belongs to"
        string Images "Links to product images"
    }

    USER {
        string Firstname "User's first name"
        string Email "User's email address"
        string Phone "User's contact number"
    }

    ORDERS {
        int ID "Unique identifier for the order"

int User_ID "Reference to the user who placed the order"

string Status "Current state of the order (pending, paid, shipped, delivered)"

string Payment_status "Status of payment for the order (unpaid, paid, pending)"

float Total_amount "Total price of the order"

string Full_Name "Full name of the person receiving the order"

string Phone_Number "Contact number for delivery purposes"

string Street_Address "Specific street name and house number for delivery"

string City "City where the order is being shipped"

string State "State or region for the delivery address"

string Paystack_Reference "Unique reference code for Paystack payment verification"

datetime Created_At "Timestamp of when the order was created"


    }

    ORDER_ITEMS {
        int Order_ID "Reference to the parent order"
        int Product_ID "Reference to the ordered product"
        int Quantity "Number of units of the product in the order"
    }

    NEWSLETTER_SUBSCRIPTIONS {
        string Firstname "Subscriber's first name"
        string Email "Subscriber's email address"
    }

    USER ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : included_in
```